from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from app.models import Ticket
from app import db
from sqlalchemy.exc import IntegrityError
from forms import new_ticket_form
import re

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


ticket_routes = Blueprint('tickets', __name__)

# GET route to retrieve all jobs and clients
@ticket_routes.route('/tickets-users', methods=['GET'])
def get_job_client_info():
    # Use joinedload() to perform an eager load of Job and Users
    result = db.session.query(Ticket).options(joinedload(Ticket.user)).all()

    # Convert query result to list of dictionaries to make it serializable
    data = []
    for ticket in result:
        ticket_data = {
            'ticket_id': ticket.id,
            'user_id': ticket.user_id,
            'name': ticket.name,
            'description': ticket.description

        }
        data.append(ticket_data)

    return jsonify(data), 200

# POST route to create a new job
@job_routes.route('/job', methods=['POST'])
def create_job():
    data = request.get_json()

    snake_case_data = {camel_to_snake(k): v for k, v in data.items()}

    form = new_job_form(data=snake_case_data)

    if form.validate():
        new_job = Job(**form.data)

        db.session.add(new_job)
        try:
            db.session.commit()
            return jsonify({'message': 'Job created successfully', 'job_id': new_job.id}), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({'message': 'Job creation failed'}), 400

    else:
        return jsonify(form.errors), 400
