import React, {useState, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserInfo from './Context';

const RootRender = () => {
  
  const [Token, setToken] = useState('')
  return(
    <UserInfo.Provider value={{Token, setToken}}>
      <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
      </React.StrictMode>
    </UserInfo.Provider>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RootRender/>
  );
