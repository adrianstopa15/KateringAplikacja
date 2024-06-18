import React, { useState, useEffect } from "react";
import axios from "axios";


export default function AdminDiets() {
    const [diets, setDiets] = useState([]);
      
      const handleAccept = async (x) => {
        try {
          const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
      
          const response = await axios.post(
            `http://localhost:8080/acceptDiet?id=${x}`, {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching Confirmations:", error);
        }
      };
   
   useEffect(() => {
       const handleShowDiet = async () => {
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
           console.error("Error fetching company:", error);
       }
       };
       handleShowDiet();
   }, []);


    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Diety: </h1>
          {diets.map((diet, index) => (
        <div key={`${diet.dietId} ${index}`} className="address-display--element" style={{marginBottom:"1rem" ,  borderColor: diet.status === "Zaakceptowane" ? "green" : "#c7c7c7"}}>
          <p>Nazwa firmy: {diet.company.companyName}</p>
          <p>Nazwa diety: {diet.dietName}</p>
          <p>Opis: {diet.dietDescription}</p>
          <p>Cena za dzień: {diet.priceForDay} zł</p>
          <p>Status: {diet.status}</p>
          {/* <button 
        className="button-27-e" 
        onClick={() => { if (diet.status !== "Zaakceptowane") handleAccept(diet.dietId); }}
        disabled={diet.status === "Zaakceptowane"} 
      >
        Zaakceptuj
      </button> */}
      <button 
      className={`button-27-e ${diet.status === "Zaakceptowane" ? "button-disabled" : ""}`}
      onClick={() => { if (diet.status !== "Zaakceptowane") handleAccept(diet.dietId); }}
      disabled={diet.status === "Zaakceptowane"}
      >
      Zaakceptuj
      </button>      
      </div>
      ))}
        </div>
      </div>
    );
  }
  