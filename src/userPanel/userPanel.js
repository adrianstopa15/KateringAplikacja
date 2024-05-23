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

export default function UserPanel() {
  const [activeComponent, setActiveComponent] = useState("UserData");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

// Tutaj dodać pozniej jak beda role z backendu zaleznie od roli jakie komponenty maja sie wyswietlac dla usera albo admina albo kateringu
// szkielety komponentow juz sa gotowe w folderach 

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
        case "AdminNotifications":
          return <AdminNotifications />;
        case "AdminAdresses":
          return <AdminAdresses />;
        case "AdminConfirmations":
          return <AdminConfirmations />;
        case "AdminList":
          return <AdminList />;
        case "AdminSettings":
          return <AdminSettings />;
        default:
          return <AdminNotifications />;
      }
    } else if (userRole === 'COMPANY') {
      switch (activeComponent) {
        case "CateringNotifications":
          return <CateringNotifications />;
        case "CateringRequests":
          return <CateringRequests />;
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
            <img src={DaneUzytkownika} className="lb-icons" />
            Adresy Użytkownikow
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
            Lista użytkownikow
          </a>

          <a
            className={`left-bar--content ${
              activeComponent === "AdminConfirmations"
                ? "lb-active" && "lb-icons--active"
                : ""
            }`}
            onClick={() => setActiveComponent("AdminConfirmations")}
          >
            <img src={Preferencje} className="lb-icons" />
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
            <img src={Statystyki} className="lb-icons" />
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
              </>
            )}
            {userRole === 'COMPANY' && (
              <>
                {/* Catering specific menu items */}
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
