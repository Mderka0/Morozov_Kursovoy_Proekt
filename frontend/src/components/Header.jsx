import { useState, useEffect, useContext} from "react";
import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import UserToken from '../Context';

const Header = () => {
  const {Token, setToken} = useContext(UserToken);
  const [isAuth, SetIsAuth] = useState(Token != '' ? '/profile' : '/login');
  const[user, setUser] = useState({
    name:'', phone:'', email:'', root:''
  })
  //console.log(Token)
  useEffect(() => {
    //console.log('test');
    axios.post('/api/get_user', {token: Token})
    .then((data) => {
        setUser({
            name:data.data.name,
            phone:data.data.phone,
            email:data.data.email,
            root:data.data.root
        })
        SetIsAuth(Token != '' ? '/profile' : '/login')
      })
  }, [setUser, Token])

  console.log(isAuth);
  console.log(Token)
  return (
    <header>
        <ul>
            <li> <Link to='/'>Главная</Link> </li>
            <li> <Link to='/contacts'>Контакты</Link> </li>
            <li> <Link to={isAuth}>Личный кабинет</Link> </li>
            <li> <Link to='/startBooking'>Бронирование</Link> </li>
        </ul>
        
    </header>
  )
}

export default Header