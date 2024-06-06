
import React, { createContext, useContext, useState } from 'react';
import AlertModal from './AlertModal';

const AlertModalContext = createContext();

export function useAlertModal() {
  return useContext(AlertModalContext);
}

export const AlertModalProvider = ({ children }) => {
  const [modal, setModal] = useState({ show: false, message: "" });

  const showAlertModal = (message) => setModal({ show: true, message });
  const closeAlertModal = () => setModal({ show: false, message: "" });

  return (
    <AlertModalContext.Provider value={{ showAlertModal, closeAlertModal }}>
      {children}
      <AlertModal show={modal.show} onClose={closeAlertModal} message={modal.message} />
    </AlertModalContext.Provider>
  );
};
