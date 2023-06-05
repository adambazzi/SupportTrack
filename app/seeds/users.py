from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from werkzeug.security import generate_password_hash

def seed_users():
    admin = User(
        username='Admin',
        email='admin@aa.io',
        phone='+1234567890',
        first_name='Admin',
        last_name='User',
        admin=True,
        hashed_password=generate_password_hash('password')  # replace with a secure password
    )

    user1 = User(
        username='User1',
        email='user1@aa.io',
        phone='+1234567891',
        first_name='User',
        last_name='One',
        admin=False,
        hashed_password=generate_password_hash('password')  # replace with a secure password
    )

    user2 = User(
        username='User2',
        email='user2@aa.io',
        phone='+1234567892',
        first_name='User',
        last_name='Two',
        admin=False,
        hashed_password=generate_password_hash('password')  # replace with a secure password
    )

    db.session.add(admin)
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
