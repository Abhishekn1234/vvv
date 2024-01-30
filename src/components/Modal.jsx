

import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import '../css/Modal.css';
import { useNavigate } from 'react-router-dom';
export default function Modal({setModalOpen}) {
    const navigate=useNavigate();
  return (
    <div className="darkBg" onClick={()=>setModalOpen(false)}>
      <div className='centered'>
        <div className='modal'>
          <div className='modalHeader'>
            <h5 className='heading'>Confirm</h5>
            <button className='closeBtn'  onClick={()=>setModalOpen(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
          </div>
          <div className="modalContent">
            Are you sure you want to log out?
          </div><br/>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className='logOutBtn' onClick={()=>{
                setModalOpen(false);
                localStorage.clear()
                navigate('/login');
              }}>
                Log Out
              </button>
              <button className='cancelBtn' onClick={()=>setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
