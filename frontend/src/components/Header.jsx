import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  const [isAuth, SetIsAuth] = useState(sessionStorage.getItem('auth') == '1' ? '/profile' : '/login');
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