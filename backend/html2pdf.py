import requests
from pyhtml2pdf import converter
from typing import Union
import os, time, base64

PATH = 'f:/kursach/backend/'

API_KEY = '9dfacc44c4d37f61ba01efcb799a5fff'



def edit_html(
        id: Union[str | int] = 15,
        FIO: str = "Иванов Иван Иванович",
        email: str = "legeorg2004@gmail.com",
        clas: str = "A",
        start_date: str = "2015-03-11",
        end_date: str = "2015-04-11",
        price: Union[str | int | float] = 2100,
        profile: str = "Профилактика"
):
    with open(PATH+"chek.html", "r", encoding='utf-8') as f:
        shablon = f.read()
    # shablon = shablon.format(
    #     id=id,
    #     FIO=FIO,
    #     email=email,
    #     clas=clas,
    #     start_date=start_date,
    #     end_date=end_date,
    #     price=price,
    #     profile=profile
    # )
    shablon = shablon\
    .replace('id_', str(id))\
    .replace('FIO', FIO)\
    .replace('email_', email)\
    .replace('clas_', clas)\
    .replace('start_date', start_date)\
    .replace('end_date', end_date)\
    .replace('price', str(price))\
    .replace('profile', profile)

    with open(PATH+"chek_res.html", "w", encoding='utf-8') as f:
        f.write(shablon)


    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = '{ "apikey": "9dfacc44c4d37f61ba01efcb799a5fff", "input": "upload", "outputformat":"pdf"}' 
    response = requests.post('http://api.convertio.co/convert', headers=headers, data=data).json()
    with open(PATH + 'chek_res.html', 'rb') as file:
        content = file.read()

    # print(response)
    # print(response['data']['id'])
    print(response)
    response = requests.put(f'http://api.convertio.co/convert/{response["data"]["id"]}/chek_res.html', data=content).json()
    # print(response)
    if response['code'] == 200:
        response1 = requests.get(f'http://api.convertio.co/convert/{response['data']['id']}/dl').json()
        while response1['code'] != 200:
            time.sleep(1)
            response1 = requests.get(f'http://api.convertio.co/convert/{response['data']['id']}/dl').json()
    # path = os.path.abspath(PATH+"chek_res.html")
    # converter.convert(f"file:///{path}", PATH+f"chek{id}.pdf")
    content = response1['data']['content']
    # print(response1)
    with open(PATH + f'chek{id}.pdf', 'wb') as file:
        file.write(base64.b64decode(content))
# edit_html()
    