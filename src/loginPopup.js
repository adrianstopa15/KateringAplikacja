import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

// klucz do recapcha: 6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ

export default function LoginPopup({ onClose }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formKey, setFormKey] = useState(0);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [capVal, setCapVal] = useState(null);
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
// Po przycisku zarejestruj
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!capVal) {
      alert("Proszę potwierdzić, że nie jesteś robotem.");
      return;
    }
// Do zrobienia jeszcze blokada rejestracji uzytkownika z innym loginem ale na ten sam email 
// Sprawdzenie, czy walidacje są poprawne
    let errorMessage = [];

    if (usernameValidation.valid === false) {
      errorMessage.push('Nazwa użytkownika jest użyta!');
    }

    if (emailValidation.valid === false) {
      errorMessage.push('Email jest już używany!');
    }

    // Sprawdzenie, czy istnieją jakiekolwiek błędy
    if (errorMessage.length > 0) {
      // Tworzenie komunikatu z listy błędów
      const formattedMessage = errorMessage.join(' i ');
      alert(`Nie można zarejestrować: ${formattedMessage}.`);
      return; // Zatrzymaj rejestrację, jeśli walidacja nie powiodła się
    }

    const userData = {
      login: document.getElementById("name").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };

    const apiEndpoint = "http://localhost:8080/register";

    try {
      const response = await axios.post(apiEndpoint, userData);
      console.log("Odpowiedź z serwera:", response.data);
      setShowSuccessAlert(true); // Pokaż alert o sukcesie
      setTimeout(() => setShowSuccessAlert(false), 5000); // Opcjonalnie, ukryj alert po 5 sekundach
      setIsLogin(true); // Przełączanie na ekran logowania
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.status === 400) {
          alert(error.response.data); // "Użytkownik o podanej nazwie już istnieje"
        } else {
          alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
        }
      } else {
        alert("Nie udało się połączyć z serwerem.");
      }
      console.error("Błąd rejestracji:", error);
    }
    return (
      <div className="login-popup-container">
        {showSuccessAlert && (
          <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
            Rejestracja zakończona sukcesem. Możesz się teraz zalogować!
          </Alert>
        )}
      </div>
    );
  }

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
            <div className="popup-header">
              <h2>Logowanie</h2>
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
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                placeholder="Podaj hasło"
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
                {/* tutaj trzeba zrobic obsluge dzialania przypominania hasla ale to jak bedzie baza  */}
              </div>
              <button type="submit" className="login-button">
                Zaloguj
              </button>
            </form>

            <div className="signup-redirect">
              <p>
                Nie masz jeszcze konta?{" "}
                <a href="/home" onClick={isLogged}>
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
