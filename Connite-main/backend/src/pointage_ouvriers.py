import flask

from .db import get_session
from .entities.pointage_ouvrier import PointageOuvrierJour, PointageOuvrierJourSchema
from .entities.ouvrier import Ouvrier,OuvrierSchema
blueprint = flask.Blueprint('pointageouvrier', __name__)


@blueprint.route('/pointageouvrier')
def get_pointageOuvrier(chantier_id):
    # fetching from the database
    session = get_session()
    print(int(chantier_id))
    ouvrier_objects = session.query(Ouvrier).filter(Ouvrier.id_chantier >= int(chantier_id)).filter(Ouvrier.id_chantier < int(chantier_id)+1).all()

    # transforming into JSON-serializable objects
    schema = OuvrierSchema(many=True)
    ouvriers = schema.dump(ouvrier_objects)

    # serializing as JSON
    session.close()
    return flask.jsonify(ouvriers)


@blueprint.route('/pointageouvrier_update', methods=['POST'])
#@requires_auth
def update_horaire():
    # mount exam object
    posted_pointage_ouvrier_jour = PointageOuvrierJourSchema(
        only=('id_chantier','id_ouvrier','date','heures','galeries')).load(flask.request.get_json())

    pointage_ouvrier_jour = PointageOuvrierJour(**posted_pointage_ouvrier_jour, created_by="HTTP post request")
    """Il est nécessaire de checkeer si il s'agit d'un update des horaires travaillées ou des nouvelles 
    horaires rentrés par le chef d'équipe"""
    # persist exam
    session = get_session()
    session.add(pointage_ouvrier_jour)
    session.commit()

    # return created exam
    new_ouvrier = PointageOuvrierJourSchema().dump(pointage_ouvrier_jour)
    session.close()
    return flask.jsonify(new_ouvrier), 201

