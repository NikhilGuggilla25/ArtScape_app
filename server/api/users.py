from flask import request, jsonify
from server import app, db
from server.database.models import User
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
import logging

@app.route('/api/signup/', methods=['POST'])
def signup():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    new_user = User(
        name=data['name'],
        email=data['email'],
        mobile_number=data['mobile_number'],
        password=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully!"}), 201
    except IntegrityError as e:
        db.session.rollback()
        logging.error(f"IntegrityError during signup: {str(e)}")
        return jsonify({"message": "User with this email or mobile number already exists!"}), 400
