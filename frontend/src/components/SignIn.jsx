import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
        <form className='SignIn'>

            <div class="container">
                <div class="el el-1">
                    <span>Email:</span>
                </div>
                <div class="el el-2">
                    <input type="email" placeholder='Введите свой Email'/>
                </div>
                <div class="el el-3">
                    <span>Пароль:</span>
                </div>
                <div class="el el-4">
                    <input type="password" placeholder='Введите свой пароль'/>
                </div>
            </div>
            <button className='SignInBut'> 
                Войти
            </button>
            <Link to='/signup'>Зарегестрироваться</Link>
        </form>



  )
}

export default SignIn