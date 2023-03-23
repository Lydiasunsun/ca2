from flask import Flask, render_template
from forms import Shiftform, Conversionform
# ??这个是在哪里-是在form.py 中定义的class
app = Flask(__name__)
app.config["SECRET_KEY"] = "this-is-my-secret-key"


@app.route('/shift', methods=['POST', 'GET'])  # 注意是methods
def shift():
    form = Shiftform()  # ???什么时候加（）？
#     plaintext = form.plaintext.data
#     shift = form.shift.data
    error = ''  # 不需要
    if form.validate_on_submit():
        plaintext = form.plaintext.data
        shift = form.shift.data
#         if plaintext == False:
#             error = 'This field is required.'
#         else:
        ciphertext = ""
        for char in plaintext:
            if char.isupper():
                ciphertext += chr((ord(char) - 65 + shift) % 26 + 65)
            elif char.islower():
                ciphertext += chr((ord(char) - 97 + shift) % 26 + 97)
            else:
                ciphertext += char
        form.ciphertext.data = ciphertext  # (这一行很重要)

#         if shift > 25 or shift < 1:
#             error = 'Number must be between 1 and 25'
    return render_template('shift_form.html', form=form, error=error)
    # 不需要这个 method = 'POST':
    # plaintext=plaintext, shift=shift, ciphertext=ciphertext 注意不需要这些


@app.route('/conversion', methods=['POST', 'GET'])
def conversion():
    form = Conversionform()
    out = ''
    if form.validate_on_submit():
        #         out = 0
        first = form.first.data
        in1 = form.in1.data
        to = form.to.data

        if first == 'Celsius' and to == 'Fahrenheit':
            out = 9/5 * in1 + 32
        elif first == 'Kelvin' and to == 'Fahrenheit':
            out = 9/5 * (in1 - 273) + 32
        elif first == 'Fahrenheit' and to == 'Celsius':
            out = 5/9 * (in1-32)
        elif first == 'Celsius' and to == 'Kelvin':
            out = in1 + 273
        elif first == 'Kelvin' and to == 'Celsius':
            out = in1 - 273
        elif first == 'Kelvin' and to == 'Celsius':
            out = 5/9*(in1 - 32)+273
        else:
            out = in1
        form.out.data = out
    return render_template('conversion_form.html', form=form)
