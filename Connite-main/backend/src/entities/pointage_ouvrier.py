import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base


class PointageOuvrierJour(Base):
    __tablename__ = 'pointageOuvrier'
    id_chantier  = sqlalchemy.Column(sqlalchemy.Integer,primary_key=True)
    id_ouvrier =sqlalchemy.Column(sqlalchemy.Integer,primary_key=True)
    date=sqlalchemy.Column(sqlalchemy.Date)
    heures=sqlalchemy.Column(sqlalchemy.Float)
    galerie_heures=sqlalchemy.Column(sqlalchemy.Float)
    prime_habillement=sqlalchemy.column(sqlalchemy.BOOLEAN)
    prime_machine=sqlalchemy.Column(sqlalchemy.BOOLEAN)

    

    def __init__(self,id_ouvrier,id_chantier,date,heures,galerie_heures,prime_habillement,prime_machine):
        self.id_ouvrier = id_ouvrier
        self.id_chantier = id_chantier
        self.date=date
        self.heures=heures
        self.galerie_heures=galerie_heures
        self.prime_habillement=prime_habillement
        self.prime_machine=prime_machine



class PointageOuvrierJourSchema(marshmallow.Schema): 
    id_ouvrier = marshmallow.fields.Number()
    id_chantier = marshmallow.fields.Number()
    date =marshmallow.fields.Date()
    heures=marshmallow.fields.Number()
    galerie_heures=marshmallow.fields.Number()
    prime_machine=marshmallow.fields.Boolean()
    prime_habillement=marshmallow.fields.Boolean()
