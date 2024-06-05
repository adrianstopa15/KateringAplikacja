import React, { useState } from 'react';

const GlobalModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="global-modal-overlay" onClick={onClose}>
        <div className="global-modal-content" onClick={e => e.stopPropagation()}>
          <button className="global-close-button" onClick={onClose}>&times;</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default GlobalModal;