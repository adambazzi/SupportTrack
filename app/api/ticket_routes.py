from flask import Blueprint, request, jsonify
from sqlalchemy.orm import joinedload
from app.models import Ticket
from app import db
from sqlalchemy.exc import IntegrityError
from app.forms import new_ticket_form
import re

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


ticket_routes = Blueprint('tickets', __name__)

# GET route to retrieve all tickets and users
@ticket_routes.route('/tickets-users', methods=['GET'])
def get_ticket_user_info():
    # Use joinedload() to perform an eager load of Job and Users
    result = db.session.query(Ticket).options(joinedload(Ticket.user)).all()

    # Convert query result to list of dictionaries to make it serializable
    data = []
    for ticket in result:
        ticket_data = {
            'ticket_id': ticket.id,
            'user_id': ticket.user_id,
            'ticket_heading': ticket.heading,
            'ticket_description': ticket.description,
            'ticket_status': ticket.status,
            'ticket_status_summary': ticket.status_summary,
            'user_email': ticket.user.email,
            'user_first_name': ticket.user.first_name,
            'user_last_name': ticket.user.last_name
        }
        data.append(ticket_data)

    return jsonify(data), 200

# POST route to create a new ticket
@ticket_routes.route('/ticket', methods=['POST'])
def create_ticket():
    data = request.get_json()

    snake_case_data = {camel_to_snake(k): v for k, v in data.items()}

    form = new_ticket_form(data=snake_case_data)

    if form.validate():
        new_ticket = Ticket(**form.data)

        db.session.add(new_ticket)
        try:
            db.session.commit()
            return jsonify({'message': 'Ticket created successfully', 'ticket_id': new_ticket.id}), 201
        except IntegrityError:
            db.session.rollback()
            return jsonify({'message': 'Ticket creation failed'}), 400

    else:
        return jsonify(form.errors), 400

# PUT route to revise ticket status (for admins only)
@ticket_routes.route('/<int:ticketId>', methods=['PUT'])
def revise_ticket(ticketId):
    data = request.get_json()

    snake_case_data = {camel_to_snake(k): v for k, v in data.items()}

    # Get the ticket by its id
    ticket = Ticket.query.get(ticketId)
    if not ticket:
        return jsonify({'message': 'Ticket not found'}), 404

    # Update status and status_summary if provided in the request
    if 'status' in snake_case_data:
        ticket.status = snake_case_data['status']
    if 'status_summary' in snake_case_data:
        ticket.status_summary = snake_case_data['status_summary']

    try:
        db.session.commit()
        return jsonify({'message': 'Ticket updated successfully'}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Ticket update failed'}), 400
