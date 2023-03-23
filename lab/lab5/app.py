from flask import Flask, session, render_template
from flask_session import Session
from random import randint
from form import guessForm

app = Flask(__name__)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config["SECRET_KEY"] = 'this-is-my-secret-key'
Session(app)
# app.teardown_appcontext(close_db)


@app.route('/guess', methods=['Get', 'POST'])
def guess():
    #     session = {} session is dictionary by default. if initialize it at the beginning then secret number will be kept changing becasuse the session is cleared at the beginning.
    message = ''
    form = guessForm()
#     mynumber = '' ?why mynumber does not need to be initialized but message need to be ?
    if 'secret' not in session:
        secret = randint(1, 100)
        session['secret'] = secret
    if form.validate_on_submit():
        secret = session['secret']
        number = form.mynumber.data
        mynumber = int(number)
        if mynumber > secret:
            session['mynumber'] = mynumber
            message = 'Your number is bigger,try again'
        elif mynumber < secret:
            session['mynumber'] = mynumber
            message = 'Your number is smaller,try again'
        else:
            message = 'this is the secret number!'
    return render_template('guess.html', message=message, form=form)

# no need to use a while loop
