// Modal.js
import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, title, children, iframeSrc }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="modal-body">
          {iframeSrc ? (
            <iframe src={iframeSrc} title={title} className="modal-iframe" />
          ) : (
            children
          )}
        </div>
        <button className="modal-close" onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default Modal;
