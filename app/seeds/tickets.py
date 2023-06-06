
from app.models import db, User, Ticket, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_tickets():
    # Fetch users from the database
    admin = User.query.filter_by(username='Admin').first()
    user1 = User.query.filter_by(username='User1').first()
    user2 = User.query.filter_by(username='User2').first()

    # Create tickets for each user
    ticket1 = Ticket(
        user_id=admin.id,
        heading='Admin Ticket 1',
        description='This is a description of admin ticket 1.',
        status='Open',
        status_summary='Ticket is opened and under review.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ticket2 = Ticket(
        user_id=user1.id,
        heading='User1 Ticket 1',
        description='This is a description of User1 ticket 1.',
        status='Open',
        status_summary='Ticket is opened and under review.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ticket3 = Ticket(
        user_id=user2.id,
        heading='User2 Ticket 1',
        description='This is a description of User2 ticket 1.',
        status='Open',
        status_summary='Ticket is opened and under review.',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Add and commit the new tickets to the database
    db.session.add(ticket1)
    db.session.add(ticket2)
    db.session.add(ticket3)
    db.session.commit()

def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))

    db.session.commit()
