import React, { useState, useEffect } from 'react';
import axios from "axios";
import CateringMealModal from './cateringMealModal';
import { useAuth } from '../../AuthContext';


export default function CateringMeal() {

    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);

    const {description, setDescription,
    name, setName,
    carbs, setCarbs,
    fat, setFat,
    protein, setProtein,
    calories, setCalories} = useAuth();


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