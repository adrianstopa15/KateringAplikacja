import { useState } from "react";

export default function LoginPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  function isLogged(e) {
    e.preventDefault();
    setIsLogin(!isLogin);
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
            <form className="login-form">
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
                <a href="#" className="forgot-password">
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
                <a href="#" onClick={isLogged}>
                  Zarejestruj się
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="popup-header">
              <h2>Rejestracja</h2>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <form className="login-form">
              <label htmlFor="name">Nazwa Użytkownika</label>
              <input
                type="name"
                id="name"
                placeholder="Podaj Nazwe Użytkownika"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Podaj adres email"
                required
              />
              <label htmlFor="phoneNumber">Numer telefonu</label>
              <input
                type="phoneNumber"
                id="phoneNumber"
                placeholder="Podaj numer telefonu"
              />

              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                id="password"
                placeholder="Podaj hasło"
                required
              />
              {/* //TODO: Tutaj jak cos trzeba dodac powtorz haslo i zrobic tak zeby jakos walidowało czy jest takie samo jak przy pierwszym podawaniu hasła  */}
              {/* Ogolnie poprobowac zrobic rozne walidacje, captcha itp  */}
              <button type="submit" className="login-button">
                Zarejestruj
              </button>
            </form>
            <div className="signup-redirect">
              <p>
                Masz już konto?{" "}
                <a href="#" onClick={isLogged}>
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
