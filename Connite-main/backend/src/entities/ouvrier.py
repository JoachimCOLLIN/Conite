import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base


class Ouvrier(Entity, Base):
    __tablename__ = 'ouvriers'
    id_chantier  = sqlalchemy.Column(sqlalchemy.Integer)
    nom = sqlalchemy.Column(sqlalchemy.String)
    prenom = sqlalchemy.Column(sqlalchemy.String)
    age = sqlalchemy.Column(sqlalchemy.Integer)
    qualification = sqlalchemy.Column(sqlalchemy.String)
    

    def __init__(self,id_chantier,nom,prenom,age,qualification,created_by):
        Entity.__init__(self,created_by)
        self.id_chantier = id_chantier
        self.nom = nom
        self.prenom = prenom
        self.age = age
        self.qualification = qualification



class OuvrierSchema(marshmallow.Schema): 
    id = marshmallow.fields.Number()
    id_chantier = marshmallow.fields.Number()
    nom = marshmallow.fields.Str()
    prenom = marshmallow.fields.Str()
    age = marshmallow.fields.Number()
    qualification = marshmallow.fields.Str()
    created_at = marshmallow.fields.DateTime()
    updated_at = marshmallow.fields.DateTime()
    last_updated_by = marshmallow.fields.Str()

