import React from 'react'
import {Route, Routes} from "react-router-dom"
import SignIn from './SignIn'
import SignUp from './SignUp'
import Contacts from './Contacts'
import StartBooking from './StartBooking'


const Main = () => {
  return (
    <main>
      <Routes>  
        <Route path="/contacts" element={<Contacts/>}/>
        <Route  path="/login" element={<SignIn/>}/>
        <Route  path="/signup" element={<SignUp/>}/>
        <Route  path="/startBooking" element={<StartBooking/>}/>
      </Routes>
      
    </main>
  )
}

export default Main