export default function LoginPopup({ onClose }) {
  return (
    <div className="login-popup-container">
      <div className="popup-background" onClick={onClose}></div>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
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
          </div>

          <button type="submit" className="login-button">
            Zaloguj
          </button>
        </form>

        <div className="signup-redirect">
          <p>
            Nie masz jeszcze konta? <a href="#">Zarejestruj się</a>
          </p>
        </div>
      </div>
    </div>
  );
}
