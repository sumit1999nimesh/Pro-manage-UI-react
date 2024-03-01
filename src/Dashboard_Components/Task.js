import CollapsibleCheckListText from "./CollapsibleCheckListText";
import '../Dashboard_Components/Task.css'; 
import more_icon from '../icons/more.png';
import arrow_down_icon from '../icons/Arrow - Down 2.png';
import arrow_up_icon from '../icons/Arrow - up 2.png';
import { useState,useEffect,useRef } from "react";
import Threedot from "./threeDot";
import DeleteModel from '../Model_Components/DeleteModel'
import TaskEditModal from "../Model_Components/TaskEditModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Task(props){
  const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [checkliststate, setcheckliststate]=useState('false')
    const [showOptions, setShowOptions] = useState(false);
    const taskState=props.taskobjects.state;
    let checkedcount=0;
    const optionsRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    let formattedDate='';
    let monthName='',day='',daySuffix='';

    if(props.taskobjects.dueDate!=='0001-01-01T00:00:00.000Z'){
    const originalDate =new Date(props.taskobjects.dueDate);
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];

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
    }
       formattedDate = `${monthName} ${day}${daySuffix}`;
     //  console.log('datte '+ formattedDate.length)
     const dateFromString = new Date( props.taskobjects.dueDate);
      const currentDate = new Date();

  
const closeModalEdit = () => {
  setIsOpenEdit(false);
};


    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                // Click occurred outside of the options menu, so close it
                setShowOptions(false);
            }
        }

        // Add event listener when component mounts
        document.addEventListener('click', handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    const handleDeleteModel=()=>{
        console.warn('delete')
        setIsOpen(true);
       
    }

    const closeModal = () => {
        setIsOpen(false);
      };

  
       const openchecklist=()=>{
        setcheckliststate('true')
       }
       for(let i=0;i<props.taskobjects.checklist.length;i++){
         if(props.taskobjects.checklist[i].checked===true) checkedcount++;
       }
       const closechecklist=()=>{
        setcheckliststate('false')
       }
       const handlethreedot=()=>{
        console.warn("ckielced ");
        setShowOptions(!showOptions);
       }
        
       const handlesharelink=async (e)=>{
        const taskid=props.taskobjects._id;
        const url = `https://pro-manage-ui-9a741368322d.herokuapp.com/public/`+taskid;
        console.log(url);
        try {
          await navigator.clipboard.writeText(url);
         // toast.success("Link Copied");
          alert('Link is copied');
      } catch (error) {
          console.error('Failed to copy link to clipboard:');
      }
      finally{}
      setShowOptions(false);
       }

       const hanldleEdittask=async (e)=>{
        setIsOpenEdit(true);
     
       }
       const handlupdatestate=async (e)=>{
        const taskid=props.taskobjects._id;
        const newstate=e.target.value;
        console.warn("title "+ props.taskobjects._id)
        console.warn("title "+ e.target.value)
        e.preventDefault();
        const url = `https://pro-manage-61b10a19ae77.herokuapp.com/task/updatetaskstate/${taskid}/${newstate}`;
      
          try {
            const response = await fetch(url, { 
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
        
            if (response.ok) {
              //toast.success("Registered sucessfully. Please Login!");
              console.log('change state sucessfully');
            } else {
            //  toast.error("Something went wrong. Please try again later");
              console.error('Signup failed:', response);
            }
          } catch (error) {
            console.error('Error:', error.message);
          }
          finally{
            window.location.reload();
          }
        };
    return (
      
        <div  className="taskcard">

     
            <div className="taskcard_sub_container_jjj2">
            <div ref={optionsRef} className="moreoption_Container" style={{ position: 'relative'}}>
        <img src={more_icon} className="more_icon_UYT6" alt="logo" onClick={handlethreedot} />
        <TaskEditModal isOpenEdit={isOpenEdit} taskdata={props.taskobjects}   onCloseEdit={closeModalEdit}>
        </TaskEditModal>
        {showOptions && (
               <div className="options-menu">
                    <ul  style={{ listStyleType: 'none', padding:'0px', margin:'0px'}}>
                        <li className="LI_moreoption_UJH5"><label onClick={hanldleEdittask}>Edit</label></li>
                        <li className="LI_moreoption_UJH5"><label onClick={handlesharelink}>Share</label></li>
                        <li className="LI_moreoption_UJH5" onClick={handleDeleteModel}><label>Delete</label></li>
                    </ul>
                </div>
            )}
            </div>
        <div>
        <div className="priority_TXT_uYN1"><span className="dot" style={{backgroundColor:props.taskobjects.priority==='High'?'red': props.taskobjects.priority==='low'? '#63C05B': "skyblue" }}>
            </span>{props.taskobjects.priority}</div>
        <h2 className="title_task_nhb3">{props.taskobjects.title}</h2>
        {checkliststate==='false'? <img src={arrow_down_icon} className="more_icon_UYT6" alt="logo" onClick={openchecklist} />
        :<img src={arrow_up_icon} className="more_icon_UYT6" alt="logo"  onClick={closechecklist}/>}
        <h3 className="cl_title_task_nhb3_NSBH">Checklist ({checkedcount}/{props.taskobjects.checklist.length})</h3>
        {checkliststate==='true'?<CollapsibleCheckListText title="Section 1" initialCollapsed={false} checklistdata={props.taskobjects.checklist} />:""}
       
      {dateFromString<currentDate && formattedDate.length>1 && taskState!=='DONE'?
      <label className="duedate_label" style={{backgroundColor:'red', color:'black'}}>{formattedDate}</label >
       :  formattedDate.length>1 && dateFromString>currentDate && taskState!=='DONE'?
        <label className="duedate_label" >{formattedDate}</label > : 
        formattedDate.length>1 && taskState==='DONE'?
        <label className="duedate_label" style={{backgroundColor:'lightgreen', color:'black'}}>{formattedDate}</label >:
         <label className="duedate_label" style={{backgroundColor:'white'}}></label >}
        {taskState!=='BACKLOG'? <button className="status_btn_group_UY6" value="BACKLOG" onClick={handlupdatestate}>BACKLOG</button>:""}
        {taskState!=='PROGRESS'?  <button className="status_btn_group_UY6" value="PROGRESS"  onClick={handlupdatestate}>PROGRESS</button>:""}
        {taskState!=='TO-DO'? <button className="status_btn_group_UY6" value="TO-DO"  onClick={handlupdatestate}>TO-DO</button>:""}
        {taskState!=='DONE'?  <button className="status_btn_group_UY6"  value="DONE"  onClick={handlupdatestate}>DONE</button>:""}
        
      
        </div>
        <DeleteModel isOpen={isOpen} onClose={closeModal} taskId={props.taskobjects._id}>
      </DeleteModel>
        </div>
        </div>
    );
}

export default Task;
