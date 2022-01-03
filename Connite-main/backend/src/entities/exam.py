import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base


class Exam(Entity, Base): #travaille dans sqlite
    __tablename__ = 'exams'

    title = sqlalchemy.Column(sqlalchemy.String) #une colonne de strings correspondant au nom
    description = sqlalchemy.Column(sqlalchemy.String) #une colonne de strings correspondant à la description de l'exaù

    def __init__(self, title, description, created_by):
        Entity.__init__(self, created_by)
        self.title = title
        self.description = description


class ExamSchema(marshmallow.Schema):
    id = marshmallow.fields.Number()
    title = marshmallow.fields.Str()
    description = marshmallow.fields.Str()
    created_at = marshmallow.fields.DateTime()
    updated_at = marshmallow.fields.DateTime()
    last_updated_by = marshmallow.fields.Str()
