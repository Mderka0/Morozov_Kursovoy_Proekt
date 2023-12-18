import sqlite3
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
    print(request.get_data())
    return ''

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    cur.close()
    con.close()