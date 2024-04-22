import React, { useEffect, useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelfBooking from './ProfileComponents/SelfBooking';
import AllUsers from './ProfileComponents/AllUsers';
import AllBooking from './ProfileComponents/AllBooking';
import UserToken from '../Context';

const Profile = () => {
    const navigate = useNavigate();
    const {Token, setToken} = useContext(UserToken);
    // console.log(Token);
    const handleLogout = () => {
        // sessionStorage.clear();
        setToken('');
        navigate('/login');
    }
    
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
    }, [Token])
    
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
    console.log(user?.root);
    return (
        <div className='Full'>
            <div className='profileInfoSpace'>
                <div className='profilePhoto'></div>
                <div className='profileInfo'>

                    <div class="profileContainer">
                        <div class="el el-1">
                            <span>Email: {user?.email}</span>
                        </div>
                        <div class="el el-2">
                            <span>ФИО: {user?.name}</span>
                        </div>
                        <div class="el el-3">
                            <span>Телефон: {user?.phone}</span>
                        </div>

                        <div class="el el-4">
                            <span>Статус: {user?.root==1?"Пользователь": (user?.root==2?"Менеджер" : "Админ")}</span>
                            
                        </div>
                    </div>
                    <input type="button" value="Выйти из аккаунта" onClick={handleLogout} />
                </div>

            </div>
            {user?.root > 1 && (
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