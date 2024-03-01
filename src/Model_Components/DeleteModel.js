import React, { useState } from 'react';
import '../Model_Components/TaskModel.css';
import delete_btn_logo from '../icons/Delete.png';
import { useNavigate } from 'react-router-dom';

function DeleteModel({ isOpen, onClose ,taskId }) {
    const [components, setComponents] = useState([]);
    const navigate  = useNavigate();
    if (!isOpen) return null;
   console.warn("AA "+taskId)
    
        const handleDeleteButtonClick = async () => {
            try {
                const response = await fetch(`https://pro-manage-61b10a19ae77.herokuapp.com/task/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
              
                    throw new Error('Failed to delete item');
                }
                console.warn('deleted sucessfully');
                
                onClose(false);
        
            } catch (error) {
                console.error('Error deleting item:', error.message);
            }
            finally{window.location.reload();}
        };

       

    const handleCancelButtonClick = () => {
        onClose(false);
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="delete_modal_container">
                <h2 className='titledelete_label_JH111'>Are you sure you want to Delete?</h2>
                <div>
                    <button className='model_delete_bbtn' onClick={handleDeleteButtonClick}>Yes, Delete</button>

                </div>
                <button className='model_cancel_bbtn' onClick={handleCancelButtonClick}>Cancel</button>
            </div>
        </div>

    );
}

export default DeleteModel;