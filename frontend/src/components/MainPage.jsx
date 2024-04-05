import React, { useState, useEffect } from 'react'
import axios from 'axios';

const MainPage = () => {
  return (
    <div className='Full'>
        <div className="mainBox">
            <div className="mainPhoto">
              <img src="/img/osnovnaya.png" />
            </div>
            <div className="mainInfo"> </div>

        </div>
      <div className='treatmentInfoText'>
        <h2>Профили отдыха</h2>
      </div>
      <div className="treatmentInfo">
            
      </div>

      <div className="mainBox">
        
        <div className="mainPhoto">
          <img src="/img/prozhivanie.png" />
        </div>
        <div className="mainInfo"> </div>

      </div>
      <div className="mainBox">
        <div className="mainPhoto"> 
          <img src="/img/dosug.png" />
        </div>
        <div className="mainInfo"> </div>

      </div>
      <div className="mainBox">
        <div className="mainPhoto">
          <img src="/img/lechenie.png" />
        </div>
        <div className="mainInfo"> </div>

      </div>
    </div>
  )
}

export default MainPage