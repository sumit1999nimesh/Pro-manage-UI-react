import Sidebar from "../Dashboard_Components/SideBar";
import '../AnalyticsAndSettings_Components/Analytics_Settings.css'; 
import { useState,useEffect,useRef } from "react";
import { useNavigate } from 'react-router-dom';

function Analytics() {
  const navigate  = useNavigate();
    const [loading, setLoading] = useState(true);
    const [backlogCount, setCountbacklogCount] = useState(0);
    const [todoCount, setTodoCount] = useState(0);
    const [inprogressCount, setInprogressCount] = useState(0);
    const [CompletedCount, setCompletedCount] = useState(0);
    const [LowPCount, setLowPCount] = useState(0);
    const [ModeratePCount, setModeratePCount] = useState(0);
    const [HighPCount, setHighPCount] = useState(0);
    const [dueDateCount, setDueDateCount] = useState(0);

    if(localStorage.getItem('token')===null)
    navigate('/login');
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
                setTodoCount(todoCount=>todoCount+1);
              }
              else  if(data[i].state==='DONE'){
                setCompletedCount(CompletedCount=>CompletedCount+1);
              }
              else  if(data[i].state==='PROGRESS'){
                setInprogressCount(inprogressCount=>inprogressCount+1);
              }
              else  if(data[i].state==='BACKLOG'){
                setCountbacklogCount(backlogCount=>backlogCount+1);
              }

              if(data[i].priority==='LOW PRIORITY'){
                setLowPCount(LowPCount=>LowPCount+1);
              }
              else    if(data[i].priority==='HIGH PRIORITY'){
                setHighPCount(HighPCount=> HighPCount+1);
              }
             else if(data[i].priority==='MODERATE PRIORITY'){
                setModeratePCount(ModeratePCount=>ModeratePCount+1);
              }
             /// console.log("ajad"+data[i].dueDate);
              const dateFromString = new Date(data[i].dueDate);
              const currentDate = new Date();
              console.log("ajad "+currentDate+ ' '+ dateFromString);
               if(data[i].dueDate!='0001-01-01T00:00:00.000Z' && dateFromString<currentDate){
                setDueDateCount(dueDateCount=>dueDateCount+1);
               }
            }

          } catch (error) {
            //setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      if (loading) return <p>Loading...</p>;
  
      console.log("ajad"+backlogCount);
      console.log("ajad"+CompletedCount);
    return (
        <div>
    <div className="top_container_settings_T1">
    <Sidebar/>
    <div className="anaylytic_t_content_qwaq1">
    <h1 className="analytic_heading_HYh1">Analytics</h1>
    <div className="analytics_card_container_TY1">
        
    <div className="analytics_card">
    <ul>
        <li><span>Backlog Tasks</span><span className="analytics_count">{backlogCount}</span></li>
        <li><span>To-do Tasks</span><span className="analytics_count">{todoCount}</span></li>
        <li><span>In-Progress Tasks</span><span className="analytics_count">{inprogressCount}</span></li>
        <li><span>Completed Tasks</span><span className="analytics_count">{CompletedCount}</span></li>
    </ul>
     </div>

     <div className="analytics_card">
    <ul>
        <li><span>Low Priority</span><span className="analytics_count">{LowPCount}</span></li>
        <li><span>Moderate Priority</span><span className="analytics_count">{ModeratePCount}</span></li>
        <li><span>High Priority</span><span className="analytics_count">{HighPCount}</span></li>
        <li><span>Due Date Tasks</span><span className="analytics_count">{dueDateCount}</span></li>
    </ul>
     </div>
     
    </div>
    </div>
    </div>
    </div>
    );
    }
    export default Analytics;