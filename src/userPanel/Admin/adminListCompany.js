import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import AdminListCompanyModal from "./adminListCompanyModal";


export default function AdminListCompany() {
  const [companies, setCompanies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const {editCompanyIndex, setEditCompanyIndex, onEditCompany, currentCompany} = useAuth();

  const {
    companyName, setCompanyName,
    phone, setPhone,
    nip, setNip,
    dietType, setDietType
    } = useAuth();

  
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const getCookieValue = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(';').shift();
          return null;
        };
        const authToken = getCookieValue("authToken");
  
        const response = await axios.get(
          `http://localhost:8080/showCompanies`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };
    fetchCompany();
  }, []);

  useEffect(() => {
    if (currentCompany !== null) {
      const company = companies.find(c => c.companyId === currentCompany);
      if (company) {
        setCompanyName(company.companyName);
        setNip(company.nip);
        setPhone(company.phone);
        setDietType(company.dietType);
      }
    }
  }, [currentCompany, companies, setCompanyName, setNip, setPhone, setDietType]);

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setEditCompanyIndex(null);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  

  const handleDeleteCompany = async (companyId) => {
    if (!window.confirm("Czy na pewno chcesz usunąć firmę i wszystkie ich dane?")) return;

    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    const authToken = getCookieValue("authToken");
    
    if (window.confirm("Czy na pewno chcesz usunąć tą firmę oraz wszystkie ich dane?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/deleteCompany?id=${companyId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (response.status === 200) {
          setCompanies(prev => prev.filter(company => company.companyId !== companyId)); 
          alert("Firma została usunięta.");
        } else {
          alert("Nie udało się usunąć firmy. Status: " + response.status);
        }
      } catch (error) {
        alert("Nie udało się usunąć firmy: " + error.message);
      }
    }
  };

  return (
    <div>
    <div className="user-da   ta-display ml-s mt-s">
      <h1 className="h1-regular mb-m">Lista firm:</h1>
      {companies.map((company, index) => (
        <div key={`${company.companyId} ${index}`} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
          <p>Nazwa firmy: {company.companyName}</p>
          <p>NIP: {company.nip}</p>
          <p>Typ diety: {company.dietType}</p>
          <p>Telefon: {company.phone}</p>
          <button className="button-27-e" onClick={() => { setIsOpen(true); handleOpenModal('edit'); setEditCompanyIndex(index); onEditCompany(company.companyId)}}>Edytuj</button>
          <button className="button-27-d ml-s" onClick={() => handleDeleteCompany(company.companyId)}>Usuń</button>
        </div>
      ))}
      
      <AdminListCompanyModal open={isOpen && modalMode === 'edit'} onClose={() => handleCloseModal()}>
        {editCompanyIndex !== null && (
          <form onSubmit={handleSubmit} className="form1">
            <div className="form-group">
              <label>Nazwa firmy:</label>
              <input type="text" value={companyName} name="companyName" id="companyName" onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>NIP:</label>
              <input type="text" name="nip" value={nip} id="nip" onChange={(e) => setNip(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Typ diety:</label>
              <input type="text" name="dietType" value={dietType} id="dietType" onChange={(e) => setDietType(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Telefon:</label>
              <input type="tel" value={phone} name="phone" id="phone" onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </form>
        )}
      </AdminListCompanyModal>
    </div>
    </div>
  ); 
}
