import React, { useEffect } from 'react';
import correct from "../photos/correct.png";

function AlertModal({ show, onClose, message, colorScheme }) {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onClose();
      }, 4000); 
    }

    return () => clearTimeout(timer);
  }, [show, onClose]); 

  if (!show) {
    return null; 
  }


  const backdropClass = `AlertModal-backdrop ${colorScheme}`;
  const closeContainerClass = `AlertModal-close-container ${colorScheme}`;
  const bodyClass = `AlertModal-body ${colorScheme}`;

  return (
    <div className={backdropClass}>
      <div className="AlertModal-content">
        <div className={closeContainerClass}>
          <button onClick={onClose} className="AlertModal-close-button">×</button>
        </div>
        <div className={bodyClass}>
        
          {/* <img src={correct} alt="Correct" /> */}
          <h1>{message || "Proces zakończony pomyślnie!"}</h1>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
