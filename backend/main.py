import sqlite3
from hashlib import sha256
from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
con = sqlite3.connect("hostel.db", check_same_thread=False)
cur = con.cursor()


@app.route('/api/users')
def get_guests():
    print('test')
    cur.execute('SELECT * FROM guest')
    users: list[dict] = []
    for i in cur.fetchall():
        user = dict()
        user['id'] = i[0]
        user['name'] = i[1]
        user['phone'] = i[2]
        user['email'] = i[3]
        users.append(user)
    
    return users

@app.route('/api/add_guest', methods=['POST'])
def add_user():
    user = request.get_json()
    print(user)
    print(sha256(user.get('password').encode('utf8')).hexdigest())
    cur.execute("SELECT * FROM Guest WHERE GstEmail = ? OR GstPhone = ?", (user['email'], user['phone'] ,))
    con.commit()
    res = cur.fetchone()
    if res is None:
        cur.execute("INSERT INTO Guest VALUES (?, ?, ?, ?, ?)", (None, user['name'], user['phone'], user['email'], sha256(f'{user["password"]}'.encode('utf8')).hexdigest(), ))
        con.commit()
    elif res[2] == user['phone']:
        return {"Message": "Пользователь с таким Номером телефона уже существует", "Negative": True}
    else:
        return {"Message": "Пользователь с таким Email уже существует", "Negative": True}
    return {"Message": "Успешно добавлен пользователь", "Negative": False}


@app.route('/api/login_guest', methods=['POST'])
def login_user():
    user = request.get_json()
    password = (sha256(user.get('password').encode('utf8')).hexdigest())
    cur.execute('select * from Guest where GstEmail = ? AND GstPassword = ?', (user['email'], password, ) )
    con.commit()
    res = cur.fetchone()
    if res is None: return {"Message": "Пользователь не найден", "Negative": True}
    return {"Message": "Вход выполнен успешно", "Negative": False, 'phone' : res [2], 'name' : res [1], 'email' : res [3]}

@app.route('/api/get_appartments')
def get_appartments():
    cur.execute('Select * from Apartment')
    con.commit()
    data = []
    for i in cur.fetchall():
        temp = dict()
        temp['id'] = i[0]
        temp['clas'] = i[1]
        temp['description'] = i[2]
        temp['image'] = i[3]
        data.append(temp)
    return data

@app.route('/api/add_book',  methods=['POST'])
def add_book():
    data = (request.get_json())
    cur.execute("INSERT INTO booking VALUES (?, ?, ?, ?, ?, ?)", (None, data['ApsClass'], data['GstEmail'], data['BokCost'], data['BokDateSt'], data['BokDateFn'],))
    con.commit()
      
    return {"Message": "Успешно добавлен", "Negative": False}

@app.route('/api/get_books',  methods=['POST'])
def get_books():
    email = request.get_json()['email']
    cur.execute("Select * from booking where GstEmail = ?", (email, ))
    con.commit()
    data = []
    for book in cur.fetchall():
        temp = dict()
        temp['id'] = book[0]
        temp['ApsClass'] = book[1]
        temp['GstEmail'] = book[2]
        temp['BokCost'] = book[3]
        temp['BokDateSt'] = book[4]
        temp['BokDateFn'] = book[5]
        data.append(temp)
                
    if data: 
        return {"Message": "", "Negative": False, 'Books': data}
    return{"Message": "Пока пусто", "Negative": True}


# CREATE TABLE IF NOT EXISTS Guest
# (
# GstID integer primary key AUTOINCREMENT,
# GstFullName TEXT,
# GstPhone TEXT unique,
# GstEmail TEXT unique,
# GstPassword TEXT
# );

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    cur.close()
    con.close()