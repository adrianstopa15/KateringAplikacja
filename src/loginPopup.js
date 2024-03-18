import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
//6LeQeZopAAAAAAlHABkaNzSJXLcAq9x1DxdflXWJ

export default function LoginPopup({ onClose }) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!capVal) {
      alert("Proszę potwierdzić, że nie jesteś robotem.");
      return;
    }

    const userData = {
      login: document.getElementById("name").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value,
    };

    const apiEndpoint = "http://localhost:8080/add";

    try {
      // Wysyłanie żądania POST do backendu
      const response = await axios.post(apiEndpoint, userData);
      console.log("Odpowiedź z serwera:", response.data);
      alert("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
      onClose();
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

  // Funkcje walidacyjne
  const validateUsername = async (username) => {
    if (!username.trim()) {
      setUsernameValidation({ loading: false, valid: null, message: "" });
      return;
    }
    setUsernameValidation({ loading: true, valid: null, message: "" });
    try {
      // url do api sprawdzajacy czy jest taki login
      const response = await axios.get(
        `/api/username-check?username=${username}`
      );
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
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailValidation({
        loading: false,
        valid: false,
        message: "Niepoprawny format adresu e-mail",
      });
      return;
    }
    try {
      // url do api sprzawdzajaca czy jest taki email
      const response = await axios.get(`/api/email-check?email=${email}`);
      setEmailValidation({
        loading: false,
        valid: response.data.isAvailable,
        message: response.data.isAvailable
          ? "Adres e-mail jest dostępny"
          : "Adres e-mail jest już używany",
      });
    } catch (error) {
      setEmailValidation({
        loading: false,
        valid: false,
        message: "Błąd przy sprawdzaniu adresu e-mail",
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
