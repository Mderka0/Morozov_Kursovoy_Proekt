
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllBooking = () => {
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        axios.get('/api/get_all_books').then((data) => {
            setAllBooks(data.data.Books.reverse());
        })
    }, [setAllBooks])
    
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
                {allBooks.map((Book) => {
                    return (
                        <tr key={Book.id}>
                            <td>
                                {Book.id}
                            </td>
                            <td>
                                {Book.GstEmail}
                            </td>
                            <td>
                                {Book.ApsClass}
                            </td>
                            <td>
                                {Book.BokDateSt}
                            </td>
                            <td>
                                {Book.BokDateFn}
                            </td>
                            <td>
                                {Book.BokCost}
                            </td>
                            <td>
                                {Book.BokStatus}
                            </td>
                        </tr>
                    )
                })}


            </table>
        </>

    )
}

export default AllBooking