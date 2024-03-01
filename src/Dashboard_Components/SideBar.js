
import '../Dashboard_Components/Sidebar.css'; 
import { useState } from "react";

import dashboard_logo from '../icons/codesandbox.png';
import board_icon from '../icons/layout.png';
import analytics_icon from '../icons/database.png';
import Settings_icon from '../icons/settings.png';
import Logout_icon from '../icons/Logout.png';
import { Link, useNavigate } from 'react-router-dom';
import LogOutModel from '../Model_Components/LogOutModel';

function Sidebar(){
  const navigate  = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const [activeLink, setActiveLink] = useState('');
  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  const handleDeleteModel=()=>{
    console.warn('delete')
    setIsOpen(true);
}

const closeModal = () => {
    setIsOpen(false);
  };
  const linkStyle = {
    color: 'black', // Default color for the links
    textDecoration: 'none', // Remove underline from the links
  };

  // Style for the active link
  const activeLinkStyle = {
    color: 'red', // Color for the active link
    fontWeight: 'bold', // Make the active link bold
    
  };
  const handleLogout=()=>{
    setIsOpen(true);
   
  }

return (
  <div className="sidebar_container">
    <div className="logo_name_sidebar">
    <img src={dashboard_logo} className="logo_sidebar_icons" alt="logo" />
    <div className="dashboard_heading" >Pro Manage</div>
    </div>

    <Link className="sidebarlink" to='/home'>
    <img src={board_icon} className="logo_sidebar_icons" alt="logo" />
    <div className="dashboard_sidebar_link_text" >Board</div>
    </Link>

    <Link className="sidebarlink" to='/analytics' >
    <img src={analytics_icon} className="logo_sidebar_icons" alt="logo" />
    <div className="dashboard_sidebar_link_text" >Analytics</div>
    </Link>
    
    <Link className="sidebarlink" to='/settings'>
    <img src={Settings_icon} className="logo_sidebar_icons" alt="logo" />
    <div className="dashboard_sidebar_link_text" >Settings</div>
    </Link>

    <button className="logout_icon_text_oi81"  onClick={handleLogout}>
      <img src={Logout_icon} className="logo_sidebar_icons" alt="logo" />
      <div className='logout_btn_txt_Yth1'>Log out</div></button>
      <LogOutModel isOpen={isOpen} onClose={closeModal} >
      </LogOutModel>
  </div>

);
}

export default Sidebar;
