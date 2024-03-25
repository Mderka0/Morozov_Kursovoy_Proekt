import React from 'react'

const EditBook = ({close, info}) => {
  setInterval( () => {console.log(1);}, 100 )
  
  return (
    <div className='EditBookWindow'>
        test
        <input type="button" value="Изменить" onClick={close( {...info, isEdit: false})} />
    </div>
  )
}

export default EditBook