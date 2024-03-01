import { useEffect, useState } from 'react';
import '../Dashboard_Components/TaskContainer.css'; 
import collapse_btn from '../icons/Group.png';
import create_btn from '../icons/create.png';
import TaskModal from '../Model_Components/TaskModel';
import Task from './Task';

function TaskContainer(props) {
    const [showCreateIcon, setCreateIcon] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
      };
   console.warn("headinssg "+ props.tasks.length  )
      
    const createtaskhandle=()=>{
        setIsOpen(true);
}
    return (
    <div className="task_container">
        <div className="task_container_child_jnH3">
            
        {props.heading==="To do" ?  
            <img style={{width:'14px',height:'14px',marginRight:'20px', marginTop:'30px',float:'right'}}  src={create_btn} alt="Button Image" onClick={createtaskhandle}/>
            : <div/> }
        <img style={{width:'18px' ,height:'18px',marginRight:'20px', marginTop:'30px',float:'right'}}  src={collapse_btn} alt="Button Image"/>
            <div style={{float:'left',marginLeft:'20px', marginTop:'30px', font:'Poppins',fontSize:'16px', fontWeight:'500'}}>{props.heading}
            </div> 
            <div style={{height:'60px'}}></div>
            { props.tasks.length>0 ? 
            props.tasks.map((task) => (
                
           <Task taskobjects={task}></Task>
          
            ))
            :""}
            
                <TaskModal isOpen={isOpen} onClose={closeModal}>
      </TaskModal>
        </div>
   
    </div>
    );
    }
    export default TaskContainer;