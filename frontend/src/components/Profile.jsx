import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelfBooking from './ProfileComponents/SelfBooking';
import AllUsers from './ProfileComponents/AllUsers';
import AllBooking from './ProfileComponents/AllBooking';


const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    }
    const [info, setInfo] = useState(0);
    // const profiles = [<SelfBooking/>, <AllBooking/>, <AllUsers/>]
    const getProfile = (x) => {
        switch (x){
            case 1:
                return <AllBooking/>
            case 2:
                return <AllUsers/>
            default:
                return <SelfBooking/> 
        }
    }
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

                        <div class="el el-4">
                            <span>Статус: {sessionStorage.getItem('root')==="1"?"Пользователь": (sessionStorage.getItem('root')==="2"?"Менеджер" : "Админ")}</span>
                            
                        </div>
                    </div>
                    <input type="button" value="Выйти из аккаунта" onClick={handleLogout} />
                </div>

            </div>
            {sessionStorage.getItem("root") > 1 && (
                <div className="profileAdmin" >
                    <input type="button" onClick={() => {setInfo(0)}} value="Свои брони" />
                    <input type="button" onClick={() => {setInfo(1)}} value="Все брони пользователей"/>
                    <input type="button" onClick={() => {setInfo(2)}} value="Все пользователи"/>
                </div>
            )}
            
            <div className='profileBookingInfo'>
                {getProfile(info)}
            </div>

        </div>
    )
}

export default Profile