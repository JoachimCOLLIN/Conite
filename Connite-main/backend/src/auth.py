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


@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    print(1)
    if request.method == 'POST':
        requesting_user = flask.request.get_json()
        print(requesting_user)
        session = get_session()
        user = session.query(LoginUser).filter_by(email=requesting_user["email"]).first()
        print(user)
        if user:
            if check_password_hash(user, requesting_user["password"]):
                requesting_user["isloggedIn"]=True
                return flask.jsonify(requesting_user)
            else:
            #password is not corrected
                return 203
        else:
            # user doesn't exists
            return 202
    return 201



@blueprint.route('/logout',methods=['GET','POST'])
#@login_required
def logout():
    requesting_user = flask.request.get_json()
    requesting_user["isloggedIn"]=False
    return flask.jsonify(requesting_user)


@blueprint.route('/register', methods=['GET', 'POST'])
def sign_up():
    if flask.request.method == 'POST':
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
                registration_user = RegistrationUser(**requesting_user,created_by='HTTP request')
                session.add(registration_user)
                session.commit()
                new_user = RegistrationUserSchema().dump(registration_user)
                session.close()
                return flask.jsonify(new_user),201

    return 201
