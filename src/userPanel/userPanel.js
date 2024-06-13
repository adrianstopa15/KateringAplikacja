import UserData from "./userData";
import UserDiscounts from "./userDiscounts";
import UserOrders from "./userOrders";
import UserPreferences from "./userPreferences";
import UserStats from "./userStats";
import DaneUzytkownika from "../photos/DaneUzytkownika.svg";
import Panel from "../photos/Panel.png";
import Preferencje from "../photos/Preferencje.png";
import Promocje from "../photos/Promocje.png";
import Statystyki from "../photos/Statystyki.png";
import Zamowienia from "../photos/Zamowienia.png";
import Powiadomienia from "../photos/Powiadomienia.png"
import Company from "../photos/Company.png"
import Adress from "../photos/Adress.png"
import Zatwierdzenia from "../photos/Zatwierdzenia.png"
import Dieta from "../photos/Dieta.png"
import TypeDiet from "../photos/TypeDiet.png"
import Meals from "../photos/Meals.png"
import DietMenu from "../photos/DietMenu.png"
import "../userPanelStyle.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import dietuzjemLogo from "../photos/logo.png";
import AdminAdresses from "./Admin/adminAdresses";
import AdminList from "./Admin/adminList";
import AdminConfirmations from "./Admin/adminConfirmations";
import AdminNotifications from "./Admin/adminNotifications";
import AdminSettings from "./Admin/adminSettings";
import CateringNotifications from './Catering/cateringNotifications'
import CateringRequests from './Catering/cateringRequests'
import CateringAdd from "./Catering/cateringAdd";
import CateringPresets from "./Catering/cateringPresets";
import AdminAdressesCompany from "./Admin/adminAdressesCompany";
import AdminListCompany from "./Admin/adminListCompany";
import AdminDietType from "./Admin/adminDietType";
import CateringTypeDiet from "./Catering/cateringTypeDiet";


export default function UserPanel() {

  const [activeComponent, setActiveComponent] = useState("UserData");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCookieValue = (name) =>
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
    const authToken = getCookieValue("authToken");
    const decodedToken = jwtDecode(authToken);
    console.log(authToken);
    const login = decodedToken.sub;
  
    if (authToken) {
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
        navigate('/'); 
      });
    } else {
      navigate('/'); 
    }
  }, [navigate]);

  const renderComponent = () => {
    if (userRole === 'ADMIN') {
      switch (activeComponent) {
        case "AdminAdresses":
          return <AdminAdresses />;
        case "AdminAdressesCompany":
          return <AdminAdressesCompany />;
        case "AdminNotifications":
          return <AdminNotifications />;
        case "AdminConfirmations":
          return <AdminConfirmations />;
        case "AdminList":
          return <AdminList />;
        case "AdminListCompany":
          return <AdminListCompany />;
        case "AdminSettings":
          return <AdminSettings />;
        case "AdminDietType":
          return <AdminDietType />;
        default:
          return <AdminAdresses />;
      }
    } else if (userRole === 'COMPANY') {
      switch (activeComponent) {
        case "CateringNotifications":
          return <CateringNotifications />;
        case "CateringRequests":
          return <CateringRequests />;
        case "CateringAdd":
          return <CateringAdd />
        case "CateringPresets":
          return <CateringPresets />
        case "CateringTypeDiet":
          return <CateringTypeDiet />
        default:
          return <CateringNotifications />;
      }
    } else {
      switch (activeComponent) {
        case "UserData":
          return <UserData />;
        case "UserPreferences":
          return <UserPreferences />;
        case "UserStats":
          return <UserStats />;
        case "UserOrders":
          return <UserOrders />;
        case "UserDiscounts":
          return <UserDiscounts />;
        default:
          return <UserData />;
      }
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="left-section" onClick={() => navigate('/')}>
          <img src={dietuzjemLogo} alt="DieTuzjem Logo" className="logo-image" style={{cursor: 'pointer'}} />
          <p className="logo" style={{cursor: 'pointer'}}>DieTuzjem</p>
        </div>
      </div>
    <div className="panel-main--container">
      <div className="panel-container">
        <div className="left-bar">
        {userRole === 'ADMIN' && (
              <>
                <a
            className={`left-bar--content mt-sm ${
              activeComponent === "AdminAdresses"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminAdresses")}
          >
            <img src={Adress} className="lb-icons" />
            Adresy Użytkowników
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminAdressesCompany"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminAdressesCompany")}
          >
            <img src={Company} className="lb-icons" />
            Adresy Firm
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminList"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminList")}
          >
            <img src={DaneUzytkownika} className="lb-icons" />
            Lista Użytkowników
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminListCompany"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminListCompany")}
          >
            <img src={DaneUzytkownika} className="lb-icons" />
            Lista Firm
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminConfirmations"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminConfirmations")}
          >
            <img src={Zatwierdzenia} className="lb-icons" />
            Zatwierdzenia
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminNotifications"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminNotifications")}
          >
            <img src={Powiadomienia} className="lb-icons" />
            Powiadomienia
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminSettings"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminSettings")}
          >
            <img src={Zamowienia} className="lb-icons" />
            Ustawienia
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "AdminDietType"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminDietType")}
          >
            <img src={Dieta} className="lb-icons" />
            Typy diet
          </a>
              </>
            )}
        {userRole === 'COMPANY' && (
              <>
              <a
          className={`left-bar--content mt-sm ${
            activeComponent === "CateringNotifications"
              ? "lb-active" && "lb-icons--active"
              : ""
          }`}
          onClick={() => setActiveComponent("CateringNotifications")}
        >
          <img src={DaneUzytkownika} className="lb-icons" />
          Pierwsza zakladka katering
        </a>
        <a
          className={`left-bar--content ${
            activeComponent === "CateringRequests"
              ? "lb-active" && "lb-icons--active"
              : ""
          }`}
          onClick={() => setActiveComponent("CateringRequests")}
        >
          <img src={TypeDiet} className="lb-icons" />
          Wnioski
        </a>
        <a
          className={`left-bar--content ${
            activeComponent === "CateringAdd"
              ? "lb-active" && "lb-icons--active"
              : ""
          }`}
          onClick={() => setActiveComponent("CateringAdd")}
        >
          <img src={Meals} className="lb-icons" />
          Dodaj jedzenie
        </a>
        <a
          className={`left-bar--content ${
            activeComponent === "CateringPresets"
              ? "lb-active" && "lb-icons--active"
              : ""
          }`}
          onClick={() => setActiveComponent("CateringPresets")}
        >
          <img src={DietMenu} className="lb-icons" />
          Posiłki
        </a>
        <a
            className={`left-bar--content ${
              activeComponent === "CateringTypeDiet"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("CateringTypeDiet")}
          >
            <img src={Dieta} className="lb-icons" />
            Nasze diety
          </a>
       
            </>
            )}
            {userRole === 'USER' && (
              <>
          <a
            className={`left-bar--content mt-sm ${
              activeComponent === "UserData"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("UserData")}
          >
            <img src={DaneUzytkownika} className="lb-icons" />
            Dane użytkownika
          </a>

          <a
            className={`left-bar--content ${
              activeComponent === "UserPreferences"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("UserPreferences")}
          >
            <img src={Preferencje} className="lb-icons" />
            Preferencje
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "UserStats"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("UserStats")}
          >
            <img src={Statystyki} className="lb-icons" />
            Statystyki
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "UserOrders"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("UserOrders")}
          >
            <img src={Zamowienia} className="lb-icons" />
            Zamówienia
          </a>
          <a
            className={`left-bar--content ${
              activeComponent === "UserDiscounts"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("UserDiscounts")}
          >
            <img src={Promocje} className="lb-icons" />
            Kody promocyjne
          </a>
              </>
          )}
        </div>
        <div className="main-content">{renderComponent()}</div>
      </div>
    </div>
  </div>
  );
}
