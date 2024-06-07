import React, { createContext, useContext, useState } from 'react';
import AlertModal from './AlertModal';

const AlertModalContext = createContext();

export function useAlertModal() {
  return useContext(AlertModalContext);
}

export const AlertModalProvider = ({ children }) => {

  const [modal, setModal] = useState({ show: false, message: "", colorScheme: "default" });


  const showAlertModal = (message, colorScheme = "default") => 
    setModal({ show: true, message, colorScheme });


  const closeAlertModal = () => setModal({ show: false, message: "", colorScheme: "default" });

  return (
    <AlertModalContext.Provider value={{ showAlertModal, closeAlertModal }}>
      {children}
      <AlertModal 
        show={modal.show} 
        onClose={closeAlertModal} 
        message={modal.message} 
        colorScheme={modal.colorScheme} 
      />
    </AlertModalContext.Provider>
  );
};
