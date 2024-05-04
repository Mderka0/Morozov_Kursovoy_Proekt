import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Uslugi = () => {
  const[allData, setAllData] = useState({
    clas: '',
    email: '',
    days: 0,
    UslId: 0,
    BokId: 0,
    UslClass: ''   
  })
  const{id} = useParams()
  useEffect(() => {
    axios.get('/api/uslugi/' + id).then((data) => {
      setAllData({
        clas: data.data.clas,
        email: data.data.email,
        days: data.data.days,
        UslId: data.data.UslId,
        BokId: data.data.BokId,
        UslClass: data.data.UslClass
      })
    })
  },[setAllData])
  return (
    <div className='Full'>
      <div className='uslugiInfo'>

        <div class="uslugiContainer">
          <div class="el el-1">
            <span>Класс аппартаментов: {allData?.clas}</span>
          </div>
          <div class="el el-2">
            <span>Email: {allData?.email}</span>
          </div>
          <div class="el el-3">
            <span>Количество дней: {allData?.days}</span>
          </div>
          <div class="el el-4">
          <input type="text" placeholder='Профиль лечения' list='UslClass' />
            <datalist id='UslClass'>
              <option value="Профилактика"/>
              <option value="Опорно-двигательный аппарат"/>
              <option value="Сердечно-сосудистая система"/>
              <option value="Бронхо-лёгочная система"/>
              <option value="Нервная система"/>
              <option value="Органы пищеварения"/>
              <option value="Эндокринная система"/>
              <option value="Пользовательские настройки"/>
            </datalist>
          </div>
        </div>
        <input type="button" value="Подтвердить"  />
      </div>


      <div className='procedureInfo'>
        <div className='day'>
          
        </div>
      </div>

    </div>
  )
}

export default Uslugi