
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import EditBook from './Edit/EditBook';

const AllBooking = () => {
    const [filtres, setFiltres] = useState({
        Email: '',
        ApsClass: '',
        Status: ''

    });
    
    const [allBooks, setAllBooks] = useState([]);
    const [allBooks2, setAllBooks2] = useState([]);
    const [Emails, setEmails] = useState([]);
    const [Edit, setEdit] = useState({isEdit: false});
    useEffect(() => {
        axios.get('/api/get_all_books').then((data) => {
            setAllBooks(data.data.Books.reverse());
            setAllBooks2(data.data.Books.reverse());
            let temp = []
            data.data.Books.map((elem) => {
                temp.push(elem.GstEmail)
            })
            setEmails([...new Set(temp)])
         
        })
    }, [setAllBooks])

    
    
    
    const changeData = () => { 
        console.log(filtres);
        let temp = allBooks2
        if (filtres.Email !='')
        {
            temp = temp.filter((elem) => elem.GstEmail == filtres.Email)
        }
        if (filtres.ApsClass !='')
        {
            temp = temp.filter((elem) => elem.ApsClass == filtres.ApsClass)
        }
        if (filtres.Status !='')
        {
            temp = temp.filter((elem) => elem.BokStatus == filtres.Status)
        }
        setAllBooks(temp)
        
    }

    const handleEdit = (book) => {
        setEdit({...book, isEdit: true})
    }

    return (
        <>
            <div className='filtres'>
                <div className='allBookContainer'>
                    <div className='el el-1'>
                        <span>Email: </span>
                    </div>
                    <div className='el el-2'>
                        <input type="text" placeholder='Email' list='Emails' onChange={(e) => {setFiltres ((prev) => {return {...prev, Email: e.target.value }})}}/>
                        <datalist id='Emails'>
                            {
                                Emails.map((elem, id) => (<option value={elem} key={id}/>))
                            }
                        </datalist>
                    </div>
                    <div className='el el-3'>
                        <span>Класс номера: </span>
                    </div>
                    <div className='el el-4'>
                        <input type="text" placeholder='Класс номера' list='ApsClasses' onChange={(e) => {setFiltres ({...filtres, ApsClass: e.target.value })}}/>
                        <datalist id='ApsClasses'>
                            <option value="A"/>
                            <option value="B"/>
                            <option value="C"/>
                        </datalist>
                    </div>
                    {/* <div className='el el-1'>
                        <span>Дата заезда: </span>
                    </div>
                    <div className='el el-2'>
                        <input type="text" placeholder='Дата заезда' />
                    </div>
                    <div className='el el-1'>
                        <span>Дата выезда: </span>
                    </div>
                    <div className='el el-2'>
                    <input type="text" placeholder='Дата выезда' />
                    </div>
                    <div className='el el-1'>
                        <span>Цена: </span>
                    </div>
                    <div className='el el-2'>
                        <input type="text" placeholder='Цена' />
                    </div> */}
                    <div className='el el-1'>
                        <span>Статус: </span>
                    </div>
                    <div className='el el-2'>
                        <input type="text" placeholder='Статус' list='Statuses' onChange={(e) => {setFiltres ({...filtres, Status: e.target.value })}}/>
                        <datalist id='Statuses'>
                            <option value="Ожидает подтверждения"/>
                            <option value="Ожидает заселения"/>
                            <option value="Отменён"/>
                            <option value="Заселён"/>
                            <option value="Выселен"/>
                        </datalist>
                    </div>
                </div>
            </div>
                <input type="button" value='Отфильтровать' onClick={changeData}/>

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
                    {sessionStorage.getItem('root')>=1 && <td>Редактирование</td>}
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
                            {sessionStorage.getItem('root')>=1 && <td><MdEdit onClick={() => {handleEdit(Book)}}/></td> }

                        </tr>
                    )
                })}


            </table>
            {Edit.isEdit && <EditBook close = {setEdit} info = {Edit}/>}
        </>

    )
}

export default AllBooking