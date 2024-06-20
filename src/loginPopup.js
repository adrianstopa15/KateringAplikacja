import { useState} from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


// klucz do recapcha: 6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ

export default function LoginPopup({ onClose, onToggleToRegister, onLoginSuccess}) {
  const [showRegistrationAlert, setShowRegistrationAlert] = useState({ show: false, message: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [formKey] = useState(0);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
  
    const userData = {
      login: document.getElementById("loginUsername").value,
      password: document.getElementById("password").value,
    };
  
    const apiEndpoint = "http://localhost:8080/login";
  
    try {
      const response = await axios.post(apiEndpoint, userData, { withCredentials: true });
      if (response.data.statusCodeValue && response.data.statusCodeValue !== 200) {
        setLoginError(response.data.body || 'Niepoprawny login lub hasło.');
      }
      console.log(response.data);
      setIsLoggedIn(true);
      setShowRegistrationAlert({ show: true, message: "Zostałeś zalogowany." });
  
      const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];
  
      axios.get(`http://localhost:8080/isFirstLogin?login=${userData.login}`, { 
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        withCredentials: true 
      })
      .then(response => {
        if(response.data.isFirstLogin) {
          navigate('/profilePages'); 
        } else {
          onLoginSuccess();
          setIsLoggedIn(true); 
          onClose();
        }
      })
    } catch (error) {
      console.error('Błąd logowania:', error);
      setLoginError('Niepoprawny login lub hasło lub wystąpił błąd serwera.');
    }
  };

  function handleResetPassword(e) {
    e.preventDefault();
    // Tutaj możesz dodać logikę do obsługi resetowania hasła,
    // np. wysyłanie żądania do backendu.
    alert("Wiadomość przypomnienia hasła została wysłana.");
  }

  return (
    <div className="login-popup-container">
      <div className="popup-background" onClick={onClose}></div>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {isLogin ? (
          <>
          {showRegistrationAlert.show && (
              <Alert variant="success" onClose={() => setShowRegistrationAlert({ show: false, message: "" })} dismissible>
                {showRegistrationAlert.message}
              </Alert>
          )}
            <div className="popup-header">
              <h2>Logowanie</h2>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <form key={formKey} className="login-form" onSubmit={handleLogin}>
            <label htmlFor="loginUsername">Nazwa Użytkownika</label>
              <input
                  type="name"
                  id="loginUsername"
                  value={loginUsername} 
                  onChange={(e) => setLoginUsername(e.target.value)} 
                  placeholder="Podaj Nazwę Użytkownika"
                  required
              />
              <label htmlFor="password">Hasło</label>
                <input
                  type="password"
                  id="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Podaj Hasło"
                  required
                />
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Zapamiętaj</label>
                </div>
                <a
                  href="/home"
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                    setIsResetPassword(true);
                  }}
                >
                  Nie pamiętam hasła
                </a>
              </div>
              <br></br>
              {loginError && (
                <Alert variant="danger" onClose={() => setLoginError('')} dismissible>
                  {loginError}
                </Alert>
              )}
              <button type="submit" className="login-button" name="handleLogin">
                Zaloguj
              </button>
            </form>

            <div className="signup-redirect">
            <p>
              Nie masz jeszcze konta?{" "}
              <button onClick={onToggleToRegister}>Zarejestruj się</button>
            </p>
          </div>
          </>
        ) : isResetPassword ? (
          <>
            <div className="popup-header">
              <h2>Przypomnienie hasła</h2>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <form key={formKey} className="login-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Podaj adres email"
                required
              />
              <br></br>
              <button
                type="submit"
                className="reset-password-button"
                onClick={handleResetPassword}
              >
                Wyślij
              </button>
            </form> 
          </>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}
