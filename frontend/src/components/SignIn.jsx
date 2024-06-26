import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import UserToken from '../Context';

const SignIn = () => {
    const navigate = useNavigate();
    const [user, SetUser] = useState({
        email:'',
        password:''   
    })

    const {Token, setToken} = useContext(UserToken);
    //alert(Token)
    const handleLogin = () => {
        if (user.email == '' || user.password == '' ) alert('Заполните поля')
        else {
            axios.post('/api/login_guest', user).then((data)=>{
                if (data.data.Negative == true) {alert(data.data.Message)}
                else {
                    // sessionStorage.setItem('name', data.data.name);
                    // sessionStorage.setItem('email', data.data.email);
                    // sessionStorage.setItem('phone', data.data.phone);
                    // sessionStorage.setItem('root', data.data.root);
                    // sessionStorage.setItem('auth', "1");
                    console.log(data.data.token);
                    setToken(data.data.token)
                    navigate('/');
                    //window.location.reload();
                }
            })
        }
    }
  return (
        <form className='SignIn' >

            <div className="container">
                <div class="el el-1">
                    <span>Email:</span>
                </div>
                <div class="el el-2">
                    <input type="email" onChange={(e) => {SetUser({...user,email: e.target.value})}} placeholder='Введите свой Email'/>
                </div>
                <div class="el el-3">
                    <span>Пароль:</span>
                </div>
                <div class="el el-4">
                    <input type="password" onChange={(e) => {SetUser({...user,password: e.target.value})}} placeholder='Введите свой пароль'/>
                </div>
            </div>
            <input  type='button' value='Войти' className='SignInBut' onClick={handleLogin}/>
            <Link to='/signup'>Зарегистрироваться</Link>
        </form>



  )
}

export default SignIn