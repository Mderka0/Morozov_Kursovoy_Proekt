import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Booking from './Booking';

const StartBooking = () => {
    const [cards, setCards] = useState([])
    useEffect(() => {
        axios.get('/api/get_appartments').then((data) => {
            setCards(data.data);

        });

    })
    const [classBook, setClassBook] = useState('')
    
    return (
        <>
        <div className='sBookingFul'>
            {cards?.map((elem) => {
                return (
                    <div className='bookingBox' key={elem.id}>
                        <div className='bookigPhoto'>
                            <img src={"/img/" + elem.image} alt="" />
                             </div>
                        <div className='bookigInfo' >
                            <span>{elem.clas}</span>
                            <span>{elem.description}</span>
                            {
                                sessionStorage.getItem('auth') == '1' && <input type="button" value="Забронировать" className='StartBookingBut' 
                                onClick={() => {setClassBook(elem.clas)} }/>
                            }
                            
                        </div>

                    </div>
                )
            })}

        </div>
        {classBook != '' && <Booking classBooking={setClassBook} classBook={classBook}/>}
        </>
    )
}

export default StartBooking