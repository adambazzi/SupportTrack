from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
# from sqlalchemy.schema import CheckConstraint
from flask_login import UserMixin
from sqlalchemy import text
import re  # importing re module


class User(db.Model, UserMixin):
    """A User model that stores user information and handles password hashing."""
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True, index=True)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    phone = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)


    @property
    def password(self):
        """Prevent password from being accessed."""
        raise AttributeError("Password attribute is not readable.")

    @password.setter
    def password(self, password):
        """Set password to a hashed password."""
        # Password complexity check
        pattern = re.compile(
            r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        )
        if not pattern.match(password):
            raise ValueError(
                "Password must contain at least 8 characters, including an uppercase letter, "
                "lowercase letter, a digit and a special character (@$!%*?&)."
            )
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """Check if hashed password matches with the provided password."""
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        """Return user details as a dict."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'admin': self.admin
        }

    def __repr__(self):
        """Represent instance of a User."""
        return f"<User: {self.username}>"

    # Define Relationships
    # Define a one-to-many relationship with Tickets for user
    tickets = db.relationship('Ticket', back_populates='user')
