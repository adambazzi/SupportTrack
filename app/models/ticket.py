from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User

class Ticket(db.Model):
    """
    Ticket model representing Tickets in the application.
    """
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    heading = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(200), nullable=False, default='Open')
    status_summary = db.Column(db.String(500))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'heading': self.heading,
            'description': self.description,
            'status': self.status,
            'status_summary': self.status_summary
        }

    # Define Relationships
    # Define a many-to-one relationship with Tickets
    user = db.relationship('User', back_populates='tickets')
