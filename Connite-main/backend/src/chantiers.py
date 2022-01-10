import flask

from .auth import requires_auth
from .db import get_session
from .entities.chantier import Chantier, ChantierSchema

blueprint = flask.Blueprint('chantiers', __name__)


@blueprint.route('/chantiers')
def get_chantiers():
    # fetching from the database
    session = get_session()
    chantier_objects = session.query(Chantier).all()

    # transforming into JSON-serializable objects
    schema = ChantierSchema(many=True)
    chantiers = schema.dump(chantier_objects)

    # serializing as JSON
    session.close()
    return flask.jsonify(chantiers)


@blueprint.route('/chantier/<chantier_id>')
def get_chantier(chantier_id,methods=['Get']):
    print(f'get chantier : {chantier_id}')

    # TODO ensure the chantier_id gives an existing chantier
    db = get_session()
    chantier = db.query(Chantier).filter_by(id=chantier_id).first()
    db.close()

    new_chantier = ChantierSchema().dump(chantier)
    print(new_chantier)

    return flask.jsonify(new_chantier), 201


@blueprint.route('/chantiers', methods=['POST'])
#@requires_auth
def add_chantier():
    # mount chantier object
    posted_chantier = ChantierSchema(
        only=('title', 'description','localisation','datedelancement','moderateurs')).load(flask.request.get_json())

    chantier = Chantier(**posted_chantier, created_by="HTTP post request")

    # persist chantier
    session = get_session()
    session.add(chantier)
    session.commit()

    # return created chantier
    new_chantier = ChantierSchema().dump(chantier)
    session.close()
    return flask.jsonify(new_chantier), 201


@blueprint.route('/chantiers/<chantier_id>', methods=['DELETE'])
#@requires_admin
def delete_chantier(chantier_id):
    db = get_session()
    chantier = db.query(Chantier).filter_by(id=chantier_id).first()
    db.delete(chantier)
    db.commit()
    db.close()
    return '', 201
