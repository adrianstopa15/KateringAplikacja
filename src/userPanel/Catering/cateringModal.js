import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CateringModal = ({ isOpen, onRequestClose, mealName }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="catering-modal-content"
            overlayClassName="catering-modal-overlay"
        >
            <h2>Twoje {mealName}</h2>
            <button onClick={onRequestClose} className="close-button">&#x274C;</button>
            <button onClick={onRequestClose} className="add-button">Dodaj</button>
        </Modal>
    );
};

export default CateringModal;
