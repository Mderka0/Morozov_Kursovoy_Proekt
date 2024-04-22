
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { MdDelete, MdInfo } from "react-icons/md";
import UserToken from '../../Context';

const SelfBooking = () => {

    const {Token, setToken} = useContext(UserToken);
    const[user, setUser] = useState({
        name:'', phone:'', email:'', root:''
    })

    useEffect(() => {
        axios.post('/api/get_user', {token:Token})
        .then((data) => {
            setUser({
                name:data.data.name,
                phone:data.data.phone,
                email:data.data.email,
                root:data.data.root
            })
        })
    }, [setUser])

    const [books, setBooks] = useState([]);
    const [mes, setMes] = useState('');
    useEffect(() => {
        axios.post('/api/get_books', { token: Token}).then((data) => {
            setMes(data.data.Message);
            if (!data.data.Negative) {
                setBooks(data.data.Books.reverse());
            }
        })
    }, [setBooks])

    const handleDelete = (id_) => {
        axios.post('/api/deleteBook', {id:id_,  token: Token}).then((data) => {
            setMes(data.data.Message);
            if (!data.data.Negative) {
                setBooks(data.data.Books.reverse());
            }
        })

    }
    
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
                    <td>Удалить</td>
                    <td>Процедуры</td>
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
                            <td>{book.BokStatus != 'Отменён' && <MdDelete onClick={() => {handleDelete(book.id)}}/>}</td>
                            <td><MdInfo /></td>
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