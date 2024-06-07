import React from 'react';

function ModalGlobal({ isOpen,children }) {
  if (!isOpen) return null;

  return (
    <div className="global-modal-backdrop">
      <div className="global-modal-content">
        {children}
      </div>
    </div>
  );
}

export default ModalGlobal;
