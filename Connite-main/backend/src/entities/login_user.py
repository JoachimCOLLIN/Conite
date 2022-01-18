import marshmallow
import sqlalchemy

from .entity import Entity
from .base import Base



class LoginUser(Entity, Base):
    __tablename__ = 'loginuser'
    email = sqlalchemy.Column(sqlalchemy.String(150),unique=True)
    password = sqlalchemy.Column(sqlalchemy.String(150))
    isloggedin= sqlalchemy.Column(sqlalchemy.Boolean)
    
    def __init__(self, email,password,isloggedin,created_by):
        Entity.__init__(self, created_by)
        self.email = email
        self.password = password

class LoginUserSchema(marshmallow.Schema):
    id = marshmallow.fields.Number()
    email = marshmallow.fields.Str()
    password = marshmallow.fields.Str()
    isloggedin= marshmallow.fields.Boolean()

    

