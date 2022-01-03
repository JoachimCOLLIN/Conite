import os

import flask
import flask_cors

from . import auth
from . import db
from . import exams
from .entities.base import Base
from .auth import AuthError, requires_auth




def create_app(test_config=None):
    # creating the Flask application | config = tous les détails du fonctionnement de l'application
    app = flask.Flask(__name__, instance_relative_config=True)
    flask_cors.CORS(app)

    # load configuration d'un fichier externe config.py
    app.config.from_object('config')

    if test_config is None:
        # load the instance/config.py, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # if needed, generate database schema
    with app.app_context():
        Base.metadata.create_all(db.get_engine())

    #regroupement de fonctions factoriser notre code
    app.register_blueprint(auth.blueprint)
    app.register_blueprint(exams.blueprint)

    return app
