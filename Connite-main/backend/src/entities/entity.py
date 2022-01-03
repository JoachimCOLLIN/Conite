import datetime
from sqlalchemy import Column, String, Integer, DateTime


class Entity(): #dans python pas dans sqllite
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.datetime.now()
        self.updated_at = datetime.datetime.now() # à la création, l'update = date de création
        self.last_updated_by = created_by # à la création, le dernier à update est celui qui a créé le fichier
