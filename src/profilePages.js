import { useState } from "react";

export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [weightIndicator, setWeightIndicator] = useState("");
  const handleStartClick = () => {
    setStep(2);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (weight && height) {
      const calculatedBMI = calculateBMI();
      const indicator = getWeightIndicator(calculatedBMI);
      setWeightIndicator(indicator);
      setStep(step + 1);
    } else {
      alert("Prosze podac wszystkie dane!");
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculateBMI = weight / (heightInMeters * heightInMeters);
    setBMI(calculateBMI);
    return calculateBMI;
  };
  const getWeightIndicator = (bmi) => {
    if (bmi < 18.5) return <p className="mt-s t-red">niedowagę!</p>;
    if (bmi >= 18.5 && bmi < 25)
      return <p className="mt-s t-green">prawidłową.</p>;
    if (bmi >= 25 && bmi < 30) return <p className="mt-s t-orange">nadwagę!</p>;
    if (bmi >= 30) return <p className="mt-s t-red">otyłość.</p>;
  };
  const handleNextClick = () => {
    const calculatedBMI = calculateBMI();
    const indicator = getWeightIndicator(calculatedBMI);
    setWeightIndicator(indicator);
    setStep(step + 1);
  };

  return (
    <div className="profile-page">
      <div className="profile-page--content">
        {step === 1 && (
          <div className="content-wrapper">
            <h1 className="mb-m">Witaj Imię!</h1>
            <h2>
              <p className="f-m">Jest to Twoje pierwsze logowanie</p>
              <p className="mt-m f-s ">
                aby rozpocząć korzystanie z DieTuzjem, proszę opowiedz nam co
                nieco o sobie.
              </p>
            </h2>
            <button className="button-27 mt-s" onClick={handleStartClick}>
              Zaczynajmy!
            </button>
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
                    placeholder="waga w kilogramach"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <input
                    type="number"
                    name="height"
                    placeholder="Wzrost w centymetrach"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </label>

                <select>
                  <option value="man">Kobieta</option>
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
            <h3 className="mb-m f-m">Twoje BMI wskazuję, że ...</h3>
            <p className="mb-m">
              Jako Twój inteligentny asystent, proponuje Ci dobranie diety,
              która będzie uwzględniała deficyt kaloryczny.
            </p>
            <p>
              Proszę o wybranie swojej średniej aktywności fizycznej, aby lepiej
              dostosować kaloryczność Twojej diety:
              <select>
                <option value="man">Minimalny wysiłek</option>
                <option value="man">Lekki wysiłek</option>
              </select>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
