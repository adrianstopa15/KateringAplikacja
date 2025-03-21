import posilekImage from "./photos/posilek1.png";
import posilekImage2 from "./photos/posilek2.png";
import posilekImage3 from "./photos/posilek3.png";
import posilekImage4 from "./photos/posilek4.png";
import filters from "./photos/filters.gif";
import alistar from "./photos/alistar.gif";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import dietuzjemLogo from "./photos/logo.png";
import RegistrationPopup from "./registrationPopup";
import LoginPopup from "./loginPopup";
import ProfilePage from "./profilePages";
import UserPanel from "./userPanel/userPanel";

import MenuListComposition from "./MenuListComposition";

export default function MainPage() {

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const promotionsRef = useRef(null);
  const profilesRef = useRef(null);
  const contactRef = useRef(null);
  const cooperationButtonRef = useRef(null);
  const callToActionRef = useRef(null);
  const [popupType, setPopupType] = useState("none");
  const [showUserPanel, setUserPanel] = useState(false);
  const navigateToProfile = () => setUserPanel(true);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFirstLogin = () => {
    setShowProfilePage(true);
  };

  useEffect(() => {
    const getCookieValue = (name) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    const authToken = getCookieValue("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === callToActionRef.current) {
              entry.target.classList.add("fadeIn");
            } else if (entry.target === cooperationButtonRef.current) {
              entry.target.classList.add("slideIn");
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (callToActionRef.current) {
      observer.observe(callToActionRef.current);
    }
    if (cooperationButtonRef.current) {
      observer.observe(cooperationButtonRef.current);
    }

    return () => {
      if (callToActionRef.current) {
        observer.unobserve(callToActionRef.current);
      }
      if (cooperationButtonRef.current) {
        observer.unobserve(cooperationButtonRef.current);
      }
    };
  }, []);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    togglePopup("none");
  };

  const togglePopup = (type) =>
    setPopupType(type === popupType ? "none" : type);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProfileCompletion = () => {
    console.log("Profile completed");
    setShowProfilePage(false); 
  };

  if(showUserPanel) {
    return <UserPanel />;
  }
  if(showProfilePage) {
    return <ProfilePage onCompleted={handleProfileCompletion} />;
  }

  return (
    <div className="main-page" ref={homeRef}>
      {popupType === "login" && (
        <LoginPopup
          onClose={() => togglePopup("none")}
          onToggleToRegister={() => togglePopup("register")}
          onFirstLogin={onFirstLogin}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {popupType === "register" && (
        <RegistrationPopup
          onClose={() => togglePopup("none")}
          onToggleToLogin={() => togglePopup("login")}
        />
      )}

      <div className="top-bar">
        <div className="top-bar-container">
          <div className="left-section">
            <img
              src={dietuzjemLogo}
              alt="DieTuzjem Logo"
              className="logo-image"
            />
            <p className="logo">DieTuzjem</p>
          </div>
          <div className="menu-links">
            <p onClick={() => scrollToRef(homeRef)}>Główna</p>
            <p onClick={() => scrollToRef(aboutRef)}>Opis</p>
            <p onClick={() => scrollToRef(promotionsRef)}>Promocje</p>
            <p onClick={() => scrollToRef(profilesRef)}>Profile</p>
            <p onClick={() => scrollToRef(contactRef)}>Kontakt</p>
          </div>
          <div className="right-section">
            {isLoggedIn ? (
              <MenuListComposition onNavigateToProfile={navigateToProfile} />
            ) : (
              <button
                className="button-regular--white"
                onClick={() => togglePopup("login")}
              >
                Zaloguj
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mid">
        <div className="mid-container--left">
          <h1 className="h1-regular">
            Jedz pyszne spersonalizowane posiłki oraz zbuduj zdrową sylwetkę!
          </h1>
          <h2 className="h2-regular">
            Dzięki zbilansowanym i zdrowym posiłkom które są sprecyzowane
            specjalnie dla Ciebie i Twoich potrzeb zbudujesz zdrową i silną
            sylwetkę!
          </h2>

          <button id="button-check" className="button-regular-l">
            Sprawdź <span class="arrow">&#x2192;</span>
          </button>
        </div>
        <div className="mid-container--right">
          <img src={posilekImage2} alt="Posiłek2" className="posilek2" />
          <img src={posilekImage} alt="Posiłek" className="posilek1" />
          <img src={posilekImage3} alt="Posiłek" className="posilek3" />
        </div>
      </div>
      <div className="mid-second" ref={aboutRef}>
        <div className="mid-second--left">
          <img
            src={posilekImage4}
            alt="Posiłek4"
            className="posilek4"
            style={{ marginLeft: "2rem" }}
          />
        </div>
        <div className="mid-second--right">
          <h1 className="h1-regular">Sam wybierasz skąd zamawiasz! </h1>
          <h2
            className="h2-regular"
            style={{ marginRight: "14rem", marginTop: "1rem" }}
          >
            Przejrzyj oferty kateringów dostępnych na naszej stronie i wybierz z
            którego chcesz skorzystać. Każdy katering ma coś w sobie, użyj
            filtrów i znajdź swój ulubiony!
            <p></p>
            <button className="button-regular">Nasze Kateringi</button>
            <img src={filters} alt="filters" />
          </h2>
        </div>
      </div>
      <div className="mid-third" ref={promotionsRef}>
        <div className="mid-third--left">
          <h1 className="h1-regular">Zniżki dla stałych klientów</h1>
          <h2
            className="h2-regular"
            style={{ marginTop: "1rem", marginRight: "10rem" }}
          >
            Szanujemy naszych stałych klientów, dlatego w podziękowaniu za Wasze
            zaufanie oferujemy zniżki zależne od ilości zamówień. Oprócz
            regularnych promocji, okazjonalnie pojawiać się będą również nowe
            promocję.
          </h2>
          <button className="button-regular">Aktualne Promocje</button>
        </div>

        <div className="mid-third--right">
          <div className="discount-container">
            <img src={alistar} alt="alistar" />
            <h3 className="h3-regular">
              Z kodem <p className="scribbles">"Alistar"</p> 20% zniżki na
              posiłki oraz diety zawierającę dania mięsne z Wołowiny.
            </h3>
            <p className="text-copy">
              <i>Skopiuj kod do schowka</i>
            </p>
          </div>
        </div>
      </div>
      <div className="mid-fourth--all">
        <div className="mid-fourth--pre" ref={profilesRef}>
          <h1 className="h1-regular">Zdecyduj się na program dla siebie</h1>
        </div>
        <div className="mid-fourth">
          <div className="mid-fourth--left">
            <h2 className="h2-regular">Inteligentny profil</h2>
            <ul>
              <li>Zapisywanie kaloryczności, makrosładników, oraz kalorii </li>
              <li>Comiesięczne podsumowanie spożytych kalorii</li>
              <li>
                Inteligente propozycje kateringów względem aktualnych celów
              </li>
              <li>
                UI wzbogacone o porady dietetyczne, oraz ciekawostki związane z
                profilem użytkownika
              </li>
            </ul>

            <button className="button-regular--white">Inteligentny opis</button>
          </div>
          <div className="mid-fourth--right">
            <h2 className="h2-regular">Klasyczny profil</h2>
            <ul>
              <li>Zamawiaj dania bez zapisywania makrosładników na profilu </li>
              <li>Brak podsumowań profilu</li>
              <li>Standardowe filtrowanie kateringów</li>
              <li>Standardowy interfejs użytkownika</li>
              <br />
            </ul>
            <button className="button-regular--white">Klasyczny opis</button>
          </div>
        </div>
      </div>
      <div className="kontakt-container" ref={contactRef}>
        <div className="kontakt-container--pre"></div>
        <div className="kontakt-container--main">
          <div className="kontakt-container--main---text">
            <h1
              className="h1-regular"
              style={{
                // color: "white",
                paddingTop: "5rem",
              }}
            >
              Posiadasz własny katering?
            </h1>
          </div>
          <h2
            ref={callToActionRef}
            className="h2-regular"
            style={{ textAlign: "center", fontSize: "28px", opacity: "0" }}
          >
            Nie zwlekaj i zgłoś się już dziś!
          </h2>
          <button
            ref={cooperationButtonRef}
            className="button-regular"
            style={{ marginTop: "4.5rem", opacity: "0" }}
          >
            Zasady Współpracy
          </button>
        </div>
      </div>
      <footer style={{ textAlign: "center" }}>
        ©2024 DieTuzjem Katering Dietetyczny. Wszystkie prawa zastrzeżone.
        Treści, grafiki oraz inne elementy zawarte na tej stronie internetowej
        są chronione prawem autorskim i stanowią własność{" "}
        <i>DieTuzjem Katering Dietetyczny</i>. Jakiekolwiek nieautoryzowane
        użycie, reprodukcja, dystrybucja, publikacja lub modyfikacja
        jakichkolwiek materiałów bez uprzedniej pisemnej zgody właścicieli jest
        surowo zabroniona i może skutkować odpowiedzialnością cywilną oraz
        karną.
      </footer>
    </div>
  );
}
