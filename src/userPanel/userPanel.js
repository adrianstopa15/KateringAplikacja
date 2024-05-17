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


export default function UserPanel() {
  const [activeComponent, setActiveComponent] = useState("UserData");
  const navigate = useNavigate();


  const renderComponent = () => {
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
        </div>
        <div className="main-content">{renderComponent()}</div>
      </div>
    </div>
  </div>
  );
}
