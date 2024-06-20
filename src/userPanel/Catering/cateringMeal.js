import React, { useState, useEffect } from 'react';
import axios from "axios";
import CateringMealModal from './cateringMealModal';
import { useAuth } from '../../AuthContext';
import { jwtDecode } from "jwt-decode";



export default function CateringMeal() {

    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [diets, setDiets] = useState([]); 
    const [mealTypes, setMealTypes] = useState([]);

    const {description, setDescription,
    name, setName,
    carbs, setCarbs,
    fat, setFat,
    protein, setProtein,
    calories, setCalories, 
    dietId, setDietId,  
    typeId, setTypeId} = useAuth();


    const handleOpenModal = (mode) => {
        setModalMode(mode);
        setIsOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsOpen(false);
        setModalMode(null);
    };

    useEffect(() => {
            const calculateCalories = () => {
                const calculatedCalories = (carbs * 4) + (fat * 9) + (protein * 4);
                setCalories(calculatedCalories);
            };
            calculateCalories();
    }, [carbs, fat, protein]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            console.error("Error fetching Diets:", error);
          }
        };
     
        fetchDiets();
    }, []);

    useEffect(() => {
      const fetchMealTypes = async () => {
          try {
              const getCookieValue = (name) => {
                  const value = `; ${document.cookie}`;
                  const parts = value.split(`; ${name}=`);
                  if (parts.length === 2) return parts.pop().split(';').shift();
                  return null;
              };
              const authToken = getCookieValue("authToken");

              const response = await axios.get(
                  `http://localhost:8080/showMealTypes`,
                  {
                      headers: {
                          Authorization: `Bearer ${authToken}`,
                      },
                  }
              );
              setMealTypes(response.data);
          } catch (error) {
              console.error("Error fetching DietTypes:", error);
          }
      };

      fetchMealTypes();
  }, []);
      
    return (
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Posiłki:</h1>
          <button className="button-27-e" onClick={() => handleOpenModal('add')}>
              Dodaj posiłek
          </button>
          
          <CateringMealModal open={isOpen && modalMode === 'add'} onClose={handleCloseModal}>
            <form onSubmit={handleSubmit} className="form1">
              <div className="form-group">
                <label>Nazwa posiłku:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Opis posiłku:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div className="form-group">
              <label>Dieta:</label>
              <select onChange={e => setDietId(Number(e.target.value))} value={dietId}>
                    <option value="">Wybierz...</option> 
                    {diets.filter(diet => diet.status === "Zaakceptowane")
                    .map((diet) => (
                        <option key={diet.dietId} value={diet.dietId}>
                            {diet.dietName}
                        </option>
                    ))}
              </select>
              </div>
              <div className="form-group">
              <label>Typ posiłku:</label>
              <select onChange={e => setTypeId(Number(e.target.value))} value={typeId}>
                    <option value="">Wybierz...</option> 
                    {mealTypes.map((mealType) => (
                        <option key={mealType.typeId} value={mealType.typeId}>
                            {mealType.name}
                        </option>
                    ))}
              </select>
              </div>
              <div className="form-group">
                <label>Węglowodany (g):</label>
                <input type="number" value={carbs} onChange={(e) => setCarbs(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label>Tłuszcze (g):</label>
                <input type="number" value={fat} onChange={(e) => setFat(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label>Białko (g):</label>
                <input type="number" value={protein} onChange={(e) => setProtein(Number(e.target.value))} required />
              </div>
              <div className="form-group">
                <label>Kalorie:</label>
                <input type="number" value={calories} readOnly />
              </div>
            </form>
          </CateringMealModal>
        </div>
      );
  };