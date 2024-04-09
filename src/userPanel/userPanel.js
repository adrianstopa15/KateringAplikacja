import UserData from "./userData";
import UserDiscounts from "./userDiscounts";
import UserOrders from "./userOrders";
import UserPreferences from "./userPreferences";
import UserStats from "./userStats";
import DaneUzytkownika from "../photos/DaneUzytkownika.png";
import Panel from "../photos/Panel.png";
import Preferencje from "../photos/Preferencje.png";
import Promocje from "../photos/Promocje.png";
import Statystyki from "../photos/Statystyki.png";
import Zamowienia from "../photos/Zamowienia.png";
import "../userPanelStyle.css";
import { useState } from "react";

export default function UserPanel() {
  const [activeComponent, setActiveComponent] = useState("UserData");

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
    <div className="panel-main--container">
      <div className="panel-header"></div>
      <div className="panel-container">
        <div className="left-bar">
          <h2 className="lb-name">
            <img src={Panel} className="lb-icons" style={{ width: "2.5rem" }} />
            Panel
          </h2>
          <a
            className="left-bar--content"
            onClick={() => setActiveComponent("UserData")}
          >
            <img src={DaneUzytkownika} className="lb-icons" />
            Dane użytkownika
          </a>
          <a
            className="left-bar--content"
            onClick={() => setActiveComponent("UserPreferences")}
          >
            <img src={Preferencje} className="lb-icons" />
            Preferencje
          </a>
          <a
            className="left-bar--content"
            onClick={() => setActiveComponent("UserStats")}
          >
            <img src={Statystyki} className="lb-icons" />
            Statystyki
          </a>
          <a
            className="left-bar--content"
            onClick={() => setActiveComponent("UserOrders")}
          >
            <img src={Zamowienia} className="lb-icons" />
            Zamówienia
          </a>
          <a
            className="left-bar--content"
            onClick={() => setActiveComponent("UserDiscounts")}
          >
            <img src={Promocje} className="lb-icons" />
            Kody promocyjne
          </a>
        </div>
        <div className="main-content">{renderComponent()}</div>
      </div>
    </div>
  );
}
