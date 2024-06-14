import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function AdminDietType() {
  const MySwal = withReactContent(Swal);
    const [dietTypes, setDietTypes] = useState([]);
    const [name, setDietName] = useState("")


    const handledietType = async () => {
         const formData = {
            name,
         }

        try {
          const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
          };
          const authToken = getCookieValue("authToken");
    
          const response = await axios.post(
            `http://localhost:8080/addDietType`, formData,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setDietTypes(response.data);

        } catch (error) {
          console.error("Error fetching company:", error);
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
            `http://localhost:8080/showDietTypes`,
            {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            }
            );
            setDietTypes(response.data);
        } catch (error) {
            console.error("Error fetching company:", error);
        }
        };
        handleShowDiet();
    }, []);

    const handleDelete = async (id) => {
      const getCookieValue = (name) =>
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          ?.split("=")[1];
      const authToken = getCookieValue("authToken");
    
      MySwal.fire({
        title: 'Usuwanie diety',
        text: "Czy na pewno chcesz usunąć typ diety?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Usuń',
        cancelButtonText: "Anuluj"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.post(`http://localhost:8080/deleteDietType?id=${id}`, {}, {
              headers: { Authorization: `Bearer ${authToken}` },
            });
            console.log("Typ diety został usunięta.");
            MySwal.fire(
              'Usunięto!',
              'Dieta została usunięta.',
              'success'
            );
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
          <h1 className="h1-regular mb-m">Dodaj typ diety:</h1>
          <form className="form-container" onSubmit={handledietType}>
          <label>
              Typ diety:
              <input type="text"
                  value={name}
                  name="name"
                  id="name"
                  onChange={(e) => setDietName(e.target.value)}
                  required
              />
          </label>
          <button className="button-27-save" type="submit">
              Zapisz
          </button>
         </form> 
        {dietTypes.map((dietType, index) => (
        <div key={`${dietType.dietTypeId} ${index}`} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
          <p>Typ diety: {dietType.name}</p>
          <button className="button-27-d" onClick={() => handleDelete (dietType.dietTypeId)}>Usuń</button>
        </div>
      ))}
        </div>
      </div>
    );
  }
  