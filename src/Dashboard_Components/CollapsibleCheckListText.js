
import '../Dashboard_Components/Task.css'; 
function CollapsibleCheckListText(props){
    console.warn("checklistdata "+JSON.stringify(props.checklistdata))
    return (
    
      
        <div>
               {props.checklistdata.map((checklistitem) => (
            <div>
      <label className="checklist_items_THYG1">
        <input className='check_box_tajj'
          type="checkbox"
          checked={checklistitem.checked}
        />
        {checklistitem.checklist_title}
      </label>
    </div>  ))}
        </div>
    );
}

export default CollapsibleCheckListText;