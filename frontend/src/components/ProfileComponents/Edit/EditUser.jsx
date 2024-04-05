import axios from 'axios'
import React, { useState } from 'react'

const EditUser = ({close, info}) => {
    const[User, setUser] = useState({
        name: info.name,
        phone: info.phone,
        email: info.email,
        root: info.root
    })

    const handleEdit = () => {
        axios.post('/api/update_user', {id: info.id, ...User})
        close({...info, isEdit: false})
    }

  return (
    <div className='EditUserWindow'>
        <div className='EditUserComponent'>
          <p>
            ФИО
          </p>
          <input type="text" placeholder={info.name} onChange={(e) => { setUser({...User, name: (e.target.value == '' ? info.name : e.target.value) }) }} />
          <p>
            Телефон
          </p>
          <input type="number" placeholder={info.phone} onChange={(e) => { setUser({...User, phone: (e.target.value == '' ? info.phone : e.target.value) }) }}/>
          <p>
            Email
          </p>
          <input type="text"  placeholder={info.email} onChange={(e) => { setUser({...User, email: (e.target.value == '' ? info.email : e.target.value) }) }}/>
          <p>
            Права
          </p>
          <input type="number" placeholder={info.root} onChange={(e) => { setUser({...User, root: (e.target.value == '' ? info.root : e.target.value) }) }}/>

          <input type="button" value="Изменить" onClick={handleEdit} />
        </div>
    </div>
  )
}

export default EditUser