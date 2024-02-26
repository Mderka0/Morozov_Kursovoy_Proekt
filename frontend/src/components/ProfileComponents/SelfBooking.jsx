
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const SelfBooking = () => {
    const [books, setBooks] = useState([]);
    const [mes, setMes] = useState('');
    useEffect(() => {
        axios.post('/api/get_books', { email: sessionStorage.getItem('email') }).then((data) => {
            setMes(data.data.Message);
            if (!data.data.Negative) {
                setBooks(data.data.Books.reverse());
            }
        })
    }, [setBooks])
    
    return (
        <>
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
                    <td>
                        Статус
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
                            <td>
                                {book.BokStatus}
                            </td>
                        </tr>
                    )
                })}


            </table>
            <span>
                {mes}

            </span>
        </>

    )
}

export default SelfBooking