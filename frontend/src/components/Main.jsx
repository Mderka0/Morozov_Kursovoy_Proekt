import React from 'react'
import {Route, Routes} from "react-router-dom"
import SignIn from './SignIn'
import SignUp from './SignUp'
import Contacts from './Contacts'

const Main = () => {
  return (
    <main>
      <Routes>  
        <Route path="/contacts" element={<Contacts/>}/>
        <Route  path="/login" element={<SignIn/>}/>
        <Route  path="/signup" element={<SignUp/>}/>
      </Routes>
    </main>
  )
}

export default Main