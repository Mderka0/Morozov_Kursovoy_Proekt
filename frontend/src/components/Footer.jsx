import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>

      <Link to="https://instagram/morozovph">
      
        <FaInstagram className='instIcon'/>
        <h1>morozovph</h1>
      
      </Link>

      
    </footer>
  )
}

export default Footer