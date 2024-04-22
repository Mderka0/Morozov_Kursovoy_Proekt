
import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import EditUser from './Edit/EditUser';
import UserToken from '../../Context';

const AllUsers = () => {

    const {Token, setToken} = useContext(UserToken);
    const[user, setUser] = useState({
        name:'', phone:'', email:'', root:''
    })

    useEffect(() => {
        axios.post('/api/get_user', {token:Token})
        .then((data) => {
            setUser({
                name:data.data.name,
                phone:data.data.phone,
                email:data.data.email,
                root:data.data.root
            })
        })
    }, [setUser])
    
    const [filtres, setFiltres] = useState({
        Fio: '',
        Email: '',
        Phone: '',
        Status: ''

    });

    const [users, setUsers] = useState([]);
    const [users2, setUsers2] = useState([]);
    const [FIOs, setFIOs] = useState([]);
    const [Emails, setEmails] = useState([]);
    const [Phones, setPhones] = useState([]);
    const [Edit, setEdit] = useState({isEdit: false});
    useEffect(() => {
        axios.get('/api/users').then((data) => {
        setUsers(data.data.reverse());
        setUsers2(data.data.reverse());
        let temp = []
        data.data.map((elem) => {
            temp.push(elem.email)
        })
        setEmails([...new Set(temp)])
            temp = []
        data.data.map((elem) => {
            temp.push(elem.phone)
        })
        setPhones([...new Set(temp)])
            temp = []
        data.data.map((elem) => {
            temp.push(elem.name)
        })
        setFIOs([...new Set(temp)])
        })
    }, [setUsers, setEdit])

    const changeData = () => { 
        console.log(filtres);
        let temp = users2
        if (filtres.Fio !='')
        {
            temp = temp.filter((elem) => elem.name == filtres.Fio)
        }
        if (filtres.Email !='')
        {
            temp = temp.filter((elem) => elem.email == filtres.Email)
        }
        if (filtres.Phone !='')
        {
            temp = temp.filter((elem) => elem.phone == filtres.Phone)
        }
        if (filtres.Status !='')
        {
            temp = temp.filter((elem) => (elem.root==1?"Пользователь": (elem.root==2?"Менеджер" : "Админ")) == filtres.Status)
        }
        setUsers(temp)
        
    }
    
    const handleEdit = (user) => {
        setEdit({...user, isEdit: true})
    }

    return (
        <>

            <div className='filtres'>
                <div className='allUsersContainer'>
                    <div className='el el-1'>
                        <span>ФИО: </span>
                    </div>
                    <div className='el el-2'>
                    <input type="text" placeholder='ФИО' list='FIOs' onChange={(e) => {setFiltres ((prev) => {return {...prev, Fio: e.target.value }})}}/>
                        <datalist id='FIOs'>
                            {
                                FIOs.map((elem, id) => (<option value={elem} key={id}/>))
                            }
                        </datalist>
                    </div>
                    <div className='el el-1'>
                        <span>Телефон: </span>
                    </div>
                    <div className='el el-2'>
                    <input type="text" placeholder='Телефон' list='Phones' onChange={(e) => {setFiltres ((prev) => {return {...prev, Phone: e.target.value }})}}/>
                        <datalist id='Phones'>
                            {
                                Phones.map((elem, id) => (<option value={elem} key={id}/>))
                            }
                        </datalist>
                    </div>
                    <div className='el el-1'>
                        <span>Email: </span>
                    </div>
                    <div className='el el-2'>
                    <input type="text" placeholder='Email' list='Emails' onChange={(e) => {setFiltres ((prev) => {return {...prev, Email: e.target.value }})}}/>
                        <datalist id='Emails'>
                            {
                                Emails.map((elem, id) => (<option value={elem} key={id}/>))
                            }
                        </datalist>
                    </div>
                    <div className='el el-1'>
                        <span>Статус: </span>
                    </div>
                    <div className='el el-2'>
                    <input type="text" placeholder='Статус' list='Statuses' onChange={(e) => {setFiltres ({...filtres, Status: e.target.value })}}/>
                        <datalist id='Statuses'>
                            <option value="Пользователь"/>
                            <option value="Менеджер"/>
                            <option value="Администратор"/>
                        </datalist>
                    </div>
                </div>
            </div>
            <input type="button" value='Отфильтровать' onClick={changeData}/>


            <table>
                <tr>
                    <td>
                        ФИО
                    </td>
                    <td>
                        Телефон
                    </td>
                    <td>
                        Email
                    </td>
                    <td>
                        Статус
                    </td>
                    {user?.root>=3 && <td>Редактирование</td>}
                </tr>
                {users.map((user_cur, id) => {
                    return (
                        <tr key={id}>
                            <td>
                                {user_cur.name}
                            </td>
                            <td>
                                {user_cur.phone}
                            </td>
                            <td>
                                {user_cur.email}
                            </td>
                            <td>
                        
                                {user_cur.root==1?"Пользователь": (user_cur.root==2?"Менеджер" : "Админ")}
                            </td>
                            {user?.root>=3 && <td><MdEdit onClick={() => {handleEdit(user_cur)}}/></td> }
                        </tr>
                    )
                })}


            </table>
            {Edit.isEdit && <EditUser close = {setEdit} info = {Edit}/>}
        </>
    )
}


export default AllUsers