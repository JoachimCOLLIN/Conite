import functools

import flask
import werkzeug.security

from .db import get_session
from flask import Blueprint, render_template, request, flash, redirect, url_for
from .entities.auth import User,UserSchema
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

blueprint = flask.Blueprint('auth', __name__)


@blueprint.route('/login', methods=['GET', 'POST'])
def login():
    print(1)
    if request.method == 'POST':
        requesting_user = UserSchema(only=('email','password')).load(flask.request.get_json())
        print(email)
        session = get_session()
        user = session.query(User).filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return flask.jsonify()
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash('Email does not exist.', category='error')
    
    return flask.jsonify(ouvriers),201


@blueprint.route('/logout')
#@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@blueprint.route('/register', methods=['GET', 'POST'])
def sign_up():
    print(1)
    if flask.request.method == 'POST':
        
        requesting_user = UserSchema(only=('email', 'first_name','family_name','password1','password2')).load(flask.request.get_json())
        a=requesting_user["email"][0]
        print(a)
        session = get_session()
        user = session.query(User).filter_by(email=a).first()
        print(1)
        if user:
            flash('Email already exists.', category='error')
            print(1)
        elif len(email) < 4:
            flash('Email must be greater than 3 characters.', category='error')
        elif len(first_name) < 2:
            flash('First name must be greater than 1 character.', category='error')
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 7:
            flash('Password must be at least 7 characters.', category='error')
        else:
            new_user = User(email=requesting_user["email"], first_name=requesting_user["first_name"], family_name=requesting_user["family_name"], password1=generate_password_hash(
                requesting_user["password1"], method='sha256'), password2=generate_password_hash(
                requesting_user["password2"], method='sha256'))
            session=get_session()
            session.add(new_user)
            session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return flask.jsonify(new_user),201

    return 201
