import functools

import flask
import werkzeug.security

from .db import get_session
from flask import Blueprint, render_template, request, flash, redirect, url_for
from .entities.registration_user import RegistrationUser,RegistrationUserSchema
from .entities.login_user import LoginUser,LoginUserSchema
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

blueprint = flask.Blueprint('auth', __name__)


@blueprint.route('/login', methods=[ 'POST'])
def login():
    requesting_user = flask.request.get_json()
    print
    session = get_session()
    user = session.query(RegistrationUser).filter_by(email=requesting_user["email"]).first()
    if user.password1==requesting_user["password"]:
        new_user = {'id': user.id, 'isloggedIn': True, 'email': user.email}
        session.close()
        print(new_user)
        return flask.jsonify(new_user)
    return "err"




@blueprint.route('/logout',methods=['GET','POST'])
def logout():
    requesting_user = flask.request.get_json()
    requesting_user["isloggedIn"]=False
    return flask.jsonify(requesting_user)



@blueprint.route('/register', methods=['POST'])
def sign_up():
    requesting_user = RegistrationUserSchema(only=('email', 'first_name','family_name','password1','password2')).load(flask.request.get_json())
    if requesting_user["password1"]!=requesting_user["password2"]:
        print("wrong password")
    else:
        session = get_session()
        user = session.query(RegistrationUser).filter_by(email=requesting_user["email"]).first()
        print(user)
        if user:
            print("already exist")
            session.close()

        else:
            print("ok")
            registration_user = RegistrationUser(**requesting_user,created_by='HTTP post request')
            session.add(registration_user)
            session.commit()
            new_user = RegistrationUserSchema().dump(registration_user)
            session.close()
            return flask.jsonify(new_user),201

    return 'er'
