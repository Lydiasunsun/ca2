from flask import Flask, render_template
from database import get_db, close_db
from forms import WinnerForm, MinForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'this-is-my-secret-key'
app.teardown_appcontext(close_db)


@app.route('/winners', methods=['GET', 'POST'])
def winners():
    form = WinnerForm()
    winner = ''
    if form.validate_on_submit():
        country = form.country.data
        db = get_db()
        winner = db.execute(
            '''SELECT * FROM winners WHERE country=?;''', (country,)).fetchone()  # 注意是fetchone（） 给空值或者一个dictionary。fetchall always 给一个list 哪怕是空的
        if winner is None:
            form.country.errors.append(
                'Sadly this country has no winners yet :(')
        else:
            # 这里需要重新写winner= 如果是insert 则不需要 winner =
            winner = db.execute(
                '''SELECT * FROM winners WHERE country= ? ;''', (country,)).fetchall()
            db.commit()
    return render_template('winners.html', form=form, winner=winner)


# 使用get_db来连接数据库。忘记了整个if 的部分
# 忘记了 db.commit()
# db.execute 之前不需要 任何=

@app.route('/min_winners', methods=['GET', 'POST'])
def min_winners():
    form = MinForm()
    winner = ''

    if form.validate_on_submit():
        country = form.country.data
        points = form.points.data
        db = get_db()

        if country != '' and points == '':
            winner = db.execute(
                '''SELECT * FROM winners WHERE country=?;''', (country,)).fetchall()
        elif points != '' and country == '':
            winner = db.execute('''SELECT * FROM winners WHERE points>=?;''',
                                (points,)).fetchall()
        elif points != '' and country != '':
            winner = db.execute(
                '''SELECT * FROM winners WHERE points>=? AND country =?;''', (points, country)).fetchall()
        else:
            winner = db.execute('''SELECT * FROM winners;''')

    return render_template('min_winners.html', form=form, winner=winner)
