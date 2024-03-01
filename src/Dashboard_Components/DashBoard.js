import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import TaskContainer from "./TaskContainer";
import '../Dashboard_Components/TaskContainer'; 
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate  = useNavigate();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const [backlogData, setbacklogData] = useState([]);
    const [todoData, settodoData] = useState([]);
    const [progessData, setprogessData] = useState([]);
    const [doneData, setdoneData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usname, setusname] = useState('');
    
    useEffect(() => {
     
    

      const fetchData = async () => {
        try {
          const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/task/gettask', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch user objects');
          }
         
          const data = await response.json();
          for( let  i=0;i<data.length;i++){
            if(data[i].state==='TO-DO'){
              todoData.push(data[i]);
            }
            else  if(data[i].state==='DONE'){
              doneData.push(data[i]);
            }
            else  if(data[i].state==='PROGRESS'){
              progessData.push(data[i]);
            }
            else  if(data[i].state==='BACKLOG'){
              backlogData.push(data[i]);
            }
          }
          console.warn("props ren "+JSON.stringify(data));
          const res1 = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/user/getUserName', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            });
            const uname = await res1.json();
           if(res1.ok){
            console.warn("sas "+(uname.username));
            setusname(uname.username)
           }
          
            else
            console.warn('error in fetching usernname')
          

        } catch (error) {
          if(localStorage.getItem('token')===null)
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
  
 
    

      fetchData();
    }, []);
    if (loading) return <p>Loading...</p>;
return (
<div className="top_container_dashboard_sec">
<Sidebar/>
<div className="t2_dashboard_container_Kw2">
<div className="welcome_heading_hYHS2" >Welcome! {usname}<span>{}</span></div>
<div className="todays_date_text">{formattedDate}</div>
<div className="board_heading_jJG1" >Board</div>

  <select id="dropdown">
    <option value="option1">Today</option>
    <option value="option2">This Week</option>
    <option value="option3">This Month</option>
  </select>
<div className="Task_container_Kwee2">
<TaskContainer tasks={backlogData} heading={'Backlog'}></TaskContainer>  
<TaskContainer tasks={todoData} heading={'To do'}></TaskContainer>
<TaskContainer tasks={progessData} heading={'In progress'}></TaskContainer>
<TaskContainer tasks={doneData} heading={'Done'}></TaskContainer>
</div>
</div>
</div>
);
}
export default Dashboard;