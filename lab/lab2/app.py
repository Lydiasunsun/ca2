from flask import Flask, request, render_template

app = Flask(__name__)


# @app.route('/form')
# def send_form():
#     return render_template('form.html')

@app.route('/spy', methods=['POST', 'GET'])  # method 必须是一个list ，中间是“”
def Introduce():
    if request.method == 'GET':  # ??why??
        return render_template('form.html')
    else:
        family_name = request.form['family_name']
        given_name = request.form['given_name']
        return render_template('spy_response.html', family_name=family_name, given_name=given_name)


@app.route('/morse', methods=['GET', 'POST'])  # 注意中括号和逗号
def morse():  # 注意这里括号里面没有内容

    if request.method == 'GET':
        return render_template('morse_form.html')  # 不明白这是什么？-初始表单
    else:
        morse = ''
        # ?为什么要写这个 先设定为空的然后在加入一个个。
        # 这是py 如何将html中用户在form中输入的内容取到py中  form 后面是[]
        message = request.form['message']
        message_modified = message.strip().upper()
        dic = {
            'A': '.-',
            'B': '-...',
            'C': '-.-.',
            ' ': '/'
        }
        if message == '':
            error = 'please enter character'
            return render_template('morse_form.html', error=error,
                                   message='',  morse='')
        else:
            for character in message_modified:
                if character not in dic:
                    error = 'character unknown'
                    return render_template('morse_form.html', error=error,
                                           message='',  morse='')  # for loop 检查完所有的字母之后才会走出程序。没检查完之前不出loop
                else:
                    code = dic[character]
                    morse = morse+''+code
            return render_template('morse_response.html', message=message,  morse=morse)

        # 注意 这里的文件要用引号,中间要用逗号
        # 为什么要写morse-为了response


@app.route('/lengths', methods=['GET', 'POST'])  # 不要忘记#
def get_form():

    if request.method == 'GET':
        return render_template('length.html')
    else:
        inches = request.form['inches']
        centimetres = request.form['centimetres']
        if inches == '' and centimetres == '':
            error = 'please enter one field'
            return render_template('length.html', inches='', centimetres='', error=error)
        elif inches != '' and centimetres != '':
            error = 'Please only enter one field'
            return render_template('length.html', inches='', centimetres='', error=error)
        elif inches != '' and centimetres == '':
            centimetres = float(inches)*2.54
            return render_template('length.html', inches=inches, centimetres=centimetres)
        elif inches == '' and centimetres != '':
            inches = float(centimetres)/2.54
            return render_template('length.html', inches=inches, centimetres=centimetres)
