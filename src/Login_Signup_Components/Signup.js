
import React from "react";
import { useState } from "react";

import logo from '../icons/Profile.png';
import email_icon from '../icons/email.png';
import password_icon from '../icons/password.png';
import Parent_container from "./Parent_Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
    const [conpasswordTXT,setconpasswordTXT]  = useState('')
  const [errorPassword,seterrorPassword]  = useState(false)
  const [errorConPassword,seterrorConPassword]  = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });


   const handleConfirmPasswordError=(event)=>{
 setconpasswordTXT(event.target.value)
      if(event.target.value!==formData.password){
        seterrorConPassword(true);
      }
      else {
        seterrorConPassword(false)
      }
  
    }
      const redirectToLogin=()=>{
        navigate('/login');
      }
      const handleChange = (e) => {
        
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
        console.log('name '+formData.name);
        if(e.target.id==='password' && e.target.value.length<=4){
          seterrorPassword(true) 
        }
        else seterrorPassword(false)
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
       let str= formData.email;
       str=str.toLowerCase();
       console.warn("email "+ str)
       formData.email=str
        setFormData(
          {
            name: formData.name,
            email:formData.email,
            password: formData.password
          }
        )
    
        try {
          const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/user/signup', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          if (response.ok) {
            toast.success("Registered sucessfully. Please Login!");
            console.log('Signup successful!');
          } else {
            toast.error("Something went wrong. Please try again later");
            console.error('Signup failed:', response);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
        finally{
          setFormData(
            {
              name: '',
              email:'',
              password: ''
            })
            setconpasswordTXT('')
        }
      };
    return (
    <div className="signup_container">
        <Parent_container></Parent_container>
        <div className="Sign_login_component_MNUN1">
        <form className="form" onSubmit={handleSubmit}>
     <h1 className="register_heading_singup">Register</h1>
   
     <ToastContainer />
     
          <div className="form-body">
            <div>
          <div className="login_signup_input">
        <input className="form_input_name_U4" type="text" placeholder='Name' value={formData.name}  id="name" name="name" onChange={handleChange}/>
              </div>
              <div className="login_signup_input">
                  <input className="form_input_email_U4" placeholder='Email' value={formData.email}  type="text" id="Email" name="email" onChange={handleChange} />
              </div>
           
              <div className="login_signup_input">
                  <input className="form_input_p1" placeholder='Password' value={formData.password}  type="password" id="password" name="password" onChange={handleChange}/>
               {errorPassword?<div className="global_error">Passwords length should be greater than 4 </div>:""}
              </div>
              <div className="login_signup_input">
                  <input className="form_input_p1"  placeholder='Confirm Password' value={conpasswordTXT}  type="password" id="confirm_password" onChange={handleConfirmPasswordError} />
                  {errorConPassword?<div className="global_error">Passwords do not match</div>:""}
              </div>
             
              <div className="login_btn">
              <button  className="signup_btn_p1">Register</button>
          </div>
          </div>
          </div>
      </form>   
             
      <p className="have-an-acct-label">Have an account ?</p>
          <div className="login_btn">
              <button  className="login_btn_p1" onClick={redirectToLogin}>Log in</button>
          </div>
      </div>   
      </div>
    );
  }

  export default Signup;
