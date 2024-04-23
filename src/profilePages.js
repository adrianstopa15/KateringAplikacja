import { useEffect, useState } from "react";
import buildMuscles from "./photos/001-muscle.png";
import looseWeight from "./photos/002-lose-weight.png";
import keepWeight from "./photos/003-healthy.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext"

export default function ProfilePage(props) {

  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [weightIndicator, setWeightIndicator] = useState("");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [gender, setGender] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState("");
  // const [housing_type, setHousing_type] = useState("dom");
  // const [first_name, setFirstName] = useState("");
  // const [last_name, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [street, setStreet] = useState("");
  // const [apartment_number, setApartment_number] = useState("");
  // const [floor, setFloor] = useState("");
  // const [postal_code, setPostal_code] = useState("");
  // const [city, setCity] = useState("");
  const {  housing_type, setHousing_type,
    first_name, setFirst_name,
    last_name, setLast_name,
    phone, setPhone,
    street, setStreet,
    apartment_number, setApartment_number,
    floor, setFloor,
    postal_code, setPostal_code,
    city, setCity,} = useAuth();
  const handleStartClick = () => {
    setStep(2);
  };

  //  Dla sprawdzenia czy sie dobrze wpisuje:
  // useEffect(() => {
  //   console.log(`Imię zmienione na: ${first_name}`);
  // }, [first_name]);

  // useEffect(() => {
  //   console.log(`Nazwisko zmienione na: ${last_name}`);
  // }, [last_name]);

  // useEffect(() => {
  //   console.log(`Telefon zmieniony na: ${phone}`);
  // }, [phone]);

  // useEffect(() => {
  //   console.log(`Kod pocztowy zmieniony na: ${postal_code}`);
  // }, [postal_code]);

  // useEffect(() => {
  //   console.log(`miasto na:: ${city}`);
  // }, [city]);
  // useEffect(() => {
  //   console.log(`floor:: ${floor}`);
  // }, [floor]);

  // useEffect(() => {
  //   console.log(`Apartment number na: ${apartment_number}`);
  // }, [apartment_number]);
  // useEffect(() => {
  //   console.log(`Ulica na: ${street}`);
  // }, [street]);


  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (step < 7) {
      if (step === 2 && (!weight || !height)) {
        alert("Proszę podać wagę i wzrost!");
        return;
      }
      // Obliczenia BMI i przypisanie celu jeśli jest to odpowiedni krok
      if (step === 2 || step === 5) {
        const calculatedBMI = calculateBMI();
        const indicator = getWeightIndicator(calculatedBMI);
        setWeightIndicator(indicator);
      }

      setStep(step + 1);
    } else {
      if (
        !first_name ||
        !last_name ||
        !phone ||
        !street ||
        !postal_code ||
        !city
      ) {
        alert("Proszę wypełnić wszystkie wymagane pola.");
        return;
      }

      if (!postal_code.match(/^\d{2}-\d{3}$/)) {
        alert("Kod pocztowy musi być w formacie XX-XXX.");
        return;
      }

      const formData = {
        first_name,
        last_name,
        phone,
        street,
        apartment_number: +apartment_number, 
        floor: +floor, 
        postal_code,
        city,
        housing_type,
        bmi: bmi,
        weightIndicator: weightIndicator,
        selectedGoal: selectedGoal,
      };
      //do zrobienia!! :
      try {
        const getCookieValue = (name) =>
          document.cookie
            .split("; ")
            .find((row) => row.startsWith(name + "="))
            ?.split("=")[1];
        const authToken = getCookieValue("authToken");
        const decodedToken = jwtDecode(authToken);
        console.log(authToken);

        const login = decodedToken.sub;
        console.log(login);
        const response = await axios.post(
          `http://localhost:8080/edit?login=${login}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log("Odpowiedź z serwera:", response.data);
        
        if (props.onCompleted) {
          props.onCompleted();
          window.location.reload();
        } else {
          console.error('onCompleted function is not provided');
        }

      } catch (error) {
        console.error("Błąd przy wysyłaniu formularza:", error);
      }
    }
  };
  const calculateCalories = () => {
    let BMR;
    const PAL = parseFloat(activityLevel);

    if (gender === "woman") {
      BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    } else {
      BMR = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    }
    const totalCalories = BMR * PAL;
    return totalCalories;
  };

  useEffect(() => {
    if (bmi) {
      if (bmi < 18.5) {
        setSelectedGoal("gain");
      } else if (bmi > 25) {
        setSelectedGoal("lose");
      } else {
        setSelectedGoal("maintain");
      }
    }
  }, [bmi]);
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculateBMI = weight / (heightInMeters * heightInMeters);
    setBMI(calculateBMI);
    // if (!selectedGoal) {
    //   if (bmi < 18.5) {
    //     setSelectedGoal("gain");
    //   } else if (bmi > 25) {
    //     setSelectedGoal("lose");
    //   } else {
    //     setSelectedGoal("maintain");
    //   }
    // }
    return calculateBMI;
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };

  const getWeightIndicator = (bmi) => {
    if (bmi < 18.5) return <p className="mt-s t-red">niedowagę!</p>;
    if (bmi >= 18.5 && bmi < 25)
      return <p className="mt-s t-green">prawidłową.</p>;
    if (bmi >= 25 && bmi < 30) return <p className="mt-s t-orange">nadwagę!</p>;
    if (bmi >= 30) return <p className="mt-s t-red">otyłość.</p>;
  };
  const handleNextClick = (e) => {
    console.log(e);

    e.preventDefault();

    if (step === 4) {
      const calories = calculateCalories();
      setTotalCalories(calories);
      setStep(step + 1);
    } else {
      const calculatedBMI = calculateBMI();
      const indicator = getWeightIndicator(calculatedBMI);
      setWeightIndicator(indicator);
      setStep(step + 1);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-page--content">
        {step === 1 && (
          <div className="content-wrapper">
            <h1 className="mb-m">Witaj Imię!</h1>

            <p className="f-m">Jest to Twoje pierwsze logowanie</p>
            <p className="mt-sm f-s ">
              aby rozpocząć korzystanie z DieTuzjem, proszę opowiedz nam co
              nieco o sobie.
            </p>

            <div>
              <button className="button-27 mt-s" onClick={handleStartClick}>
                Zaczynajmy!
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="content-wrapper">
            <h3 className="mb-s">Jaka jest Twoja aktualna waga i wzrost?</h3>

            <div className="form1">
              <form onSubmit={handleSubmit} className="form1">
                <label>
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder="waga w kilogramach"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    max="570"
                    required
                  />
                </label>
                <label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    placeholder="Wzrost w centymetrach"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min="100"
                    max="251"
                  />
                </label>
                <select
                  value={gender}
                  name="gender"
                  id="gender"
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="woman">Kobieta</option>
                  <option value="man">Mężczyzna</option>
                </select>

                <button type="submit" className="button-27 mt-s">
                  Dalej
                </button>
              </form>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="content-wrapper">
            <h3 className="mb-m f-m">
              Twoje BMI wynosi: {bmi ? bmi.toFixed(2) : "Nie określono"}
            </h3>
            <h2>Twoje waga wygląda na: {weightIndicator}</h2>
            <button class="button-27 mt-s" onClick={handleNextClick}>
              Dalej
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="content-wrapper">
            <h3 className="mb-m f-m">Dobór kaloryczności diety</h3>
            <p className="mb-m">
              Jako Twój inteligentny asystent, proponuje Ci dobranie diety,
              która będzie dopasowana do Twoich potrzeb.
            </p>
            <p>
              Proszę o wybranie swojej średniej aktywności fizycznej, oraz
              wieku, aby lepiej dostosować kaloryczność Twojej diety:
              <form onSubmit={handleNextClick} className="form1 mt-s">
                <label>
                  <input
                    type="number"
                    value={age}
                    name="age"
                    id="age"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Podaj swój wiek"
                    required
                    min="16"
                    max="150"
                  />
                </label>
                <select
                  value={activityLevel}
                  name="activity"
                  id="activity"
                  onChange={(e) => setActivityLevel(e.target.value)}
                  required
                >
                  <option value="">Wybierz...</option>
                  <option value="1.2">Brak aktywności</option>
                  <option value="1.375">Lekka aktywność</option>
                  <option value="1.55">Umiarkowana aktywność</option>
                  <option value="1.725">Duża aktywność</option>
                  <option value="1.9">Bardzo duża aktywność</option>
                </select>
                <button type="submit" className="button-27 mt-s">
                  Dalej
                </button>
              </form>
            </p>
          </div>
        )}
        {step === 5 && (
          <div className="content-wrapper">
            <h2 className="mb-m">Zapotrzebowanie kaloryczne</h2>
            <h3 className="mb-s">
              Twoje zero kaloryczne wynosi około: {totalCalories.toFixed(0)}{" "}
              kalorii.
            </h3>
            <p>
              Tyle kalorii powinieneś spożywać aby utrzymać swoją wagę. Twoje
              BMI sugeruję, że powinieneś dobrać dietę{" "}
              {bmi < 18.5
                ? "z nadwyżką kaloryczną."
                : bmi > 25
                ? "z deficytem kalorycznym."
                : "oscylującą w Twoim zerze kalorycznym."}
            </p>
            <p className="mt-s">
              Jeśli jednak uważasz inaczej, zaznacz swój cel sylwetkowy.
            </p>
            <div className="choice mt-sm">
              <div
                className={`border ${
                  selectedGoal === "lose" ? "selected" : ""
                }`}
                onClick={() => handleGoalSelect("lose")}
              >
                <img src={looseWeight} alt="Utrasa wagi" />
              </div>
              <div
                onClick={() => handleGoalSelect("maintain")}
                className={`border ${
                  selectedGoal === "maintain" ? "selected" : ""
                }`}
              >
                <img src={keepWeight} alt="Utrzymanie wagi" />
              </div>
              <div
                onClick={() => handleGoalSelect("gain")}
                className={`border ${
                  selectedGoal === "gain" ? "selected" : ""
                }`}
              >
                <img src={buildMuscles} alt="Budowa Masy mięśniowej" />
              </div>
            </div>
            <div>
              <button className="button-27 mt-sm" onClick={handleNextClick}>
                Dalej
              </button>
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="content-wrapper">
            <h2 className="mb-m">Twoja kaloryczność diety</h2>
            <div className="i-center">
              <div className="border-t">
                {" "}
                {selectedGoal === "maintain" ? (
                  <img
                    src={keepWeight}
                    alt="Utrzymanie wagi"
                    className="img-xs"
                  />
                ) : selectedGoal === "gain" ? (
                  <img
                    src={buildMuscles}
                    alt="Utrzymanie wagi"
                    className="img-xs"
                  />
                ) : (
                  <img
                    src={looseWeight}
                    alt="Utrzymanie wagi"
                    className="img-xs"
                  />
                )}
              </div>
            </div>
            <p className="mt-s">
              <strong>
                Ustawiono cel na{" "}
                {selectedGoal === "maintain"
                  ? "utrzymanie wagi"
                  : selectedGoal === "gain"
                  ? "budowanie masy mięśniowej"
                  : "redukcję tkanki tłuszczowej"}
              </strong>
            </p>
            <p>
              W celu{" "}
              {selectedGoal === "maintain"
                ? "utrzymania wagi"
                : selectedGoal === "gain"
                ? "zbudowania masy mięśniowej"
                : "utraty wagi"}{" "}
              ustawiliśmy Twoją bazową dietę na zakres
              <strong>
                {selectedGoal === "lose"
                  ? `${(0.84 * totalCalories).toFixed(
                      0
                    )} - ${totalCalories.toFixed(0)}`
                  : selectedGoal === "maintain"
                  ? `${(0.94 * totalCalories).toFixed(0)} - ${(
                      1.08 * totalCalories
                    ).toFixed(0)}`
                  : `${(1.04 * totalCalories).toFixed(0)} - ${(
                      1.18 * totalCalories
                    ).toFixed(0)}`}
              </strong>{" "}
              kalorii. Pamiętaj, że jest to tylko sugerowana dieta, którą możesz
              zmienić w każdym momencie w panelu użytkownika.
            </p>
            <div>
              <button className="button-27 mt-s" onClick={handleNextClick}>
                Dalej
              </button>
            </div>
          </div>
        )}
        {step === 7 && (
          <div className="content-wrapper">
            <h2 className="mb-m">Przejdźmy do formalności!</h2>
            <p className="f-s mb-s">
              Na koniec poprosimy Cię jeszcze o załatwienie formalności. Bez
              obaw! W każdej chwili będziesz mógł je zmienić. Wypełnienie ich
              zapewni Ci szybsze i przyjemniejsze zamawianie jedzenia.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mieszkam w:</label>
                <select
                  value={housing_type}
                  onChange={(e) => setHousing_type(e.target.value)}
                  name="housing_type"
                  id="housing_type"
                >
                  <option value="dom">Domu</option>
                  <option value="mieszkanie">Mieszkaniu</option>
                </select>
              </div>

              <div className="form-group">
                <label>Imię:</label>
                <input
                  type="text"
                  value={first_name}
                  id="first_name"
                  name="first_name"
                  onChange={(e) => setFirst_name(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nazwisko:</label>
                <input
                  type="text"
                  value={last_name}
                  id="last_name"
                  name="last_name"
                  onChange={(e) => setLast_name(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nr telefonu:</label>
                <input
                  type="tel"
                  value={phone}
                  id="phone"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Miasto:</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ulica:</label>
                <input
                  type="text"
                  name="street"
                  value={street}
                  id="street"
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>

              {housing_type === "mieszkanie" && (
                <>
                  <div className="form-group">
                    <label>Numer mieszkania:</label>
                    <input
                      type="text"
                      name="apartment_number"
                      value={apartment_number}
                      id="apartment_number"
                      onChange={(e) => setApartment_number(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Piętro:</label>
                    <input
                      type="text"
                      name="floor"
                      value={floor}
                      id="floor"
                      onChange={(e) => setFloor(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Kod pocztowy:</label>
                <input
                  type="text"
                  name="postal_code"
                  required
                  pattern="\d{2}-\d{3}"
                  placeholder="00-000"
                  value={postal_code}
                  id="postal_code"
                  onChange={(e) => setPostal_code(e.target.value)}
                />
              </div>

              <button type="submit" className="button-27 mt-sm">
                Zapisz i kontynuuj
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
