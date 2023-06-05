from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, Length(max=40)])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField(
    'password',
    validators=[
        DataRequired(),
        Regexp(
            r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            message="Password must contain at least 8 characters, including an uppercase letter, lowercase letter, a digit and a special character (@$!%*?&)."
            )
        ]
    )
    first_name = StringField('first_name', validators=[DataRequired(), Length(max=150)])
    last_name = StringField('last_name', validators=[DataRequired(), Length(max=150)])
    phone = StringField('phone', validators=[DataRequired(), Length(max=255)])  # You might want to add phone number validation here
