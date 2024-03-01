import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Parent_container from './Login_Signup_Components/Parent_Container';
import Signup from './Login_Signup_Components/Signup';
import Login from './Login_Signup_Components/Login';
import Dashboard from './Dashboard_Components/DashBoard';
import Sidebar from './Dashboard_Components/SideBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <App/>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
