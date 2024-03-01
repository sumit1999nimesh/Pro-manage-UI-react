
import React from "react";
import { useState } from "react";
import {jwtDecode} from 'jwt-decode';
import logo from '../icons/Profile.png';
import Parent_container from "./Parent_Container";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate  = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      };
      const handleLogin = async (e) => {
        e.preventDefault();
    
        // Validate email and password
        if (!formData.email || !formData.password) {
          return console.warn('Email and password are required');
        }
    
        try {
          // Send login request to your API
          const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            const { token } = await response.json();
            console.log(token)
            localStorage.setItem('token', token); // Store token in localStorage
    
            // Decode JWT token to get user information
            const user = jwtDecode(token);
            console.log('User:', user);
            setTimeout(() => {
          }, 3000);
            toast.success('Logging in');
            navigate('/home');
          } else {
          toast.error('Invalid email or password');
          }
        } catch (error) {
          console.error('Error:', error);
            toast.error('An error occurred while logging in');
        }
      };
    return (
    <div className="signup_container">
        <Parent_container></Parent_container>
        <div className="Sign_login_component_MNUN1">
        <ToastContainer />
        <form className="form" onSubmit={handleLogin}>
     <h1 className="register_heading_singup">Login</h1>

          <div className="form-body">
              <div className="login_signup_input">
                  <input className="form_input_email_U4" placeholder='Email' type="text" id="Email" name="email" value={formData.email} onChange={handleChange} />
              </div>
           
              <div className="login_signup_input">
                  <input className="form_input_p1" type="password" placeholder='Password' id="password" name="password" value={formData.password} onChange={handleChange}/>
              </div>
              <div className="login_btn">
              <button  className="signup_btn_p1">Log in</button>
          </div>
            
          </div>

      </form>   
      <p className="have-an-acct-label">Have no account yet?</p>
          <div className="login_btn">
              <button  className="login_btn_p1">Register</button>
         
          </div>
      </div>   
      </div>
    );
  }

  export default Login;