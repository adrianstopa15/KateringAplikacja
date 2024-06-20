import React, { useState, useRef, useEffect } from "react";
import posilekImage from "./photos/posilek1.png";
import posilekImage2 from "./photos/posilek2.png";
import posilekImage3 from "./photos/posilek3.png";
import posilekImage4 from "./photos/posilek4.png";
import filters from "./photos/filters.gif";
import alistar from "./photos/alistar.gif";
import dietuzjemLogo from "./photos/logo.png";
import RegistrationPopup from "./registrationPopup";
import LoginPopup from "./loginPopup";
import SimplifiedProfilePage from "./simplifiedProfilePage";
import ProfilePage from "./profilePages";
import MenuListComposition from "./MenuListComposition";
import Modal from "./modalbutton/Modal"; 
import parowkizubr from "./photos/parowkizubr.png";
import zdjpromki from "./photos/zdjpromki.png"
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import axios from "axios";
import CateringForm from "./cateringForm";
import { useAlertModal } from "./modalbutton/AlertModalContext";
import OrderPlace from "./orderPlace";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { jwtDecode } from "jwt-decode";
export default function MainPage() {
  const MySwal = withReactContent(Swal);
  const { showAlertModal } = useAlertModal();
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const promotionsRef = useRef(null);
  const profilesRef = useRef(null);
  const contactRef = useRef(null);
  const cooperationButtonRef = useRef(null);
  const callToActionRef = useRef(null);
  const [userRole, setUserRole] = useState(null);
  // const [popupType, setPopupType] = useState("none");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "", iframeSrc: "" });
  const { 
    housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
    currentEdit, setCurrentEdit, handleEdit, onEdit,
    editAddressIndex, setEditAddressIndex, handleDelete, houseNumber, setHouseNumber, email, setEmail,
   dietType, setDietType,companyName, setCompanyName, description, setDescription, nip, setNip, togglePopup, popupType, setPopupType } = useAuth();

   useEffect(() => {
    const getCookieValue = (name) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    const authToken = getCookieValue("authToken");

    if (authToken) {
      try {
        const decodedToken = jwtDecode(authToken);
        const login = decodedToken.sub;

        axios.get(`http://localhost:8080/getRole?login=${login}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        .then(response => {
          if (response.data) {
            console.log(response.data);
            setUserRole(response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    } else {
      console.error('No auth token found');
    }
  }, []);


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
    const callToActionRefCurrent = callToActionRef.current;
    const cooperationButtonRefCurrent = cooperationButtonRef.current;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === callToActionRefCurrent) {
              entry.target.classList.add("fadeIn");
            } else if (entry.target === cooperationButtonRefCurrent) {
              entry.target.classList.add("slideIn");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    if (callToActionRefCurrent) {
      observer.observe(callToActionRefCurrent);
    }
    if (cooperationButtonRefCurrent) {
      observer.observe(cooperationButtonRefCurrent);
    }
  
    return () => {
      if (callToActionRefCurrent) {
        observer.unobserve(callToActionRefCurrent);
      }
      if (cooperationButtonRefCurrent) {
        observer.unobserve(cooperationButtonRefCurrent);
      }
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    togglePopup("none");
  };

  // const togglePopup = (type) => setPopupType(type === popupType ? "none" : type);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      MySwal.fire({
        position: "top",
        title: 'Sukces!',
        text: 'Skopiowano kod do schowka.',
        icon: 'success',
        confirmButtonText: 'OK',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch(err => {
      console.log('Coś poszło nie tak', err);
    });
  };

  const handleOpenModal = (title, content = "", iframeSrc = "", isCatering = false, isPromotions = false, isCooperation = false, isOrderPlace = false) => {
    if (isCatering) {
      setModalData({
        isOpen: true,
        title,
        content: (
          <div>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <img src="https://cateromarket.pl/media/diet-photo/400x270_Odchudzaj%C4%85ca.webp" alt="Catering 1" style={{ width: "250px", marginRight: "20px" }} />
              <div>
                <h3>Dieta Pomidor - Odchudzająca</h3>
                <p>Dieta, która jest nie tylko skuteczna, ale także smaczna i sycąca...</p>
                <p><b>1000 - 2500 kcal</b> · Dietetyk</p>
                <p>Zamów do <b>07:00</b> aby otrzymać za <b>4 dni</b></p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#66bb6a" }}>66%</span>
                  <div style={{ marginLeft: "10px" }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: "#ffb400" }}>&#9733;</span>
                    ))}
                    <span>(6)</span>
                  </div>
                </div>
                <p><b>od 42,0 zł / dzień</b></p>
                <button className="button-regular">Wybierz</button>
              </div>
            </div>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <img src="https://cateromarket.pl/media/diet-photo/odchudzanie.webp" alt="Catering 2" style={{ width: "250px", marginRight: "20px" }} />
              <div>
                <h3>Mój Catering - Standard</h3>
                <p>Witaj w świecie Mój Catering!...</p>
                <p><b>1200 - 2500 kcal</b> · Opcjonalna BIO</p>
                <p>Zamów do <b>12:00</b> aby otrzymać za <b>2 dni</b></p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#66bb6a" }}>97%</span>
                  <div style={{ marginLeft: "10px" }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: "#ffb400" }}>&#9733;</span>
                    ))}
                    <span>(251)</span>
                  </div>
                </div>
                <p><b>od 66,27 zł / dzień</b></p>
                <button className="button-regular">Wybierz</button>
              </div>
            </div>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <img src={parowkizubr} alt="Catering 3" style={{ width: "250px", marginRight: "20px" }} />
              <div>
                <h3>Studencki Catering - Masa</h3>
                <p>Zestaw na Masę – to pakiet wysokokalorycznych produktów idealnie połączonych ze sobą, poczuj się jak prawdziwy student.</p>
                <p><b>1500 - 2000 kcal</b> · Opcjonalny z 4-pak</p>
                <p>Zamów do <b>21:00 (jutro)</b> aby otrzymać za <b>1 dzień</b></p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ color: "#66bb6a" }}>93%</span>
                  <div style={{ marginLeft: "10px" }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: "#ffb400" }}>&#9733;</span>
                    ))}
                    <span>(128)</span>
                  </div>
                </div>
                <p><b>od 16,60 zł / dzień</b></p>
                <button className="button-regular">Wybierz</button>
              </div>
            </div>
          </div>
        ),
        iframeSrc: "",
      });
    } else if (isPromotions) {
      setModalData({
        isOpen: true,
        title,
        content: (
          <div>
            <h3>Skorzystaj z promocji już dziś</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={zdjpromki} alt="Promocja 1" style={{ marginRight: '20px' }} />
                <div>
                  <h4>Promocja na Dięta Pomidor</h4>
                  <p>20% zniżki na wszystkie diety odchudzające.</p>
                  <p><b>Kod: DIETA20</b></p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={zdjpromki} alt="Promocja 2" style={{ marginRight: '20px' }} />
                <div>
                  <h4>Promocja na Mój Catering</h4>
                  <p>10% zniżki na diety standardowe.</p>
                  <p><b>Kod: STANDARD10</b></p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={zdjpromki} alt="Promocja 3" style={{ marginRight: '20px' }} />
                <div>
                  <h4>Promocja na Mój Catering - Odchudzanie</h4>
                  <p>15% zniżki na diety niskokaloryczne.</p>
                  <p><b>Kod: SLIM15</b></p>
                </div>
              </div>
            </div>
          </div>
        ),
        iframeSrc: "",
      });
    } else if (isCooperation) {
      setModalData({
        isOpen: true,
        title,
        content: (
          <div>
           
            <p>Jeśli jesteś firmą kateringową i chcesz dołączyć do naszej platformy, musisz spełnić następujące wymagania:</p>
            <ul>
              <li>Posiadać aktualne certyfikaty sanitarne.</li>
              <li>Oferować różnorodne diety zgodne z naszymi standardami.</li>
              <li>Gwarantować świeżość i wysoką jakość produktów.</li>
              <li>Zapewniać terminowe dostawy.</li>
              <li>Ważne jest aby katering zapewnił dokładne podanie makrosładników i kaloryczności.</li>
            </ul>
            <h3>Formularz Zgłoszeniowy</h3>
            {/* Tutaj zamiast wyświetlać ten formularz od razu, zrobic przycisk typu "wyslij podanie" i dopiero wtedy wyswietli sieb
            formularz wraz z przyciskiem wyślij: */}
           <CateringForm />

          </div>
        ),
        iframeSrc: "",
      });
    } 
    else if (isOrderPlace){
      if(userRole === 'USER')
      setModalData({
        isOpen: true,
        title,
        content: <OrderPlace/>,
        isframeSrc: "",
      })
      else{
        setModalData({
          isOpen: true,
          title,
          content: "Zaloguj się, aby zamówić posiłek",
          isframeSrc: "",
        })
      }
    }
    
    
    else {
      setModalData({ isOpen: true, title, content, iframeSrc });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      street,
      apartmentNumber,
      floor,
      postalCode,
      city,
      houseNumber,
      companyName,
      email,
      dietType,
      description,
      phone,
      
    };

    try {
      console.log(formData);
      console.log("ee");
      
      const response = await axios.post(
        `http://localhost:8080/addFirm`,
        formData
        
      );
  
    
      console.log('dodano pomyślnie:', response.data);
    } catch (error) {
  
      console.error('Failed to add firm:', error.response?.data || error.message);
    }
  };




  const handleCloseModal = () => {
    setModalData({ isOpen: false, title: "", content: "", iframeSrc: "" });
  };
  
  const handleNavigateToProfile = () => {
    navigate('/profile'); 
  };


  return (
    <div className="main-page" ref={homeRef}>
      {popupType === "login" && (
        <LoginPopup
          onClose={() => togglePopup("none")}
          onToggleToRegister={() => togglePopup("register")}
          onLoginSuccess={gSuccess}
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
            <img src={dietuzjemLogo} alt="DieTuzjem Logo" className="logo-image" />
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
              <MenuListComposition onNavigateToProfile={handleNavigateToProfile} />
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

          <button id="button-check" className="button-regular-l" onClick={() => handleOpenModal("Zamów posiłek", "", "", false, false, false, true)}>
            Zamów <span className="arrow">&#x2192;</span>
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
            <button className="button-regular" onClick={() => handleOpenModal("Nasze Kateringi", "", "", true)}>
              Nasze Kateringi
            </button>
            <img src={filters} alt="filters" />
          </h2>
        </div>
      </div>

      <Modal show={modalData.isOpen} onClose={handleCloseModal} title={modalData.title} iframeSrc={modalData.iframeSrc}>
        {modalData.content && <div>{modalData.content}</div>}
      </Modal>

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
            promocje.
          </h2>
          <button className="button-regular" onClick={() => handleOpenModal("Aktualne Promocje", "", "", false, true)}>
            Aktualne Promocje
          </button>
        </div>

        <div className="mid-third--right">
          <div className="discount-container">
            <img src={alistar} alt="alistar" />
            <h3 className="h3-regular">
              Z kodem <p className="scribbles">"Alistar"</p> 20% zniżki na
              posiłki oraz diety zawierającę dania mięsne z Wołowiny.
            </h3>
            <p className="text-copy" onClick={() => copyToClipboard("Alistar")}>
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
            onClick={() => handleOpenModal("Warunki Współpracy", "", "", false, false, true)}
            >
            Warunki Współpracy
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
      <Modal show={modalData.isOpen} onClose={handleCloseModal} title={modalData.title} iframeSrc={modalData.iframeSrc}>
        {modalData.content && <p>{modalData.content}</p>}
      </Modal>
    </div>
  );
}
