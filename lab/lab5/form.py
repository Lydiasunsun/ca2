from flask_wtf import FlaskForm
from wtforms import IntegerField, SubmitField
from wtforms.validators import InputRequired


class guessForm(FlaskForm):
    mynumber = IntegerField('My Number:', validators=[InputRequired()])
    submit = SubmitField('Submit')
