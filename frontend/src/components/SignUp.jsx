import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <form className='SignIn'>

            <div class="containerReg">
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
                <div class="el el-5">
                    <span>Повторите:</span>
                </div>
                <div class="el el-6">
                    <input type="password" placeholder='Повторите пароль'/>
                </div>
            </div>
            <button className='SignInBut'> 
                Зарегестрироваться
            </button>
            <Link to='/login'>Войти</Link>
        </form>
  )
}

export default SignUp