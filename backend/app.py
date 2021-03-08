from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import Config
import json
from flask_cors import CORS
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
# Init app
app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

migrate=Migrate(app,db) #Initializing migrate.
manager = Manager(app)
manager.add_command('db',MigrateCommand)

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    slug = db.Column(db.String(40))
    active = db.Column(db.Boolean, default=False)

    def __init__(self, name, slug, active):
        self.name = name
        self.slug = slug
        self.active = active

    def __repr__(self):
        return '<Client {}>'.format(self.name)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'active': self.active
        }

# User Schema
class ClientSchema(ma.ModelSchema):
    class Meta:
        model = Client

# User ClassModel
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    claims = db.Column(db.String(500))

    def __init__(self, name, email, claims):
        self.name = name
        self.email = email
        self.claims = json.dumps(claims)

    def __repr__(self):
        return '<User {}>'.format(self.name)

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'claims': json.loads(self.claims)
        }

# User Schema
class UserSchema(ma.ModelSchema):
    class Meta:
        model = User


# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Init schema
client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)

# Get an User
@app.route('/user/<int:id_user>', methods=['GET'])
def get_user(id_user):
    # Database call
    user = User.query.get(id_user)

    # If no users found, an error is sent
    if user is None:
        return jsonify({'No matches found': 'No user with the id : ' + str(id_user)}), 400

    # Else all the user information is sent
    return user.json()

# Get Users
@app.route('/users', methods=['GET'])
def get_users():
    # Database call
    users = User.query.all()

    # If no users found, an error is sent
    if users is None:
        return jsonify({'No users found'}), 400

    # Else all the users information is sent
    return {'users': [user.json() for user in users]}, 200


# Add an User
@app.route('/user', methods=['POST'])
def add_user():
    # Check if the request is json
    if not request.is_json:
        return jsonify({'Invalid request': 'Mimetype is not application/json or application/*+json'}), 400
    else:
        # Check if the request is well formed
        if all(arg in request.json.keys() for arg in ["name", "email", "claims"]):
            name = request.json['name']
            email = request.json['email']
            claims = request.json['claims']

            # Creation of the new user
            new_user = User(name, email, claims)
            db.session.add(new_user)
            db.session.commit()

            return new_user.json()
        else:
            return jsonify({'Error': 'Missing argument in the request'}), 400


# Update an User
@app.route('/user/<int:id_user>', methods=['PUT'])
def update_user(id_user):
    # Check if the request is json
    if not request.is_json:
        return jsonify({'Invalid request': 'Mimetype is not application/json or application/*+json'}), 400
    else:
        user = User.query.get(id_user)
        # If no users found, an error is sent
        if user is None:
            return jsonify({'No matches found': 'No user with the id : ' + str(id_user)}), 400
        # Check if the request is well formed
        elif not all(arg in request.json.keys() for arg in ["name", "email", "claims"]):
            return jsonify({'Error': 'Missing argument in the request'}), 400
        else:
            name = request.json['name']
            email = request.json['email']
            claims = request.json['claims']

            # Update of the user
            user.name = name
            user.email = email
            user.claims = json.dumps(claims)
            db.session.commit()

            return user.json()

# Get Clients
@app.route('/clients', methods=['GET'])
def get_clients():
    # Database call
    clients = Client.query.all()

    # If no users found, an error is sent
    if clients is None:
        return jsonify({'No client found'}), 400

    # Else all the users information is sent
    return {'clients': [client.json() for client in clients]}, 200

# Update an Client
@app.route('/client/<int:id_client>', methods=['PUT'])
def update_client(id_client):
    # Check if the request is json
    if not request.is_json:
        return jsonify({'Invalid request': 'Mimetype is not application/json or application/*+json'}), 400
    else:
        client = Client.query.get(id_client)
        # If no clients found, an error is sent
        if client is None:
            return jsonify({'No matches found': 'No client with the id : ' + str(id_client)}), 400
        # Check if the request is well formed
        elif not all(arg in request.json.keys() for arg in ["name","active"]):
            return jsonify({'Error': 'Missing argument in the request'}), 400
        else:
            name = request.json['name']
            active = request.json['active']

            # Update of the client
            client.name = name
            client.active = active
            db.session.commit()

            return client.json()


# Run Server
if __name__ == '__main__':
    manager.run()