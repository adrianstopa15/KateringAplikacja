import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

// klucz do recapcha: 6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ

function RegistrationPopup({ onClose, onToggleToLogin }) {
    const [login, setIsLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); 
    const [capVal, setCapVal] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const validateForm = () => {
    const loginValid = /^[A-Za-z0-9]+$/.test(login) &&
                        !/^\d+$/.test(login) &&
                        login.length >= 4 &&
                        login.length <= 32;
    const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordValid = password.length >= 8 
                      && /\d/.test(password) 
                      && /[!@#$%^&*(),.?":{}|<>]/.test(password)
                      && /[A-Z]/.test(password);
    const passwordsMatch = password === confirmPassword;
    const recaptchaValid = capVal !== null;

    if (!loginValid) {
      setAlert({ show: true, message: 'Nazwa użytkownika musi zawierać co najmniej 4 znaki oraz litery.', variant: 'danger' });
      return false;
    } else if (!emailValid) {
      setAlert({ show: true, message: 'Niepoprawny format adresu email.', variant: 'danger' });
      return false;
    } else if (!passwordValid) {
      setAlert({ show: true, message: 'Hasło musi zawierać co najmniej 8 znaków, w tym minimum 1 cyfrę, jeden znak specjalny oraz jedna duża litere.', variant: 'danger' });
      return false;
    } else if (!passwordsMatch) {
      setAlert({ show: true, message: 'Hasła nie są identyczne.', variant: 'danger' });
      return false;
    } else if (!recaptchaValid) {
      setAlert({ show: true, message: 'Proszę potwierdzić, że nie jesteś robotem.', variant: 'danger' });
      return false;
    }
    return true;
  };

  const checkAvailability = async () => {
    try {
      const usernameResponse = await axios.get(`http://localhost:8080/checkUsername?username=${login}`);
      if (!usernameResponse.data.isAvailable) {
        setAlert({ show: true, message: 'Nazwa użytkownika jest już zajęta.', variant: 'danger' });
        return false;
      }
  
      const emailResponse = await axios.get(`http://localhost:8080/checkEmail?email=${email}`);
      if (!emailResponse.data.isAvailable) {
        setAlert({ show: true, message: 'Email jest już używany.', variant: 'danger' });
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("Błąd podczas sprawdzania dostępności:", error);
      setAlert({ show: true, message: 'Wystąpił problem podczas sprawdzania dostępności. Proszę spróbować ponownie.', variant: 'danger' });
      return false;
    }
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    const formValid = validateForm();

    if (!validateForm()) return;
    if (!formValid || !passwordsMatch || !capVal) return;
    
    const isAvailable = await checkAvailability();
    if (!isAvailable) return;

    try {
      const response = await axios.post('http://localhost:8080/register', {
        login,
        email,
        password,
      });
      console.log(response.data);
       
      setAlert({ show: true, message: 'Rejestracja zakończona sukcesem. Możesz się teraz zalogować.', variant: 'success' });
      
      setTimeout(() => {
        onToggleToLogin(); 
      }, 2000); 
      

    } catch (error) {
      console.error('Błąd rejestracji:', error);
      setAlert({ show: true, message: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.', variant: 'danger' });
    }
};

  return (
    <div className="login-popup-container">
      <div className="popup-background" onClick={onClose}></div>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>Rejestracja</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: '' })} dismissible>{alert.message}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <label>Nazwa użytkownika:</label>
            <input type="name" placeholder='Podaj nazwę użytkownika' value={login} onChange={(e) => setIsLogin(e.target.value)} required />
          </div>
          <div className="login-form">
            <label>Email:</label>
            <input type="email" placeholder='Podaj adres email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="login-form">
            <label>Hasło:</label>
            <input type="password" placeholder='Podaj hasło' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="login-form">
            <label>Powtórz hasło:</label>
            <input type="password" placeholder='Powtórz hasło' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />          </div>
          <br></br>
          <ReCAPTCHA sitekey="6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ" onChange={(val) => setCapVal(val)} />

          <button type="submit" style={{width:'98%'}} className="register-button">Zarejestruj</button>
        </form>
            <div className="signup-redirect">
                <p>
                    Masz już konto?{" "}
                    <button onClick={onToggleToLogin}>Zaloguj się</button>
                </p>
            </div>
      </div>
    </div>
  );
}

export default RegistrationPopup;
