import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    const [books, setBooks] = useState([]);
    const [mes, setMes] = useState('');
    useEffect(() => {
        axios.post('/api/get_books', { email: sessionStorage.getItem('email') }).then((data) => {
            setMes(data.data.Message);
            if (!data.data.Negative) {
                setBooks(data.data.Books);
            }
        })
    }, [books])
    return (
        <div className='Full'>
            <div className='profileInfoSpace'>
                <div className='profilePhoto'></div>
                <div className='profileInfo'>

                    <div class="profileContainer">
                        <div class="el el-1">
                            <span>Email: {sessionStorage.getItem('email')}</span>
                        </div>
                        <div class="el el-2">
                            <span>ФИО: {sessionStorage.getItem('name')}</span>
                        </div>
                        <div class="el el-3">
                            <span>Телефон: {sessionStorage.getItem('phone')}</span>
                        </div>

                    </div>
                    <input type="button" value="Выйти из аккаунта" onClick={handleLogout} />
                </div>
1
            </div>
            <div className='profileBookingInfo'>
                <table>
                    <tr>
                        <td>
                            ID
                        </td>
                        <td>
                            Email
                        </td>
                        <td>
                            Класс номера
                        </td>
                        <td>
                            Дата заезда
                        </td>
                        <td>
                            Дата выезда
                        </td>
                        <td>
                            Цена
                        </td>
                    </tr>
                    {books.map((book) => {
                        return (
                            <tr key={book.id}>
                                <td>
                                    {book.id}
                                </td>
                                <td>
                                    {book.GstEmail}
                                </td>
                                <td>
                                    {book.ApsClass}
                                </td>
                                <td>
                                    {book.BokDateSt}
                                </td>
                                <td>
                                    {book.BokDateFn}
                                </td>
                                <td>
                                    {book.BokCost}
                                </td>
                            </tr>
                        )
                    })}


                </table>

                <span>
                    {mes}

                </span>
            </div>

        </div>
    )
}

export default Profile