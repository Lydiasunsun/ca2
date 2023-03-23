# form.py的作用相当于一半html，控制显示在网页上的内容。真正的计算还是在app.py 中

from flask_wtf import FlaskForm  # 错误🙅‍♂️wtforms
from wtforms import StringField, IntegerField, SubmitField, RadioField, DecimalField, choices, FloatField
# 错误 InputRequired, NumberRange
from wtforms.validators import InputRequired, NumberRange
# 忘记写


class Shiftform(FlaskForm):
    # ???忘记写， 而且Flaskfrom 无需（）
    # 这个是和html中的label 结合起来的连接点。
    plaintext = StringField('Plaintext:', validators=[InputRequired()])
    shift = IntegerField('Shift:', validators=[NumberRange(1, 25)])
    # 里面的string‘ciphertext’ 是显示在网页上的标签，也不需要validator， 但是一定要在form里面放这一行，
    ciphertext = StringField('Ciphertext:')
    submit = SubmitField('submit', validators=[InputRequired()])
    '''错误 🙅‍♂️plaintext = form.StringField
      shift = form.IntegerField'''


class Conversionform(FlaskForm):
    first = RadioField('From:', choices=['Fahrenheit', 'Celsius', 'Kelvin'])
    in1 = IntegerField('', validators=[InputRequired()])
    to = RadioField('To:', choices=['Fahrenheit', 'Celsius', 'Kelvin'])
    out = FloatField()
    submit = SubmitField()
