import sqlite3
from hashlib import sha256
from flask import Flask, request, send_file
from flask_cors import CORS
from uuid import uuid4
from html2pdf import edit_html, PATH
import threading
import datetime as dt

lock = threading.Lock()
app = Flask(__name__)
CORS(app)
con = sqlite3.connect("f:/kursach/hostel.db", check_same_thread=False)
cur = con.cursor()
users = dict()


@app.route('/api/users')
def get_guests():
    cur.execute('SELECT * FROM guest')
    users: list[dict] = []
    for i in cur.fetchall():
        user = dict()
        user['name'] = i[0]
        user['phone'] = i[1]
        user['email'] = i[2]
        user['root'] = i[4]
        users.append(user)
    
    return users

@app.route('/api/add_guest', methods=['POST'])
def add_user():
    user = request.get_json()
    # print(user)
    # print(sha256(user.get('password').encode('utf8')).hexdigest())
    cur.execute("SELECT * FROM Guest WHERE GstEmail = ? OR GstPhone = ?", 
                (user['email'], user['phone'] ,))
    con.commit()
    res = cur.fetchone()
    if res is None:
        cur.execute("INSERT INTO Guest VALUES (?, ?, ?, ?, ?)", 
                    (user['name'], user['phone'], user['email'], 
                     sha256(f'{user["password"]}'
                            .encode('utf8')).hexdigest(), 1, ))
        con.commit()
    elif res[1] == user['phone']:
        return {"Message": "Пользователь с таким Номером телефона уже существует",
                 "Negative": True}
    else:
        return {"Message": "Пользователь с таким Email уже существует",
                 "Negative": True}
    token = uuid4().hex
    users[token] = dict()
    users[token]['email'] = user['email']
    users[token]['phone'] = user['phone']
    users[token]['name'] = user['name']
    users[token]['root'] = '1'
    
    return {"Message": "Успешно добавлен пользователь", "Negative": False,
             'token': token}


@app.route('/api/login_guest', methods=['POST'])
def login_user():
    user = request.get_json()
    password = (sha256(user.get('password').encode('utf8')).hexdigest())
    cur.execute('select * from Guest where GstEmail = ? AND GstPassword = ?',
                 (user['email'], password, ) )
    con.commit()
    res = cur.fetchone()
    if res is None: return {"Message": "Пользователь не найден", "Negative": True}
    token = uuid4().hex
    users[token] = dict()
    users[token]['email'] = res[2]
    users[token]['phone'] = res[1]
    users[token]['name'] = res[0]
    users[token]['root'] = res[4]
    # print(users)
    return {"Message": "Вход выполнен успешно", "Negative": False, 'token': token}


@app.route('/api/get_appartments')
def get_appartments():
    cur.execute('Select * from Apartment')
    con.commit()
    data = []
    for i in cur.fetchall():
        temp = dict()
        temp['clas'] = i[0]
        temp['description'] = i[1]
        temp['image'] = i[2]
        data.append(temp)
    return data

@app.route('/api/add_book',  methods=['POST'])
def add_book():
    data = (request.get_json())
    cur.execute("INSERT INTO booking VALUES (?, ?, ?, ?, ?, ?, ?)", 
                (None, data['ApsClass'], data['GstEmail'],
                  data['BokCost'], data['BokDateSt'], 
                  data['BokDateFn'], 'Ожидает подтверждения',))
    con.commit()
    cur.execute("Select BokID from booking where ApsClass = ? and GstEmail = ? \
                and BokCost = ? and BokDateSt = ? and BokDateFn = ? ", 
                ( data['ApsClass'], data['GstEmail'],
                  data['BokCost'], data['BokDateSt'], 
                  data['BokDateFn'],))
    id = cur.fetchone()[0]
    cur.execute("INSERT INTO uslugi VALUES (?, ?, ?)", 
                (None, id, "Профилактика",))
    con.commit()
    cur.execute("Select UslId from uslugi where BokId =?",
                (id,))
    idUsl = cur.fetchone()[0]
    proced = 'Массаж'
    if data['ApsClass'] in ('B', 'C'):
        proced += ', Физкультура'
        if data['ApsClass'] == 'C':
            proced += ', Соляная комната'
    cur.execute("INSERT INTO procedure VALUES (?, ?, ?)", 
                (None, idUsl, proced, ))
    con.commit()
    
    return {"Message": "Успешно добавлен", "Negative": False}

@app.route('/api/get_books',  methods=['POST'])
def get_books():
    if not request.get_json():
        return {}
    token = request.get_json()['token']
    # print(token)
    email = users[token]['email']

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
        temp['BokStatus'] = book[6]
        data.append(temp)
                
    if data: 
        return {"Message": "", "Negative": False, 'Books': data}
    return{"Message": "Пока пусто", "Negative": True}

@app.route('/api/deleteBook', methods=['POST'])
def del_books():
    if not request.get_json():
        return {}
    token = request.get_json()['token']
    id_ = request.get_json()['id']
    email = users[token]['email']

    cur.execute("update booking set BokStatus = 'Отменён' where BokID = ?", (id_, ))
    con.commit()
    cur.execute("select * from booking where GstEMail = ?", (email, ))
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
        temp['BokStatus'] = book[6]
        data.append(temp)
                
    if data: 
        return {"Message": "", "Negative": False, 'Books': data}
    return{"Message": "Пока пусто", "Negative": True}
    

@app.route('/api/get_all_books')
def get_all_books():
    cur.execute("Select * from booking")
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
        temp['BokStatus'] = book[6]
        data.append(temp)
                
    if data: 
        return {"Message": "", "Negative": False, 'Books': data}
    return{"Message": "Пока пусто", "Negative": True}


@app.route('/api/update_book', methods=['POST'])
def upd_books():
    data = request.get_json()
    cur.execute("update booking set BokStatus = ?, ApsClass = ?, BokCost = ? where BokID = ?", 
                (data['BokStatus'], data['ApsClass'], data['BokCost'], data['id']))
    con.commit()
    return ''    
    
@app.route('/api/update_user', methods=['POST'])
def upd_user():
    data = request.get_json()
    cur.execute(
        "update Guest set GstFullName = ?, GstPhone = ?, GstEmail = ?, GstRoot = ? where GstEmail = ?",
          (data['name'], data['phone'], 
            data['email'], data['root'], data['email']))
    con.commit()
    return ''    
    
@app.route('/api/get_user', methods=['POST'])
def get_user():
    if not request.get_json():
        return {}
    token = request.get_json()['token']
    if not token: return{'name': '', 'email': '', 'phone': '', 'root': ''}
    email = users[token]['email']
    name = users[token]['name']
    phone = users[token]['phone']
    root = users[token]['root']

    return{'name': name, 'email': email, 'phone': phone, 'root': root}

    # try:
    #     lock.acquire(True)
    #     cur.execute('select * from Guest where GstEmail = ?', (email, ))
    #     res = cur.fetchone()
    # # con.commit()
    # finally:
    #     lock.release()
    # return{'name': res[0], 'email': res[2], 'phone': res[1], 'root': res[4]}

@app.route('/api/uslugi/<id_usl>')
def uslugi(id_usl:int):
    cur.execute('Select * from booking where BokId = ?', (id_usl, ))
    resp = cur.fetchone()
    clas = resp[1]
    email = resp[2]
    start = dt.datetime.strptime(resp[4], '%Y-%m-%d').date()
    end = dt.datetime.strptime(resp[5], '%Y-%m-%d').date()
    
    # print(start, end, end - start)
    cur.execute("Select * from uslugi where BokId = ?", (id_usl, ))
    data = cur.fetchone()
    temp = dict()
    temp['UslId'] = data[0]
    temp['BokId'] = data[1]
    temp['UslClass'] = data[2]

    return {'clas' : clas, 'email': email, 'days': (end-start).days, **temp }

@app.route('/api/get_chek', methods=['POST'])
def get_chek():
    token = request.get_json()['token']
    clas = request.get_json()['clas']
    start_date = request.get_json()['start_date']
    end_date = request.get_json()['end_date']
    price = request.get_json()['price']
    id = request.get_json()['id']
    # token = request.get_json()['token']
    fio = users[token]['name']
    email = users[token]['email']
    edit_html(id, fio, email, clas, start_date, end_date, price)
    return send_file(PATH+f'chek{id}.pdf')


@app.route('/api/set_uslugi', methods=['POST'])
def set_uslugi():
    uslId = request.get_json()['UslId']
    uslClass = request.get_json()['UslClass']
    proc = request.get_json()['Proc']

    cur.execute(
        "update uslugi set UslClass = ? where UslId = ?",
          (uslClass, uslId, ))
    cur.execute('update procedure set ProcName = ? where UslId = ?',
                (proc, uslId, ))
    con.commit()
    return ''    
    

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