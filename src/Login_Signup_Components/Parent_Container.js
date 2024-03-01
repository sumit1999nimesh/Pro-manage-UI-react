import React from 'react';
import '../Login_Signup_Components/Login_Signup.css'; 
import logo from '../Art.png';

function Parent_container() {
  
    return ( 
    <div className='login_signup_container'>
    <img src={logo} className="logo_signup_login" alt="logo" />
    <h1 className='login_signup_container_h1'>Welcome aboard my friend</h1><h2 className='login_signup_container_h2'>just a couple of clicks and we start</h2>
    </div>
    );
  }

  export default Parent_container;