import React, { useState } from 'react';
import '../Model_Components/TaskModel.css';
import delete_btn_logo from '../icons/Delete.png';
import { useNavigate } from 'react-router-dom';

function LogOutModel({ isOpen, onClose ,taskId }) {
    
    const navigate  = useNavigate();
    if (!isOpen) return null;
   
        const handleDeleteButtonClick = async () => {
            try {
                localStorage.removeItem('token');
               console.log('logout Successfully ')
                navigate('/');


            } catch (error) {
                console.error('Error deleting item:', error.message);
            }
        };

       

    const handleCancelButtonClick = () => {
        onClose(false);
    };

    return (
        <div className="modal">
            <div className="overlay"></div>
            <div className="delete_modal_container">
                <h2 className='titledelete_label_JH111'>Are you sure you want to Logout?</h2>
                <div>
                    <button className='model_delete_bbtn' onClick={handleDeleteButtonClick}>Yes, Logout</button>

                </div>
                <button className='model_cancel_bbtn' onClick={handleCancelButtonClick}>Cancel</button>
            </div>
        </div>

    );
}

export default LogOutModel;