from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, EmailField, SubmitField

class UserForm(FlaskForm):
    u_name = StringField("Name")
    u_email = StringField("Email")
    u_password = StringField("Password")
    submit = SubmitField("Add User")


class MessagesForm(FlaskForm):
    u_name = StringField("Name")
    u_email = EmailField("Email")
    u_message = TextAreaField("Message")
    submit = SubmitField("Submit")