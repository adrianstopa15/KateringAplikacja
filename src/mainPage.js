import posilekImage from "./photos/posilek1.png";
import posilekImage2 from "./photos/posilek2.png";
import posilekImage3 from "./photos/posilek3.png";
export default function MainPage() {
  return (
    <div className="main-page">
      <div className="top-bar">
        <div className="top-bar-container">
          <p className="logo">Tuziem</p>

          <p>Home</p>
          <p>About</p>
          <p>Specials</p>
          <p>Contact</p>

          <button>LOG IN</button>
        </div>
      </div>
      <div className="mid">
        <div className="mid-container-left">
          <h1>
            Jedz pyszne spersonalizowane posiłki oraz zbuduj zdrową sylwetkę!
          </h1>
          <h2>
            Dzięki zbilansowanym i zdrowym posiłkom, które są sprecyzowane
            specjalnie dla Ciebie i Twoich potrzeb zbudujesz zdrową i silną
            sylwetkę!
          </h2>

          <button id="button-check">Sprawdź</button>
        </div>
        <div className="mid-container-right">
          <img src={posilekImage2} alt="Posiłek2" className="posilek2" />
          <img src={posilekImage} alt="Posiłek" className="posilek1" />
          <img src={posilekImage3} alt="Posiłek" className="posilek3" />
        </div>
      </div>
    </div>
  );
}
