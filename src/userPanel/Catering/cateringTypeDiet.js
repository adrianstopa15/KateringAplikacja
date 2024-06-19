import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CateringTypeDiet() {

    const [diets, setDiets] = useState([]);
    const MySwal = withReactContent(Swal);
    
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
          <h1 className="h1-regular mb-m">Diety: </h1>
          <div className="address-info">
          {diets.map((diet, index) => (
        <div key={`${diet.dietId} ${index}`} className="diet-display--element" style={{ marginBottom: "1rem",  borderColor: diet.status === "Zaakceptowane" ? "green" : "#c7c7c7" }}>
          <p>Nazwa: {diet.dietName}</p>
          <p>Opis: {diet.dietDescription}</p>
          <p>Cena za dzień: {diet.priceForDay} zł</p>
          <p>Status: {diet.status}</p>
          <button className="button-27-d ml-s" onClick={() => handleDelete (diet.dietId)}>Usuń</button>
        </div>
      ))}
        </div>
      </div>
      </div>
    );
  }
