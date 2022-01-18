import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base



class RegistrationUser(Entity, Base):
    __tablename__ = 'registrationuser'
    id= sqlalchemy.Column(sqlalchemy.String, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(150),unique=True)
    password1 = sqlalchemy.Column(sqlalchemy.String(150))
    password2 = sqlalchemy.Column(sqlalchemy.String(150))
    first_name=sqlalchemy.Column(sqlalchemy.String(150))
    family_name=sqlalchemy.Column(sqlalchemy.String(150))
    
    def __init__(self, email,first_name,family_name, password1,password2,created_by):
        Entity.__init__(self, created_by)
        self.email = email
        self.first_name= first_name
        self.family_name= family_name
        self.password1 = password1
        self.password2 = password2

class RegistrationUserSchema(marshmallow.Schema):
    id = marshmallow.fields.Number()
    email = marshmallow.fields.Str()
    password1 = marshmallow.fields.Str()
    password2 = marshmallow.fields.Str()
    first_name = marshmallow.fields.Str()
    family_name =marshmallow.fields.Str()
    

