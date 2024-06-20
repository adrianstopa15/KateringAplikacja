import React, { useState, useEffect } from 'react';
import Modal from '../../modalbutton/ModalGlobal'; 
import ModalGlobal from '../../modalbutton/ModalGlobal';
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CateringRequests() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  const { 
    housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
      setModalMode, setHouseNumber,
    currentEdit, setCurrentEdit, onEdit,
    editAddressIndex, setEditAddressIndex, dietName, setDietName, dietDescription, setDietDescription} = useAuth();

    const [dietTypeReq, setDietTypeReq] = useState("");
    const [dietTypes, setDietTypes] = useState([]);
    const [diets, setDiets] = useState([]);
    const [priceForDay, setPriceForDay] = useState(0);

    const applyDiet = async (x) => {
      x.preventDefault(); 
  
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
      const authToken = getCookieValue("authToken");
      const decodedToken = jwtDecode(authToken);
      const login = decodedToken.sub;
  
      const formData = {
        dietName,
        dietDescription,
        priceForDay,
      };
  
      console.log("FormData:", formData); 
  
      try {
        const apply = await axios.post(`http://localhost:8080/addDiet?login=${login}&dietTypeName=${dietTypeReq}`, formData, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        console.log("Response:", apply); 
        handleCloseModal();
        window.location.reload();
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Error response data:", error.response?.data); 
      }
  };
  
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
    {console.log(dietTypeReq);}

    const handleCloseModal = () => {
      setIsOpen(false);
      setModalMode(null);
      setEditAddressIndex(null);
    };

    useEffect(() => {
      const handleShowDietCompany = async () => {
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

    
          const response = await axios.get(
            `http://localhost:8080/showCompanyDiets?login=${login}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setDiets(response.data);
        } catch (error) {
          console.error("Error fetching company:", error);
        }
      };
      handleShowDietCompany();
    }, []);

    const handleDelete = async (id) => {
      const getCookieValue = (name) =>
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          ?.split("=")[1];
      const authToken = getCookieValue("authToken");
    
      MySwal.fire({
        title: 'Are you sure?',
        text: "Czy na pewno chcesz usunąć dietę?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Usuń',
        cancelButtonText: "Anuluj"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(`http://localhost:8080/deleteDiet?id=${id}`, {}, {
              headers: { Authorization: `Bearer ${authToken}` },
            });
            console.log("Dieta została usunięta.");
            MySwal.fire(
              'Usunięto',
              'Dieta została usunięta.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          } catch (error) {
            console.error("Błąd przy usuwaniu diety", error);
            MySwal.fire(
              'Error!',
              'Błąd przy usuwaniu diety.',
              'error'
            );
          }
        }
      });
    };
      
    return (
    <div>
      <div className="ml-s mt-s">
        <h1 className="h1-regular mb-m">Wnioski</h1>
        <button className="button-27-i" onClick={() => setModalOpen(true)}>Utwórz wniosek</button>
        <div className="catering-display--element" style={{marginBottom: "1rem"}}>
        <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Diety: </h1>
          <div className="address-info">
            {diets.length === 0 ? (
              <h2>Brak dostępnych diet</h2>
            ) : (
          diets.map((diet, index) => (
        <div key={`${diet.dietId} ${index}`} className="diet-display--element" style={{ marginBottom: "1rem",  borderColor: diet.status === "Zaakceptowane" ? "green" : "#c7c7c7" }}>
          <p>Nazwa: {diet.dietName}</p>
          <p>Opis: {diet.dietDescription}</p>
          <p>Cena za dzień: {diet.priceForDay} zł</p>
          <p>Status: {diet.status}</p>
          <button className="button-27-d ml-s" onClick={() => handleDelete (diet.dietId)}>Usuń</button>
        </div>
      )))}
        </div>
      </div>
      </div>
        </div>
      </div>
      <ModalGlobal isOpen={isModalOpen}>
        <div className='flex-modal'>
          <h2 style={{marginBottom:"25px"}}>Tworzenie nowego wniosku</h2>
          <form onSubmit={applyDiet} className='form-modal'>
            <label>Nazwa diety: <input type="text"
                    value={dietName}
                    name="dietName"
                    id="dietName"
                    onChange={(e) => setDietName(e.target.value)}
            /></label>
            <label>Opis: <textarea 
            value={dietDescription}
            name="dietDescription"
            id="dietDescription"
            onChange={(e) => setDietDescription(e.target.value)}
            /></label>
            <label>Cena za dzień: <input type="number"
                    value={priceForDay}
                    name="priceForDay"
                    id="priceForDay"
                    onChange={(e) => setPriceForDay(e.target.value)}
            /></label>
            Typ diety:
            <select
               value={dietTypeReq}
               name="dietTypeReq"
               id="dietTypeReq"
               onChange={(e) => setDietTypeReq(e.target.value)}
            >
              <option value="">Wybierz...</option> 
              {dietTypes.map((type) => (
                    <option key={type.dietTypeId} value={type.name}>
                        {type.name}
                    </option>
                ))}
             
           
            </select>
            <div className='buttons-container' style={{marginTop:"10px"}}>
              <button type="submit" className="button-27-save" disabled={dietTypeReq == ""} style={{marginRight:"15px"}}>Wyślij</button>
              <button type="button" onClick={() => setModalOpen(false)} className="button-27-e">Anuluj</button>
            </div>
          </form>
         
        </div>
      </ModalGlobal>
    </div>
  );
}
