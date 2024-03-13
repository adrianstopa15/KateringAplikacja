import posilekImage from "./photos/posilek1.png";
import posilekImage2 from "./photos/posilek2.png";
import posilekImage3 from "./photos/posilek3.png";
import posilekImage4 from "./photos/posilek4.png";
import filters from "./photos/filters.gif";
import discount from "./photos/discount.png";
import alistar from "./photos/alistar.gif";
import { useState } from "react";
import LoginPopup from "./loginPopup";
export default function MainPage() {
  const [popupActive, setPopupActive] = useState(false);
  const togglePopup = () => setPopupActive(!popupActive);

  return (
    <div className="main-page">
      {popupActive && <LoginPopup onClose={togglePopup} />}
      <div className="top-bar">
        <div className="top-bar-container">
          <p className="logo">DieTuzjem</p>

          <p>Główna</p>
          <p>Opis</p>
          <p>Promocje</p>
          <p>Profile</p>
          <p>Kontakt</p>

          <button className="button-regular--white" onClick={togglePopup}>
            Zaloguj
          </button>
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
      <div className="mid-second">
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
      <div className="mid-third">
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
        <div className="mid-fourth--pre">
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
      <div className="kontakt-container">
        <div className="kontakt-container--pre"></div>
        <div className="kontakt-container--main"></div>
      </div>
      <footer></footer>
    </div>
  );
}
