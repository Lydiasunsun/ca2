from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import input_required


class WinnerForm(FlaskForm):
    country = StringField('Country:', validators=[input_required()])
    submit = SubmitField()


#    错误 country = form.country.data
# 这两个忘记写：1.from wtforms import StringField, SubmitField 2. from wtforms.validators import input_required
class MinForm(FlaskForm):
    country = StringField('Country:')
    points = StringField('Points:')
    submit = SubmitField()
