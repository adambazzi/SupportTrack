from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length

class TicketForm(FlaskForm):
    """
    Form for creating a new Ticket.
    """
    user_id = IntegerField('User ID', validators=[DataRequired()])
    heading = StringField('Heading', validators=[DataRequired(), Length(max=200)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=500)])
    status = StringField('Status', default='Open')
    status_summary = TextAreaField('Status Summary')
