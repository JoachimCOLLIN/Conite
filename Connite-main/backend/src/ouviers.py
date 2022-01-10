import flask
from .auth import requires_auth
from .db import get_session
from .entities.ouvrier import Ouvrier, OuvrierSchema

blueprint = flask.Blueprint('ouvriers', __name__)


@blueprint.route('/ouvriers')
def get_ouvriers():
    # fetching from the database
    session = get_session()
    ouvrier_objects = session.query(Ouvrier).all()

    # transforming into JSON-serializable objects
    schema = OuvrierSchema(many=True)
    ouvriers = schema.dump(ouvrier_objects)

    # serializing as JSON
    session.close()
    return flask.jsonify(ouvriers)


@blueprint.route('/ouvriers', methods=['POST'])
#@requires_auth
def add_ouvrier():
    # mount exam object
    posted_ouvrier = OuvrierSchema(
        only=('id_chantier','nom','prenom','age','qualification')).load(flask.request.get_json())

    ouvrier = Ouvrier(**posted_ouvrier, created_by="HTTP post request")

    # persist exam
    session = get_session()
    session.add(ouvrier)
    session.commit()

    # return created exam
    new_ouvrier = OuvrierSchema().dump(ouvrier)
    session.close()
    return flask.jsonify(new_ouvrier), 201


@blueprint.route('/ouvriers/<ouvrier_id>', methods=['DELETE'])
#@requires_admin
def delete_ouvrier(ouvrier_id):
    db = get_session()
    ouvrier = db.query(Ouvrier).filter_by(id=ouvrier_id).first()
    db.delete(ouvrier)
    db.commit()
    db.close()
    return '', 201
