import React, { useState } from "react";

export default function SimplifiedProfilePage() {
  const [step, setStep] = useState(1);
  const [housingType, setHousingType] = useState("dom");

  return (
    <div className="profile-page">
      <div className="profile-page--content">
        {step === 1 && (
          <div className="content-wrapper">
            <h1 className="mb-m">Witaj! Xyz </h1>
            <p className="f-m">Jest to Twoje pierwsze logowanie.</p>
            <p className="mt-m f-s">
              Poprosimy Cię o wpisanie danych, aby ułatwić Ci proces zamawiania
              jedzenia.
            </p>
            <button className="button-27 mt-s" onClick={() => setStep(2)}>
              Dalej
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="content-wrapper">
            <h2 className="mb-m">Przejdźmy do formalności!</h2>
            <p className="f-s mb-s">
              Wypełnij dane osobowe. W każdej chwili będziesz mógł je zmienić.
              Wypełnienie ich zapewni Ci szybsze i przyjemniejsze zamawianie
              jedzenia.
            </p>
            <form>
              <div className="form-group">
                <label>Mieszkam w: </label>
                <select
                  value={housingType}
                  onChange={(e) => setHousingType(e.target.value)}
                >
                  <option value="dom">Domu</option>
                  <option value="mieszkanie">Mieszkaniu</option>
                </select>
              </div>

              <div className="form-group">
                <label>Imię:</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Nazwisko:</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Nr telefonu:</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Miasto:</label>
                <input type="text" required />
              </div>

              <div className="form-group">
                <label>Ulica:</label>
                <input type="text" required />
              </div>

              {housingType === "mieszkanie" && (
                <>
                  <div className="form-group">
                    <label>Numer mieszkania:</label>
                    <input type="text" required />
                  </div>

                  <div className="form-group">
                    <label>Piętro:</label>
                    <input type="text" />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Kod pocztowy:</label>
                <input
                  type="text"
                  required
                  pattern="\d{2}-\d{3}"
                  placeholder="00-000"
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
