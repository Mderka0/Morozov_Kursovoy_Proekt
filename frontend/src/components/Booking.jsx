import { useState } from "react";
import React from 'react'
import axios from 'axios';
import { IoMdClose } from "react-icons/io";

const Booking = ({ classBooking, classBook }) => {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [cost, setCost] = useState(0);
    // const [data, setData] = useState({
    //     GstEmail: '',
    //     ApsClass: '',
    //     BokCost: 0,
    //     BokDateSt: '',
    //     BokDateFn: ''

    // });
    const changeDate = (e) => {
        setStart(e.target);
        if (end != undefined) {
            end.value = ''
        }

    };

    const handleBooking = () => {
        if (start == undefined || end == undefined) {
            alert('Введите даты');
            return
        }
        
        if (cost <= 0)
        {
            alert('Введите разные даты');
            return
        }

        axios.post('/api/add_book', {
            GstEmail: sessionStorage.getItem('email'),
            ApsClass: classBook,
            BokCost: cost,
            BokDateSt: start.value,
            BokDateFn: end.value,

        } ).then((data) => {
            classBooking('') 
            alert(data.data.Message)
        })

    }

    const mathCost = (end1) => {
        if (end1 == start) { return }

        let k = 1;
        if (classBook == 'A') {
            k = 1000
        }
        else if (classBook == 'B') {
            k = 3000
        }
        else if (classBook == 'С') {
            k = 5000
        }

        const delta = (end1.valueAsNumber - start.valueAsNumber) / 86400000;
        setCost(delta * k);
        setEnd(end1);
    }

    return (
        <div className='BookingWindow'>
            <div className='BookingComponent'>
                <IoMdClose className='closeBooking' onClick={() => { classBooking('') }} />

                <div className='bookingContainer'>
                    <div className='el el-1'>
                        <span>ФИО: </span>
                    </div>
                    <div className='el el-2'>
                        <span>{sessionStorage.getItem('name')} </span>
                    </div>
                    <div className='el el-3'>
                        <span>Телефон: </span>
                    </div>
                    <div className='el el-4'>
                        <span>{sessionStorage.getItem('phone')} </span>
                    </div>
                    <div className='el el-5'>
                        <span>Email: </span>
                    </div>
                    <div className='el el-6'>
                        <span>{sessionStorage.getItem('email')} </span>
                    </div>
                    <div className='el el-7'>
                        <span>Класс аппартаментом: </span>
                    </div>
                    <div className='el el-8'>
                        <span> {classBook} </span>
                    </div>
                    <div className='el el-9'>
                        <span>Дата заезда: </span>
                    </div>
                    <div className='el el-10'>
                        <input type="date" onChange={changeDate} />
                    </div>
                    <div className='el el-11'>
                        <span>Дата выезда: </span>
                    </div>
                    <div className='el el-12'>
                        <input type="date" min={start?.value} onChange={(e) => mathCost(e.target)} />
                    </div>
                    <div className='el el-13'>
                        <span>Стоимость: </span>
                    </div>
                    <div className='el el-14'>
                        <span> {cost} </span>
                    </div>

                    <input type="button" value="Подтвердить и забронировать" onClick={handleBooking} />
                </div>
            </div>

        </div>
    )
}

export default Booking