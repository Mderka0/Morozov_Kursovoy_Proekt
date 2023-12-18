import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    });

    const handleUser = () => {
        if (user.password !== user.password2) {
            alert("Пароли не совпадают!")
        } else if (user.password === '') {
            alert("Введите пароль");
        } else {
            axios.post('/api/add_guest', user);
        }
    }

    return (
        <form className='SignUp'>

            <div className="containerReg">
                <div className="el el-1">
                    <span>ФИО:</span>
                </div>
                <div className="el el-2">                                   
                    <input type="text" placeholder='ФИО' onChange={ (e) => setUser({...user, name: e.target.value}) }/>
                </div>
                <div className="el el-3">
                    <span>Email:</span>
                </div>
                <div className="el el-4">
                    <input type="email" placeholder='Email' onChange={ (e) => setUser({...user, email: e.target.value}) }/>
                </div>
                <div className="el el-5">
                    <span>Телефон:</span>
                </div>
                <div className="el el-6">
                    <input type='tel' placeholder='Телефон' onChange={ (e) => setUser({...user, phone: e.target.value}) } />
                </div>
                <div className="el el-7">
                    <span>Пароль:</span>
                </div>
                <div className="el el-8">
                    <input type="password" placeholder='Введите свой пароль' onChange={ (e) => setUser({...user, password: e.target.value}) }/>
                </div>
                <div className="el el-9">
                    <span>Повторите:</span>
                </div>
                <div className="el el-10">
                    <input type="password" placeholder='Повторите пароль' onChange={ (e) => setUser({...user, password2: e.target.value}) }/>
                </div>
            </div>
            {/* <button className='SignInBut'> 
                Зарегестрироваться
            </button> */}
            <input type="button" value="Зарегестрироваться" className='SignInBut' onClick={handleUser}/>
            <Link to='/login'>Войти</Link>
        </form>
  )
}

export default SignUp