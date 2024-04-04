import { useState} from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

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

//   useEffect(() => {
//     const getCookieValue = (name) => (
//     document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
//     );
//     const authToken = getCookieValue('authToken');
//     console.log(authToken);
//     if (authToken) {
//       setIsLoggedIn(true);
//     }
// }, []);

const handleLogin = async (event) => {
    event.preventDefault(); 
  
    const userData = {
      login: document.getElementById("loginUsername").value,
      password: document.getElementById("password").value,
    };

    const apiEndpoint = "http://localhost:8080/login";
  
    try {
      const response = await axios.post(apiEndpoint, userData, {
        withCredentials: true 
      });
      console.log('Zalogowano pomyślnie:', response.data);
      setIsLogin(true);
      setIsLoggedIn(true);
      setLoginError('');
      setShowRegistrationAlert({ show: true, message: "Zostałeś zalogowany." });
      onLoginSuccess(); 
      onClose(); 
    } catch (error) {
      if (error.response) {
        console.log('Błąd logowania:', error.response.data);
        setLoginError('Niepoprawny email lub hasło.');
      } else {
        console.log('Błąd:', error.message);
        setLoginError('Wystąpił błąd podczas logowania. Spróbuj ponownie.');
      }
    }
  };
  
//Funkcja wylogowania
  //   const handleLogout = () => {
  //   setIsLoggedIn(false);
  
  //   const cookies = document.cookie.split(";");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i];
  //     const eqPos = cookie.indexOf("=");
  //     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  //   }
  // };

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
