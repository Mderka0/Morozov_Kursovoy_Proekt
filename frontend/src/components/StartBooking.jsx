import React, { useState, useEffect, useContext} from 'react'
import axios from 'axios';
import Booking from './Booking';
import UserToken from '../Context';

const StartBooking = () => {
    const [cards, setCards] = useState([])
    const [classBook, setClassBook] = useState('')
    useEffect(() => {
        axios.get('/api/get_appartments').then((data) => {
            setCards(data.data);

        });

    }, [setCards ])
    
    const {Token, setToken} = useContext(UserToken);

    return (
        <>
        <div className='sBookingFul'>
            {cards?.map((elem, uniq_id) => {
                return (
                    <div className='bookingBox' key={uniq_id}>
                        <div className='bookigPhoto'>
                            <img src={"/img/" + elem.image} alt="" />
                             </div>
                        <div className='bookigInfo' >
                            <span>{elem.clas}</span>
                            <span>{elem.description}</span>
                            {
                                Token != '' && <input type="button" value="Забронировать" className='StartBookingBut' 
                                onClick={() => {setClassBook(elem.clas)} }/>
                            }
                            
                        </div>

                    </div>
                )
            })}

        </div>
        {classBook !== '' && <Booking classBooking={setClassBook} classBook={classBook}/>}
        </>
    )
}

export default StartBooking