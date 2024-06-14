import { useAuth } from "./AuthContext"
import axios from "axios";
import { useAlertModal } from "./modalbutton/AlertModalContext";
import { useEffect, useState } from "react";
import MultiRangeSlider from 'multi-range-slider-react';
import { Step } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function OrderPlace(){
const [step, setStep] = useState(1);
const [prices, setPrices] = useState([10, 150]);
const [minValue, setMinValue] = useState(10);
const [maxValue, setMaxValue] = useState(150);
const [diets, setDiets] = useState([]);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [dietTypes, setDietTypes] = useState([]);
const [selectedDietTypeId, setSelectedDietTypeId] = useState(1);
const [selectDietId, setSelectedDietId] = useState();
const [userRole, setUserRole] = useState(null);
const navigate = useNavigate();
const MySwal = withReactContent(Swal);
const goToNextStep = () => {
    setStep(step + 1);
};
const goToPrevStep = () => {
    setStep(step - 1);
};

const handleInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
};

    const handleSelectDiet = (dietId) => {
        setSelectedDietId(dietId);
        setStep(step +1);
    }


const handleDateSubmit = () => {
    if(!startDate || !endDate){
        alert("Wypełnij obie daty!");
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end ){
        alert("Data zakończenia musi byc później niż data rozpoczęcia")
        return;
    }
    if(start < new Date()) {
        alert("Data startowa nie może być w przeszłości!");
        return;
    }


setStep(step+1)
    
}

const handleDateSubmitForm = async (e) => {
    e.preventDefault();

    if(!startDate || !endDate){
        alert("Wypełnij obie daty!");
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end ){
        alert("Data zakończenia musi byc później niż data rozpoczęcia");
        return;
    }
    if(start < new Date()) {
        alert("Data startowa nie może być w przeszłości!");
        return;
    }

    const formData = {
        startDate,
        endDate
    };

    try {
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        const authToken = getCookieValue("authToken");
        const decodedToken = jwtDecode(authToken);

        const login = decodedToken.sub;

        const response = await axios.post(
            `http://localhost:8080/addOrder?login=${login}&id=${selectDietId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

     
        if (response.status === 200) {
            MySwal.fire({
              title: "Dieta została zamówiona!",
              text: "Przejdź do panelu użytkownika aby zobaczyć szczegóły zamówienia.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload();
            });
          } else {
            console.error("Error submitting order:", response.status);
          }
        } catch (error) {
          console.error("Error submitting order:", error);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Coś poszło nie tak. Spróbuj ponownie później.",
          });
        }
      };

useEffect(() => {
    const fetchDiets = async () => {
      try {
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
        
 
          const response = await axios.get(
          `http://localhost:8080/showDiets`,
          {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setDiets(response.data);
      } catch (error) {
        console.error("Error fetching Diets:", error);
      }
    };
 
    fetchDiets();
  }, []);

  useEffect(() => {
    const fetchDietTypes = async () => {
      try {
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
        
 
          const response = await axios.get(
          `http://localhost:8080/showDietTypes`,
          {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setDietTypes(response.data);
      } catch (error) {
        console.error("Error fetching DietTypes:", error);
      }
    };
 
    fetchDietTypes();
  }, []);



return (
    <>
            {step === 1 && (
    <div>
        <form style={{ display: 'grid', gap: '10px' }}>
                    <div>Wybierz rodzaj diety</div>
                    <select onChange={e => setSelectedDietTypeId(Number(e.target.value))} value={selectedDietTypeId}>
                {dietTypes.map((type) => (
                    <option key={type.dietTypeId} value={type.dietTypeId}>
                        {type.name}
                    </option>
                ))}
            </select>
                    <div>Bazowa cena kateringu (za dzień):</div>
                    <div>
                        <MultiRangeSlider
                    style={{ border: 'none', boxShadow: 'none', padding: '25px 10px' }}
                            min={10}
                            max={150}
                            step={1}
                            ruler={false} 
                            label={true} 
                            preventWheel={false} 
                            minValue={minValue}
                            maxValue={maxValue}
                            onInput={(e) => {
                                handleInput({
                                    minValue: e.minValue,
                                    maxValue: e.maxValue
                                });
                            }}
                        />
                        <div>
                            Wyświetlaj kateringi w cenie od {minValue} zł do {maxValue} zł
                        </div>
                    </div>
                    <button className="button-27-s" onClick={() => setStep(2)}> Wyświetl Diety</button>
                   
                    </form>
           
        
    </div>
                )}
                 {step === 2 && (
                <div>
                {    console.log(diets)  }
                {    console.log(selectedDietTypeId)  }
                
                    <h1>Lista diet według preferencji:</h1>
                  {diets
                  .filter(diet => diet.dietType.dietTypeId === selectedDietTypeId)
                  .map(diet => (
                  
                    <li key={diet.dietId}>{diet.dietName} <button className="button-27-save" onClick={() => handleSelectDiet(diet.dietId)}>Wybierz dietę</button></li>
                  ))}
                    <button className="button-27-s" onClick={goToPrevStep}> Powrót</button>
                </div>
            )}
             {step === 3 && (
          
                <div>
                  Wybierz dni w których chcesz zamówić dietę:
                  <form style={{ display: 'grid', gap: '10px' }} onSubmit={handleDateSubmitForm}>
                        <label>
                            Data rozpoczęcia diety:
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Data zakończenia diety:
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="button-27-save">Zatwierdź i przejdz do podsumowania</button>
                    </form>
                </div>
            )}
             {step === 4 && (
                <div>
                 Podsumowanie:
                 Dieta:
                 Cena:
                 Dni: {startDate} - {endDate}
                </div>
            )}
            </>
);
}