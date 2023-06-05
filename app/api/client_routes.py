from flask import Blueprint, jsonify, request

from app.models import db, Client

client_routes = Blueprint('clients', __name__)

# GET route to retrieve all clients
@client_routes.route('/', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    data = [{'id': client.id, 'name': client.name, 'address': client.address,
             'city': client.city, 'state': client.state, 'zip_code': client.zip_code,
             'lat': client.lat, 'lng': client.lng} for client in clients]
    return jsonify(data), 200

# POST route to create a new client
@client_routes.route('/', methods=['POST'])
def create_client():
    data = request.get_json()

    new_client = Client(
        name=data.get('name'),
        address=data.get('address'),
        city=data.get('city'),
        state=data.get('state'),
        zip_code=data.get('zipCode'),
        lat=data.get('lat'),
        lng=data.get('lng')
    )

    db.session.add(new_client)
    db.session.commit()

    return jsonify({
        'id': new_client.id,
        'name': new_client.name,
        'address': new_client.address,
        'city': new_client.city,
        'state': new_client.state,
        'zip_code': new_client.zip_code,
        'lat': new_client.lat,
        'lng': new_client.lng
    }), 201
