import React from 'react';
import correct from "../photos/correct.png";

function AlertModal({ show, onClose, message }) {
  if (!show) {
    return null;
  }

  return (
    <div className="AlertModal-backdrop">
      <div className="AlertModal-content">
        <div className="AlertModal-close-container">
          <button onClick={onClose} className="AlertModal-close-button">×</button>
        </div>
        <div className="AlertModal-body">
          {/* <img
          src={correct}
          /> */}
          <h1>{message || "Good Job!"}</h1>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
