import React from 'react'
import { Link } from 'react-router-dom'
import { SlSocialVkontakte } from "react-icons/sl";
import { MdOutlineLocalPostOffice } from "react-icons/md";

const Contacts = () => {
  return (
    <div className='contactFul'>
        <div className='contacts'>
          <div>
            Телефон: +73333333333
            <br/>
            Email: qwerty@mail.ru
            <br/>
            <br/>
            Режим работы: 9:00 - 21:00
            <br/>
            <br/>
            Адрес: Улица Пушкина, Дом Колотушкина
            <br/>
            <br/>
            Как добраться? 
            <br/>
            Остановка 1 - Автобусы 1 2 3 4 
            <br/>
            Остановка 2 - Автобусы 5 6 7
            <br/>
            <br/>
            
            <Link to="https://vk.com/mderka0">
              <SlSocialVkontakte className='icon'/>
              Группа вконтакте</Link>
            <br/>
            
            
            <a href="mailto:mderka@yandex.ru">
              <MdOutlineLocalPostOffice className='icon'/>
              Почта
            </a>
          </div>
          
        </div>
        
        <div className='map'>
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae77915c90032705e69aef72123cfc77ee755f8b9a7a57b6854d5ef3fee296055&amp;source=constructor" className='mapSize' frameborder="0"></iframe>
        </div>
        
    </div>


  )
}

export default Contacts