import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import axios from "axios";
import AdminModalCompany from "./adminModalCompany";

export default function AdminListCompany() {
    
  const [companies, setCompanies] = useState([]);
  const [editCompanyIndex, setEditCompanyIndex] = useState(null);
  const [currentCompany, setCurrentCompany] = useState({});
  const { isOpen, setIsOpen, modalMode, setModalMode } = useAuth();

  const {
    companyId, companyName,
    phone, nip, dietType, 
    setPhone} = useAuth();

  
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

  const handleEditCompany = (index) => {
    setEditCompanyIndex(index);
  };

  const handleCurrentCompany = (index) => {
    setCurrentCompany(companies[index]);
  }

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  

  const handleDeleteCompany = async (companyId) => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    const authToken = getCookieValue("authToken");
    
    if (window.confirm("Czy na pewno chcesz usunąć tą firmę oraz wszystkie ich dane?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/deleteCompany/${companyId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (response.status === 200) {
          console.log('Company deletion successful', response.data);
          setCompanies(companies.filter(company => company.id !== companyId)); 
          alert("Firma została usunięta.");
        } else {
          console.error('Unexpected server response when deleting company:', response);
          alert("Nie udało się usunąć firmy. Status: " + response.status);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Nie udało się usunąć firmy: " + error.message);
      }
    }
  };

  return (
    <div>
    <div className="user-da   ta-display ml-s mt-s">
      <h1 className="h1-regular mb-m">Lista firm:</h1>
      {companies.map((company, index) => (
        <div key={company.id} className="address-display--element" style={{ marginBottom: "1rem", borderColor: "#c7c7c7" }}>
          <p>Nazwa firmy: {company.companyName}</p>
          <p>NIP: {company.nip}</p>
          <p>Typ diety: {company.dietType}</p>
          <p>Telefon: {company.phone}</p>
          <button className="button-27-e" onClick={() => { setIsOpen(true); handleOpenModal('edit'); handleEditCompany(company.companyId); handleCurrentCompany(index); }}>Edytuj</button>
          <button className="button-27-d ml-s" onClick={() => handleDeleteCompany(company.id)}>Usuń</button>
        </div>
      ))}
      
      <AdminModalCompany open={isOpen && modalMode === 'edit'} onClose={handleCloseModal}>
        {editCompanyIndex !== null && (
          <form onSubmit={handleSubmit} className="form1">
            <div className="form-group">
              <label>Nazwa firmy:</label>
              <input type="text" value={currentCompany?.companyName || ''} name="companyName" id="companyName" onChange={(e) => setCurrentCompany({...currentCompany, companyName: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>NIP:</label>
              <input type="text" name="nip" value={currentCompany?.nip || ''} id="nip" onChange={(e) => setCurrentCompany({...currentCompany, nip: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Typ diety:</label>
              <input type="text" name="dietType" value={currentCompany?.dietType || ''} id="dietType" onChange={(e) => setCurrentCompany({...currentCompany, dietType: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Telefon:</label>
              <input type="tel" value={currentCompany?.phone || ''} name="phone" id="phone" onChange={(e) => setCurrentCompany({...currentCompany, phone: e.target.value})} required />
            </div>
          </form>
        )}
      </AdminModalCompany>
    </div>
    </div>
  ); 
}
