import functools

import flask
import werkzeug.security

from .db import get_session
from .entities.auth import Auth, AuthSchema

AUTH0_DOMAIN = 'dev-65v3zaee.us.auth0.com'
ALGORITHMS = ['RS256']
API_AUDIENCE = 'https://online-exam.digituz.com.br'


blueprint = flask.Blueprint('auth', __name__)

def requires_auth(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json')
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer='https://' + AUTH0_DOMAIN + '/'
                )

            except jwt.ExpiredSignatureError:
                raise AuthError({
                    'code': 'token_expired',
                    'description': 'Token expired.'
                }, 401)

            except jwt.JWTClaimsError:
                raise AuthError({
                    'code': 'invalid_claims',
                    'description': 'Incorrect claims. Please, check the audience and issuer.'
                }, 401)
            except Exception:
                raise AuthError({
                    'code': 'invalid_header',
                    'description': 'Unable to parse authentication token.'
                }, 400)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)

        raise AuthError({
            'code': 'invalid_header',
            'description': 'Unable to find the appropriate key.'
        }, 400)

    return decorated


class AuthError(Exception):
    def __init__(self, error, status_code):
        super().__init__()
        self.error = error
        self.status_code = status_code

#sur la page register, où l'on poste quelque chose
@blueprint.route('/register', methods=['POST'])
def register():
    # fstring permet d'insérer des epressions dans une chaîne de caractères
    # Parses the incoming JSON request data and returns it
    print(f'registering... {flask.request.get_json()}')
    posted_auth = AuthSchema(
        only=('login', 'password')).load(flask.request.get_json())
    auth = Auth(
        posted_auth['login'],
        werkzeug.security.generate_password_hash(posted_auth['password']),
        created_by='HTTP post request')

    session = get_session()
    error = None

    if not auth.login:
        error = 'Login is required.'
    elif not auth.password:
        error = 'Password is required.'
    elif session.execute(
            'SELECT id FROM auth WHERE login = :login', {'login': auth.login}
    ).fetchone() is not None:
        error = f'User {auth.login} is already registered.'

    if error is None:
        session.add(auth)
        session.commit()
        session.close()
        return flask.jsonify({'login': auth.login}), 201

    raise AuthError({
        'code': 'registration failed',
        'description': error}, 401)


@blueprint.route('/login', methods=['POST'])
def login():
    posted_auth = AuthSchema(
        only=('login', 'password')).load(flask.request.get_json())
    auth = Auth(**posted_auth, created_by='HTTP post request')

    db = get_session()
    error = None
    user = db.execute(
        'SELECT * FROM auth WHERE login = :login', {'login': auth.login}
    ).fetchone()

    if user is None:
        error = 'Incorrect username.'
    elif not werkzeug.security.check_password_hash(
            user['password'], auth.password):
        error = 'Incorrect password.'

    if error is None:
        flask.session.clear()
        flask.session['user_id'] = user['id']
        print('login sucessful')
        return flask.jsonify({'login': auth.login}), 201

    raise AuthError({
        'code': 'login failed',
        'description': error}, 401)


@blueprint.before_app_request
def load_logged_in_user():
    user_id = flask.session.get('user_id')

    if user_id is None:
        flask.g.user = None
    else:
        flask.g.user = get_session().execute(
            'SELECT * FROM user WHERE id = :login', {'login': user_id}
        ).fetchone()


@blueprint.route('/logout')
def logout():
    flask.session.clear()
    return None, 204


def requires_auth(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if flask.g.user is None:
            return flask.redirect(flask.url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view


@blueprint.errorhandler(AuthError)
def handle_auth_error(error):
    response = flask.jsonify(error.error)
    response.status_code = error.status_code
    return response

def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
        }, 401)

    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
        }, 401)

    token = parts[1]
    return token


