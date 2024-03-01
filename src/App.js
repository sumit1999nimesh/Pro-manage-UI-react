import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Dashboard from './Dashboard_Components/DashBoard';
import Sidebar from './Dashboard_Components/SideBar';
import Login from './Login_Signup_Components/Login';
import Signup from './Login_Signup_Components/Signup';
import Parent_container from './Login_Signup_Components/Parent_Container';
import Analytics from './AnalyticsAndSettings_Components/Analytics';
import Settings from './AnalyticsAndSettings_Components/Settings';
import TaskPublicPage from './Public_Components/TaskPublicPage';

function App() {


  return (
    <div className="App">
    <BrowserRouter>
   <Routes>  
   <Route path="/" element={<Signup/>}/> 
   <Route path="/login" element={<Login/>}/> 
  <Route path="/home" element={<Dashboard/>}/> 
  <Route path="/settings" element={<Settings/>}/> 
  <Route path="/analytics" element={<Analytics/>}/> 

  <Route path="/public/:id" element={<TaskPublicPage/>} />
       


    </Routes>
  </BrowserRouter>
  </div>
  );
}


export default App;
