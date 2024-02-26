
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/users').then((data) => {
        setUsers(data.data.reverse());
        })
    }, [setUsers])
    
    return (
        <>
            <table>
                <tr>
                    <td>
                        ФИО
                    </td>
                    <td>
                        Телефон
                    </td>
                    <td>
                        Email
                    </td>
                    <td>
                        Статус
                    </td>
                </tr>
                {users.map((user, id) => {
                    return (
                        <tr key={id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.phone}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                        
                                {user.root=="1"?"Пользователь": (user.root=="2"?"Менеджер" : "Админ")}
                            </td>
                        </tr>
                    )
                })}


            </table>
        </>
    )
}


export default AllUsers