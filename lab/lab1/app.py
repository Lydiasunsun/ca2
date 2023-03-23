from flask import Flask, render_template
from random import choice, randint


app = Flask(__name__)

# #problem 1


@app.route('/rps/<player>')
def rps(player):
    computer_weapon = ['rock', 'scissors', 'paper']  # remember =
    computer = choice(computer_weapon)
    if computer == player:  # remember :
        return "It's a draw"  # can't use , should use +

    elif player == 'rock' and computer == 'paper':
        return 'Computer wins!'
    elif player == 'paper' and computer == 'scissors':
        return 'Computer wins!'
    elif player == 'scissors' and computer == 'rock':
        return 'Computer wins!'
    else:
        return 'Player wins!'

# problem 2


@app.route('/rps/webpage/<player>')
def send_result(player):
    computer_weapon = ['rock', 'scissors', 'paper']
    computer = choice(computer_weapon)
    if computer == player:
        result = "It's a draw"
    elif computer == 'rock' and player == 'scissors':
        result = "Computer wins!"
    elif computer == 'scissors' and player == 'paper':
        result = "Computer wins!"
    elif computer == 'paper' and player == 'rock':
        result = "Computer wins!"
    else:
        result = "Player wins!"
    return render_template('rps.html', player=player, computer=computer, result=result)


@app.route('/could_it_be_me')
def send_lotto_numbers():
    list_of_numbers = []
    for i in range(0, 6):
        n = randint(1, 47)
        list_of_numbers.append(n)
    return render_template('lotto.html', list_of_numbers=list_of_numbers)


@app.route('/could_it_be_me2')
def send_lotto_numbers2():
    y = randint(1, 47)
    list_of_numbers2 = []
    while len(list_of_numbers2) < 7:
        if y not in list_of_numbers2:
            list_of_numbers2.append(y)

    return render_template('lotto2.html', list_of_numbers2=list_of_numbers2)
