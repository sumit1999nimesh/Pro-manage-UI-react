import React, { useState } from 'react';
import '../Model_Components/TaskModel.css'; 
import delete_btn_logo from '../icons/Delete.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskModal({ isOpen, onClose }) {
  const [components, setComponents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
 
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    checklist: [],
    state:'TO-DO',
    dueDate: '0001-01-01T00:00:00.000Z'
  });

  //console.log('date '+JSON.stringify(components));

  const handleButtonClick = () => {
      setShowCalendar(!showCalendar);
  };

  const handleCalendarChange = (date) => {
      setSelectedDate(date);
      setShowCalendar(false); 

      formData.dueDate=date;
  
  };
  if (!isOpen) return null;

  const handlePriorityChange = (event) => {
    formData.priority = event.target.value;
  };

  
  const handletitle = (event) => {
formData.title = event.target.value;
  };

  const handleAddButtonClick = () => {
    const newComponent = {
      id: Date.now(), 
      checklist_title: '', 
      checked: false, 
    };
    setComponents([...components,newComponent]);
  };

  const handleTextChange = (id, newText) => {
    const updatedComponents = components.map(component =>
      component.id === id ? { ...component, checklist_title: newText } : component
    );
    setComponents(updatedComponents);
    
  };


  const handleCheckboxChange = (id) => {
    const updatedComponents = components.map(component =>
      component.id === id ? { ...component, checked: !component.checked } : component
    );
    setComponents(updatedComponents);
   
  };


  const handleDeleteButtonClick = (id) => {
    const updatedComponents = components.filter(component => component.id !== id);
    setComponents(updatedComponents);
  };

 
  const handleCancelClick = () => {
    onClose()
    setShowCalendar(false)
    setSelectedDate(null)
    setFormData({
      title: '',
      priority: '',
      checklist: [],
      state:'TO-DO',
      dueDate: '0001-01-01T00:00:00.000Z'
    })
    setComponents([])
  };

  const handleSubmitButtonClick=async (e) => {
    e.preventDefault();
    
    const clonedArray = components.map(({ checklist_title, checked }) => ({ checklist_title, checked}));
    formData.checklist=clonedArray
    console.log("asa "+JSON.stringify(formData))
//

try {
  const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/task/createtask', { 
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  if (response.ok) {
    toast.success("Task Created sucessfully.");
    console.log('created task successful!');
  } else {
    toast.error("Make sure to provide all the compulsary details.");
 
    console.error('task  failed:', JSON.stringify(response));
  }
} catch (error) {
  toast.error("Something went wrong!");
  console.error('Error:', error.message);
}
finally{
  setTimeout(()=>{
    onClose();
    }, 3000);
    
    
    setShowCalendar(false)
    setSelectedDate(null)
    setFormData({
      title: '',
      priority: '',
      checklist: [],
      state:'TO-DO',
      dueDate: '0001-01-01T00:00:00.000Z'
    })
    setComponents([])
    window.location.reload();
}
    }
  

  return (
    <div className="modal">
      
     <ToastContainer />
     
    <div className="overlay"></div>
          <div className="modal_container">
            <div className="modal__header">
              <h2 className='title_label_JHU1'>Title<span className='complusary_fields_mark'> *</span></h2>
              <input placeholder='Enter Task Title' onChange={handletitle} className='title_txt_field_YTB3'/>
              <h2 className='title_label_JHU1' style={{display:'inline'}}>Select Priority<span className='complusary_fields_mark'> *</span></h2>
              <input type='radio' id='high_priority'    onChange={handlePriorityChange} className='radiobtn_priority'  name='priority_radio_group'  value='HIGH PRIORITY'/><label for="high_priority" className='radiobtn_prio_text'><span className="dot" style={{backgroundColor:'red'}}></span>HIGH PRIORITY</label>
             <input type='radio' id='mod_priority'    onChange={handlePriorityChange} className='radiobtn_priority' name='priority_radio_group' value='MODERATE PRIORITY'/><label for="mod_priority" className='radiobtn_prio_text' ><span className="dot" style={{backgroundColor:'#18B0FF'}}></span>MODERATE PRIORITY</label> 
             <input type='radio'id='low_priority'    onChange={handlePriorityChange} className='radiobtn_priority' name='priority_radio_group'  value='LOW PRIORITY'/><label for="low_priority" className='radiobtn_prio_text' ><span className="dot" style={{backgroundColor:'#63C05B'}}></span>LOW PRIORITY</label> 
           <div className='checklist_scrollable_conatiner'>
              <h2 className='title_label_JHU1'>Checklist (0/0)<span className='complusary_fields_mark'> *</span></h2>

         
            <div className='checklist_conatiner_top_JNH1'>
    
    {components.map(component => (
      <div  key={component.id}>
        <div className='checklist_field_container_sen4'>
         <input type="checkbox" checked={component.checked} onChange={() => handleCheckboxChange(component.id)}/>
            <input type="text" className='checklist_field_name_txt_HYGG2' placeholder='Add a task' value={component.checklist_title} onChange={(e) => handleTextChange(component.id, e.target.value)} />
         <button className='checklist_field_delete_btn_G2'onClick={() => handleDeleteButtonClick(component.id)}>
          <img src={delete_btn_logo} style={{width:'20px',height:'20px'}}  /></button>
      </div>
      </div>
    ))}
      <button className='addnew_CL_HY55 'onClick={handleAddButtonClick}>+ Add New</button>
      </div>
      </div>
      <div style={{display:'inline-block'}}>
      <button className='dueddatebtn_JHN7' onClick={handleButtonClick}>
                {selectedDate?selectedDate.toDateString():'Select Due Date'} {/* Display selected date as text */}
            </button>
            {showCalendar && (
                <div  style={{ position: 'absolute', top: '50%', left: '30%' }}>
                    <Calendar
                        onChange={handleCalendarChange}
                        value={selectedDate|| null} 
                    />
                </div>
            )}
      </div>
    <button className="submit_task_model_UHYN4" onClick={handleSubmitButtonClick}>Save</button>
    <button className="cancel_task_model_UHYN4" onClick={handleCancelClick}>Cancel</button>
  </div>
          </div>
    </div>
  );
}

export default TaskModal;