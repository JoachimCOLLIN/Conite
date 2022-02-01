import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base


class Chantier(Entity, Base):
    #cette classe chantier stocke les informations du chantier et dérive de entity pour avoir la tracabilité des changements 

    __tablename__ = 'chantiers'
    title = sqlalchemy.Column(sqlalchemy.String) 
    description = sqlalchemy.Column(sqlalchemy.String)
    localisation = sqlalchemy.Column(sqlalchemy.String)
    datedelancement = sqlalchemy.Column(sqlalchemy.String)
    moderateurs = sqlalchemy.Column(sqlalchemy.Integer)
    
    def __init__(self, title, description,localisation,datedelancement,moderateurs, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description
        self.localisation = localisation
        self.datedelancement = datedelancement
        self.moderateurs = moderateurs


class ChantierSchema(marshmallow.Schema): 
    #Sérialisation et désérialisation des données 
    id = marshmallow.fields.Number()
    title = marshmallow.fields.Str()
    description = marshmallow.fields.Str()
    localisation = marshmallow.fields.Str()
    datedelancement = marshmallow.fields.Str()
    moderateurs = marshmallow.fields.Str()
    created_at = marshmallow.fields.DateTime()
    updated_at = marshmallow.fields.DateTime()
    last_updated_by = marshmallow.fields.Str()
