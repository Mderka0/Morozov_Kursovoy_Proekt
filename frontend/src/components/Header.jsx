import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <ul>
            <li> Главная </li>
            <li> <Link to='/contacts'>Контакты</Link> </li>
            <li> <Link to='/login'>Личный кабинет</Link> </li>
            <li> <Link to='/startBooking'>Бронирование</Link> </li>
        </ul>
        
    </header>
  )
}

export default Header