
import React from 'react';
import dietuzjemLogo from './photos/logo.png';
import { useAuth } from './AuthContext';
import RegistrationPopup from "./registrationPopup";
import LoginPopup from "./loginPopup";
export default function Header() {
  const { isLoggedIn, handleLogout,popupType, setPopupType, togglePopup } = useAuth();

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="left-section">
          <img src={dietuzjemLogo} alt="DieTuzjem Logo" className="logo-image" />
          <p className="logo" >DieTuzjem</p>
        </div>
        <div className="right-section">
          {isLoggedIn ? (
            <button className="button-regular--white" onClick={handleLogout}>
              Wyloguj
            </button>
          ) : (
            <button className="button-regular--white" onClick={() => togglePopup('login')}>
              Zaloguj
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
