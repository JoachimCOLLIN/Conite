import flask


from .db import get_session
from .entities.chantier import Chantier, ChantierSchema
from .entities.ouvrier import Ouvrier, OuvrierSchema

blueprint = flask.Blueprint('chantiers', __name__)


@blueprint.route('/chantiers')
def get_chantiers():
    # prend tous les chantiers de la base de données 
    session = get_session()
    chantier_objects = session.query(Chantier).all()

    # transformation en object sérialisable en json
    schema = ChantierSchema(many=True)
    chantiers = schema.dump(chantier_objects)

    # sérialisation et envoi des données
    session.close()
    return flask.jsonify(chantiers)


@blueprint.route('/chantier/<id_chantier>',methods=['Get'])
def get_chantier(id_chantier):

    db = get_session()
    chantier = db.query(Chantier).filter_by(id=id_chantier).first()
    db.close()

    new_chantier = ChantierSchema().dump(chantier)
    print(new_chantier)

    return flask.jsonify(new_chantier), 201

@blueprint.route('/infos/<chantier_id>',methods=['POST'])
def update_chantier(chantier_id):
    posted_chantier =flask.request.get_json()

    db = get_session()
    chantier = db.query(Chantier).filter_by(id=chantier_id).first()
    chantier.title=posted_chantier["title"]
    chantier.description=posted_chantier["description"]
    chantier.localisation=posted_chantier["localisation"]
    chantier.datedelancement=posted_chantier["datedelancement"]
    chantier.moderateurs=posted_chantier["moderateurs"]
    db.commit()
    new_chantier = ChantierSchema().dump(chantier)
    db.close()
    return flask.jsonify(new_chantier), 201

@blueprint.route('/chantiers', methods=['POST'])
def add_chantier():
    posted_chantier = ChantierSchema(
        only=('title', 'description','localisation','datedelancement','moderateurs')).load(flask.request.get_json())

    chantier = Chantier(**posted_chantier, created_by="HTTP post request")

    session = get_session()
    session.add(chantier)
    session.commit()

    new_chantier = ChantierSchema().dump(chantier)
    session.close()
    return flask.jsonify(new_chantier), 201


@blueprint.route('/chantiers/<chantier_id>', methods=['DELETE'])
def delete_chantier(chantier_id):
    db = get_session()
    chantier = db.query(Chantier).filter_by(id=chantier_id).first()
    db.delete(chantier)
    #
    ouvriers = db.query(Ouvrier).filter(Ouvrier.id_chantier==int(chantier_id)).all()
    for ouvrier in ouvriers:
        db.delete(ouvrier)
    db.commit()
    db.close()
    return '', 201


