import React from "react";

const Modal = ({ showModal, onClose }) => {
  if (!showModal) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="modal-container">
        <div>
          <div>
            <button onClick={onClose}>X</button>
            <h4>Update Workout</h4>
            <label>title</label>
            <input type="text" />
            <label>load</label>
            <input type="text" />
            <label>reps</label>
            <input type="text" />
          </div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
