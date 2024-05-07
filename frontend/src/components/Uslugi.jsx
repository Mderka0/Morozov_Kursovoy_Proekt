import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Uslugi = () => {
  const[input, setInput] = useState('')
  const[usl, setUsl] = useState([
    {
      day: 0,
      uslugs: []
    }
  ])
  const[allData, setAllData] = useState({
    clas: '',
    email: '',
    days: 0,
    UslId: 0,
    BokId: 0,
    UslClass: ''   
  })
  const changeSpisok = (profile) => {
    let spisok, uslugs_;
    switch (profile) {
      case 'Профилактика':
        spisok = [];
        uslugs_ = ["Массаж"];
        if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Физкультура')
        if (allData.clas== 'C') uslugs_.push('Соляная комната')
          for (let i = 1; i <= allData.days; i++) {
            spisok.push({
              day: i, 
              uslugs: uslugs_
            })
            
          }
          setUsl(spisok)
        break;
        case 'Опорно-двигательный аппарат':
          spisok = [];
          uslugs_ = ["Массаж"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Физиотерапия')
          if (allData.clas== 'C') uslugs_.push('Мануальная терапия')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
          case 'Сердечно-сосудистая система':
          spisok = [];
          uslugs_ = ["Массаж"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Плавание')
          if (allData.clas== 'C') uslugs_.push('Физкультура')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
          case 'Бронхо-лёгочная система':
          spisok = [];
          uslugs_ = ["Массаж"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Лечебные ванны')
          if (allData.clas== 'C') uslugs_.push('Физкультура')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
          case 'Нервная система':
          spisok = [];
          uslugs_ = ["Подводный душ-массаж"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Грязевые аппликации')
          if (allData.clas== 'C') uslugs_.push('Физкультура')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
          case 'Органы пищеварения':
          spisok = [];
          uslugs_ = ["Лечебные ванны"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Грязевые аппликации')
          if (allData.clas== 'C') uslugs_.push('Кишечные промывания')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
          case 'Эндокринная система':
          spisok = [];
          uslugs_ = ["Лечебные ванны"];
          if (allData.clas== 'B'|| allData.clas== 'C') uslugs_.push('Грязевые аппликации')
          if (allData.clas== 'C') uslugs_.push('Физкультурой')
            for (let i = 1; i <= allData.days; i++) {
              spisok.push({
                day: i, 
                uslugs: uslugs_
              })
              
            }
            setUsl(spisok)
          break;
      default:
        break;
    }
  }
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
      setInput(data.data.UslClass)
      changeSpisok(data.data.UslClass)
    })
  },[setAllData])
  const handleUsl = (e) => {
    const profile = e.target.value;
    setInput(profile)
    changeSpisok(profile)

  }
  const setUslugi = () => {
    console.log(usl);
    axios.post('/api/set_uslugi', {UslId: allData.UslId, 
      UslClass: input, Proc: usl[0].uslugs.join(', ')})
    .then(() => {
      alert('Изменения внесены')
    })

  }
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
          <input type="text" placeholder='Профиль лечения' value={input}
           list='UslClass' onChange={handleUsl}  />
            <datalist id='UslClass'>
              <option value="Профилактика"/>
              <option value="Опорно-двигательный аппарат"/>
              <option value="Сердечно-сосудистая система"/>
              <option value="Бронхо-лёгочная система"/>
              <option value="Нервная система"/>
              <option value="Органы пищеварения"/>
              <option value="Эндокринная система"/>
              {/* <option value="Пользовательские настройки"/> */}
            </datalist>
          </div>
        </div>
        <input type="button" value="Подтвердить" onClick={setUslugi} />
      </div>


      <div className='procedureInfo'>
        {usl?.map((el,i) => {
          return <div className="day" key={i}>
            <span>{el.day} День </span>
            <div>
            {el.uslugs.map((elem, j) => {
              return <span key={j}>{elem}</span>
            })}
            </div>
          </div>
        })}
      </div>

    </div>
  )
}

export default Uslugi