import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

// klucz do recapcha: 6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ

export default function LoginPopup({ onClose }) {
  const [showRegistrationAlert, setShowRegistrationAlert] = useState({ show: false, message: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [formKey, setFormKey] = useState(0);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [capVal, setCapVal] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loginUsername, setLoginUsername] = useState('');
  const [loginError, setLoginError] = useState('');

  const [usernameValidation, setUsernameValidation] = useState({
    loading: false,
    valid: null,
    message: "",
  });
  const [emailValidation, setEmailValidation] = useState({
    loading: false,
    valid: null,
    message: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    valid: null,
    message: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState({
    valid: null,
    message: "",
  });

  function isLogged(e) {
    e.preventDefault();
    setIsLogin(!isLogin);
    setFormKey((prevKey) => prevKey + 1);
  }
  function toggleLoginRegister(e) {
    e.preventDefault();
    setIsLogin(!isLogin); // Zmień stan na przeciwny niż obecny
  }

  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/checkEmail?email=${email}`);
      return response.data.isAvailable;
    } catch (error) {
      console.error("Błąd podczas sprawdzania dostępności e-maila:", error);
      return false; 
    }
  };

// Po przycisku zarejestruj
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowRegistrationAlert({ show: false, message: "", variant: "success" });

    if (!capVal) {
      setShowRegistrationAlert({ show: true, message: "Proszę potwierdzić, że nie jesteś robotem.", variant: "danger" });
      return;
    }
    let errorMessage = [];
    const emailIsAvailable = await checkEmailAvailability(document.getElementById("registerEmail").value);
    if (!emailIsAvailable) {
      errorMessage.push('Email jest już używany!');
      setShowRegistrationAlert({ show: true, message: "Podany adres email jest już używany.", variant: "danger" });
      return;
    }

    if (usernameValidation.valid === false) {
      errorMessage.push('Nazwa użytkownika jest użyta!');
    }
    if (passwordValidation.valid === false){
      errorMessage.push('Hasło nie spełnia wymagań.');
    }
    if (password !== confirmPassword) {
      errorMessage.push("Podane hasła nie są identyczne.");
    }

    if (errorMessage.length > 0) {
      const formattedMessage = errorMessage.join(' i ');
      alert(`Nie można zarejestrować: ${formattedMessage}.`);
      return; 
    }

    const userData = {
      login: document.getElementById("name").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };

    const apiEndpoint = "http://localhost:8080/register";
    
    try {
      const response = await axios.post(apiEndpoint, userData);
      setShowRegistrationAlert({ show: true, message: "Rejestracja zakończona sukcesem. Możesz się teraz zalogować!", variant: "success" });
      console.log("Odpowiedź z serwera:", response.data);
      setIsLogin(true); 
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 400) {
          alert(error.response.data); 
        } else {
          setShowRegistrationAlert({ show: true, message: "Wystąpił błąd podczas rejestracji. Spróbuj ponownie.", variant: "danger" });
        }
      } else {
        alert("Nie udało się połączyć z serwerem.");
      }
      console.error("Błąd rejestracji:", error);
    }
  }

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
      setLoginError('');
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

// Funkcja wylogowania
  const handleLogout = () => {
    // Tutaj możesz dodać logikę do wylogowania, np. wywołując endpoint wylogowania na backendzie
    setIsLogin(false); 
  };

//sprawdzanie hasel
  const validatePassword = (newPassword) => {
    setPassword(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g;
    if (
      !newPassword ||
      newPassword.length < 8 ||
      !hasSpecialChar.test(newPassword)
    ) {
      setPasswordValidation({
        valid: false,
        message:
          "Hasło musi zawierać co najmniej 8 znaków oraz 1 znak specjalny.",
      });
    } else {
      setPasswordValidation({
        valid: true,
        message: "Hasło spełnia wymagania.",
      });
    }
  };
  const checkPasswordsMatch = (newConfirmPassword) => {
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword && password !== newConfirmPassword) {
      setPasswordsMatch({ valid: false, message: "Hasła nie są identyczne." });
    } else if (password && newConfirmPassword) {
      setPasswordsMatch({ valid: true, message: "Hasła są identyczne." });
    } else {
      setPasswordsMatch({ valid: null, message: "" });
    }
  };

// Walidacja loginu
  const validateUsername = async (username) => {
    if (!username.trim()) {
      setUsernameValidation({ loading: false, valid: null, message: "" });
      return;
    }
    setUsernameValidation({ loading: true, valid: null, message: "" });
  if (!username || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    setUsernameValidation({ loading: false, valid: false, message: "Nazwa użytkownika jest niepoprawna" });
    return;
  }
  setUsernameValidation({ loading: true, valid: null, message: "" });
    try {
      const response = await axios.get(`http://localhost:8080/checkUsername?username=${username}`);

      setUsernameValidation({
        loading: false,
        valid: response.data.isAvailable,
        message: response.data.isAvailable
          ? "Nazwa użytkownika jest dostępna"
          : "Nazwa użytkownika jest zajęta",
      });
    } catch (error) {
      setUsernameValidation({
        loading: false,
        valid: false,
        message: "Błąd przy sprawdzaniu nazwy użytkownika",
      });
    }
  };

// Walidacja formatu e-mail
  const validateEmail = async (email) => {
    if (!email.trim()) {
      setEmailValidation({ loading: false, valid: null, message: "" });
      return;
    }
    setEmailValidation({ loading: true, valid: null, message: "" });

    // Domeny
    const allowedDomains = ["example.com", "gmail.com", "op.pl", "yahoo.com", "outlook.com", "onet.eu"];
    const emailRegex = new RegExp(`^[\\w-\\.]+@(${allowedDomains.join('|').replace(/\./g, '\\.')})$`);

    if (!emailRegex.test(email)) {
      setEmailValidation({
        loading: false, 
        valid: false, 
        message: "Niepoprawny format adresu e-mail",
      });
    } else {
      setEmailValidation({
        loading: false, 
        valid: true, 
        message: "Format adresu e-mail jest poprawny",
      });
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
                  value={loginUsername} // Użyj stanu
                  onChange={(e) => setLoginUsername(e.target.value)} // Aktualizuj stan
                  placeholder="Podaj Nazwę Użytkownika"
                  required
              />
              <label htmlFor="password">Hasło</label>
                <input
                  type="password"
                  id="password"
                  value={password} // Użyj stanu
                  onChange={(e) => setPassword(e.target.value)} // Aktualizuj stan
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
              {
              loginError && <div className="login-error">{loginError}
              </div>
              }
              <button type="submit" className="login-button" name="handleLogin">
                Zaloguj
              </button>
            </form>

            <div className="signup-redirect">
              <p>
                Nie masz jeszcze konta?{" "}
                <a href="/home" onClick={toggleLoginRegister}>
                  Zarejestruj się
                </a>
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
            <div className="popup-header">
              <h2>Rejestracja</h2>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <form key={formKey} className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Nazwa Użytkownika</label>
              <input
                type="name"
                id="name"
                placeholder="Podaj Nazwe Użytkownika"
                required
                onChange={(e) => validateUsername(e.target.value)}
              />
              {usernameValidation.loading && (
                <span className="validation-message loading">
                  Sprawdzanie...
                </span>
              )}
              {!usernameValidation.loading &&
                usernameValidation.valid !== null && (
                  <span
                    className={`validation-message ${
                      usernameValidation.valid ? "valid" : "invalid"
                    }`}
                  >
                    {usernameValidation.message}
                  </span>
                )}
              <label htmlFor="registerEmail">Email</label>
              <input
                type="email"
                id="registerEmail"
                placeholder="Podaj adres email"
                required
                onChange={(e) => validateEmail(e.target.value)}
              />
              {emailValidation.loading && (
                <span className="validation-message loading">
                  Sprawdzanie...
                </span>
              )}
              {!emailValidation.loading && emailValidation.valid !== null && (
                <span
                  className={`validation-message ${
                    emailValidation.valid ? "valid" : "invalid"
                  }`}
                >
                  {emailValidation.message}
                </span>
              )}
              <label htmlFor="registerPassword">Hasło</label>
              <input
                type="password"
                id="registerPassword"
                placeholder="Podaj hasło"
                required
                onChange={(e) => validatePassword(e.target.value)}
              />
              {passwordValidation.valid === false && (
                <div className="validation-message invalid">
                  {passwordValidation.message}
                </div>
              )}
              <label htmlFor="registerPasswordreplace">Powtórz hasło</label>
              <input
                type="password"
                id="registerPasswordreplace"
                placeholder="Podaj ponownie hasło"
                required
                onChange={(e) => checkPasswordsMatch(e.target.value)}
              />
              {passwordsMatch.valid === false && (
                <div className="validation-message invalid">
                  {passwordsMatch.message}
                </div>
              )}
              <br></br>
              <ReCAPTCHA
                sitekey="6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ"
                onChange={(val) => setCapVal(val)}
              />
              <button disabled={!capVal} className="login-button">
                Zarejestruj
              </button>
            </form>
            <div className="signup-redirect">
              <p>
                Masz już konto?{" "}
                <a href="/home" onClick={isLogged}>
                  Zaloguj się
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
