import axios from 'axios'
import React, { useState } from 'react'

const EditBook = ({close, info}) => {
  const[Book, setBook] = useState({
    ApsClass: info.ApsClass,
    BokCost: info.BokCost,
    BokStatus: info.BokStatus
  })
  
  const handleEdit = () => {
    axios.post('/api/update_book', {id: info.id, ...Book})
    close( {...info, isEdit: false})

  }

  return (
    <div className='EditBookWindow'>
        <div className='EditBookComponent'>
          <p>
            Класс номера
          </p>
          <input type="text" placeholder={info.ApsClass} onChange={(e) => { setBook({...Book, ApsClass: (e.target.value == '' ? info.ApsClass : e.target.value) }) }} />
          <p>
            Цена
          </p>
          <input type="number" placeholder={info.BokCost} onChange={(e) => { setBook({...Book, BokCost: (e.target.value == '' ? info.BokCost : e.target.value) }) }}/>
          <p>
            Статус
          </p>
          <input type="text" list='Statuses' placeholder={info.BokStatus} onChange={(e) => { setBook({...Book, BokStatus: (e.target.value == '' ? info.BokStatus : e.target.value) }) }}/>
          <input type="button" value="Изменить" onClick={handleEdit} />

          <datalist id='Statuses'>
            <option value="Ожидает подтверждения"/>
            <option value="Ожидает заселения"/>
            <option value="Отменён"/>
            <option value="Заселён"/>
            <option value="Выселен"/>
          </datalist>

        </div>
        </div>
  )
}

export default EditBook