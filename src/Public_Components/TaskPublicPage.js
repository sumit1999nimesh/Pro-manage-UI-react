import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dashboard_logo from '../icons/codesandbox.png';
import '../Public_Components/TaskPublicPage.css';
import '../Dashboard_Components/Task.css';  
function TaskPublicPage(props) {
   const [formData, setFormData] = useState({
      title:'',
      priority: '',
      checklist: [],
      state: '',
      dueDate: ""
    });
    const [checkedCount, setcheckedCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [formattedDate, setformattedDate] = useState('');
    const { id } = useParams();
     console.log('id '+id);
     console.warn('wdawd1');
     useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/task/getTaskPublic/'+id, {
          method: 'GET'
          });
          console.warn('wdawd2');
          if (!response.ok) {
            throw new Error('Failed to fetch user objects');
          }
         
          const data = await response.json();
          setFormData(data);
          console.warn('wdawd3');
          console.warn('wdawd3 a '+JSON.stringify(data));
          const date = new Date(data.dueDate);
          const isoDateString = date.toISOString();
          formData.dueDate=isoDateString
    
      let monthName='',day='',daySuffix='';
      console.warn("dateff "+formData.dueDate)
      if(formData.dueDate!=='0001-01-01T00:00:00.000Z'){
      const originalDate =new Date(formData.dueDate);
      const months = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ];
        console.warn('wdawd4');
         const monthIndex = originalDate.getMonth();
         day = originalDate.getDate();
  
         monthName = months[monthIndex].substring(0,3);
  
        const daySuffix = (() => {
          if (day >= 11 && day <= 13) {
            return "th";
          }
          switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
          }
        })();
        console.warn('wdawd5');
        setformattedDate(monthName +" "+day +""+daySuffix);
       console.warn(data)
     
       console.warn('wdawd3=6');
      }
      for(let i=0;i<data.checklist.length;i++){
         if(data.checklist[i].checked===true){
            setcheckedCount(checkedCount => checkedCount + 1)
      
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
     /////
    return (
        <div  className="Ptaskcard_top_container">
                <div className="logo_name_sidebar">
    <img src={dashboard_logo} className="logo_sidebar_icons" alt="logo" />
    <div className="dashboard_heading" >Pro Manage</div>
    </div>
            <div className="Ptaskcard_sub_container_jjj2">
            <div className="Ptaskcard_container_jjj2_P_M_1">
        <div className="priority_TXT_uYN1">
       {formData.priority==='HIGH PRIORITY' ? <span className="dot" style={{backgroundColor:'red'}}></span> :
        formData.priority==='MODERATE PRIORITY' ? <span className="dot" style={{backgroundColor:'#18B0FF'}}></span> :
        <span className="dot" style={{backgroundColor:'#63C05B'}}></span>}
         {formData.priority}</div>
        <h2 className="title_task_nhb3">{formData.title}</h2>
        <h3 className="cl_title_task_nhb3_NSBH">Checklist {checkedCount}/{formData.checklist.length}</h3>
        <div className='checklist_conatiner_scroll_imp_13'>
        {formData.checklist.map((item, index) => (
        <div className='checklist_field_container_public'>
         <input type="checkbox" checked={item.checked}/>
            <label  className='checklist_field_name_txt_HYGG2'>{item.checklist_title}</label>
      </div>
        ))}
     

    
        </div>
      {formData.dueDate==='0001-01-01T00:00:00.000Z'? '':<div ><label className='duedatelabel_KNB8'>Due Date</label> 
      <label className='duedate_KNB8' style={{marginLeft:'20px'}}>{formattedDate}</label> </div>}
        </div>
       
        </div>
        </div>
    );
}

export default TaskPublicPage;
