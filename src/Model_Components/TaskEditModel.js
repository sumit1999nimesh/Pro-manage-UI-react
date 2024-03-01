import React, { useState } from 'react';
import '../Model_Components/TaskModel.css'; 
import delete_btn_logo from '../icons/Delete.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskEditModal({ isOpenEdit, onCloseEdit ,taskdata}) {
  const [components, setComponents] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");


  const [formData, setFormData] = useState({
    title: taskdata.title,
    priority: taskdata.priority,
    checklist: taskdata.checklist,
    state: taskdata.state,
        dueDate: '0001-01-01T00:00:00.000Z'
  });


  const handleButtonClick = () => {
      setShowCalendar(!showCalendar);
  };

  const handleCalendarChange = (date) => {
      setSelectedDate(date);
      setShowCalendar(false); 
      setFormData(
        {
    
            title: formData.title,
            priority: formData.priority,
            checklist: formData.checklist,
            state: formData.state,
            dueDate: date
      
          })
  
  };
  if (!isOpenEdit) return null;

  const handlePriorityChange = (event) => {
    setFormData(
      {
  
          title: formData.title,
          priority: event.target.value,
          checklist: formData.checklist,
          state: formData.state,
          dueDate: formData.dueDate
    
        })
  };

  
  const handletitle = (event) => {
    setFormData(
        {
          title:  event.target.value,
          priority: formData.priority,
          checklist: formData.checklist,
          state: formData.state,
          dueDate: formData.dueDate
           
          }
    )
  };

  
  const handleAddButtonClick = () => {
    const newComponent = {
      _id: Date.now(), 
      checklist_title: '', 
      checked: false, 
    };
    setFormData(
      {
        title: formData.title,
        priority: formData.priority,
        checklist: [...formData.checklist,newComponent],
        state: formData.state,
        dueDate: formData.dueDate,
      }
  )
    setComponents([...formData.checklist,newComponent]);
  };

  const handleTextChange = (id, newText) => {
    const updatedComponents = formData.checklist.map(component =>
      component._id === id ? { ...component, checklist_title: newText } : component
    );
    
    setFormData(
      {
        title: formData.title,
        priority: formData.priority,
        checklist: updatedComponents,
        state: formData.state,
        dueDate: formData.dueDate,
      }
  )
    
  };


  const handleCheckboxChange = (id) => {
    const updatedComponents = formData.checklist.map(component =>
      component._id === id ? { ...component, checked: !component.checked } : component
    );
    setFormData(
      {
          title: formData.title,
          priority: formData.priority,
          checklist: updatedComponents,
          state: formData.state,
          dueDate: formData.dueDate,
        }
  )
  };


  const handleDeleteButtonClick = (id) => {
    const updatedComponents = formData.checklist.filter(component => component._id !== id);
    setFormData(
      {
        title: formData.title,
        priority: formData.priority,
        checklist: updatedComponents,
        state: formData.state,
        dueDate: formData.dueDate,
      }
  )
  };

  console.log('formdata '+JSON.stringify(formData));

  const handleCancelClick = () => {
    onCloseEdit()
    setShowCalendar(false)
    setSelectedDate(null)
    setFormData(
      {
          title: taskdata.title,
          priority: taskdata.priority,
          checklist: taskdata.checklist,
          state: taskdata.state,
          dueDate: taskdata.dueDate
        }
  )
    setComponents([])
  };

  const handleSubmitButtonClick=async (e) => {
    e.preventDefault();
    
    const clonedArray = formData.checklist.map(({ checklist_title, checked }) => ({ checklist_title, checked}));
    //formData.checklist=clonedArray
    setFormData(
      {
          title: taskdata.title,
          priority: taskdata.priority,
          checklist: clonedArray,
          state: taskdata.state,
          dueDate: taskdata.dueDate
        }
  )
    console.log('formdata '+JSON.stringify(clonedArray));
//

try {
  const response = await fetch('https://pro-manage-61b10a19ae77.herokuapp.com/task/updatetask/'+taskdata._id, { 
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  if (response.ok) {
    toast.success("Task updated sucessfully sucessfully.");
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
    onCloseEdit();
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
              <input placeholder='Enter Task Title' value={formData.title} onChange={handletitle} className='title_txt_field_YTB3'/>
              <h2 className='title_label_JHU1' style={{display:'inline'}}>Select Priority<span className='complusary_fields_mark'> *</span></h2>
          <  input type='radio' id='high_priority' checked={formData.priority==='HIGH PRIORITY'}  onChange={handlePriorityChange} className='radiobtn_priority'  name='priority_radio_group'  value='HIGH PRIORITY'/><label for="high_priority" className='radiobtn_prio_text'><span className="dot" style={{backgroundColor:'red'}}></span>HIGH PRIORITY</label>
             <input type='radio' id='mod_priority'  checked={formData.priority==='MODERATE PRIORITY'}  onChange={handlePriorityChange} className='radiobtn_priority' name='priority_radio_group' value='MODERATE PRIORITY'/><label for="mod_priority" className='radiobtn_prio_text' ><span className="dot" style={{backgroundColor:'#18B0FF'}}></span>MODERATE PRIORITY</label> 
             <input type='radio'id='low_priority'   checked={formData.priority==='LOW PRIORITY'}  onChange={handlePriorityChange} className='radiobtn_priority' name='priority_radio_group'  value='LOW PRIORITY'/><label for="low_priority" className='radiobtn_prio_text' ><span className="dot" style={{backgroundColor:'#63C05B'}}></span>LOW PRIORITY</label> 
           <div className='checklist_scrollable_conatiner'>
              <h2 className='title_label_JHU1'>Checklist (0/0)<span className='complusary_fields_mark'> *</span></h2>

         
            <div className='checklist_conatiner_top_JNH1'>
    
    {formData.checklist.map(component => (
      <div  key={component._id}>
        <div className='checklist_field_container_sen4'>
         <input type="checkbox" checked={component.checked} onChange={() => handleCheckboxChange(component._id)}/>
            <input type="text" className='checklist_field_name_txt_HYGG2' placeholder='Add a task' value={component.checklist_title} onChange={(e) => handleTextChange(component._id, e.target.value)} />
         <button className='checklist_field_delete_btn_G2'onClick={() => handleDeleteButtonClick(component._id)}>
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

export default TaskEditModal;