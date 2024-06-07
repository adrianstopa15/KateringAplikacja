import { useAuth } from "./AuthContext"
import axios from "axios";
import { useAlertModal } from "./modalbutton/AlertModalContext";

export default function CateringForm(){
  const { showAlertModal } = useAlertModal();
    const { 
        housingType, setHousingType,
          firstName, setFirstName,
          lastName, setLastName,
          phone, setPhone,
          street, setStreet,
          login, setLogin,
          apartmentNumber, setApartmentNumber,
          floor, setFloor,
          postalCode, setPostalCode,
          city, setCity,
        currentEdit, setCurrentEdit, handleEdit, onEdit,
        editAddressIndex, setEditAddressIndex, handleDelete, houseNumber, setHouseNumber, email, setEmail,
       dietType, setDietType,companyName, setCompanyName, description, setDescription, nip, setNip } = useAuth();

       const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          street,
          apartmentNumber,
          floor,
          postalCode,
          city,
          houseNumber,
          companyName,
          email,
          dietType,
          description,
          phone,
          nip,
          login
        };
      
        try {
          const response = await axios.post(`http://localhost:8080/addCompany`, formData);
          console.log('dodano pomyślnie:', response.data);
          showAlertModal("Dane zostały pomyślnie wysłane! Odpowiedź zostanie wysłana na wiadomość email w ciągu 124 dni roboczych.", "correct");
          
        
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        } catch (error) {
          console.error('Failed to add company:', error.response?.data || error.message);
          showAlertModal("Nie udało się wysłać danych. Proszę spróbować ponownie.", "alert");
        }
      };
      
return(
    <>

<form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '10px' }}>
<div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Login:</label>
    <input type="text" name="login" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required/>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Nazwa Firmy:</label>
    <input type="text" name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required/>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Nip:</label>
    <input type="text" name="nip" id="nip"  value={nip} required pattern="\d{10}" maxLength="10" onChange={(e) => setNip(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Adres Email:</label>
    <input type="email" name="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Numer Telefonu:</label>
    <input type="tel" name="phone" id="phone" value={phone} pattern="\d{9}"        
                  maxLength="9"   required onChange={(e) => setPhone(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Miasto:</label>
    <input type="text" name="city" id="city" value={city}  required onChange={(e) => setCity(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Nazwa ulicy:</label>
    <input type="text" name="street" value={street} id="street"  required onChange={(e) => setStreet(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Numer ulicy:</label>
    <input type="text" name="houseNumber" value={houseNumber} id="houseNumber"  required onChange={(e) => setHouseNumber(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Kod pocztowy:</label>
    <input type="text" name="postalCode" id="postalCode" value={postalCode} pattern="\d{2}-\d{3}" maxLength="6" placeholder="00-000" required onChange={(e) => setPostalCode(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Rodzaj Oferowanych Diet:</label>
    <textarea name="dietType" id="dietType" required value={dietType} maxLength="650" style={{ flex: '1' }} onChange={(e) => setDietType(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Dodatkowy opis:</label>
    <textarea name="description" id="description" maxLength="650" style={{ flex: '1' }} onChange={(e) => setDescription(e.target.value)} />
  </div>
  <button type="submit" className="modal-button">Wyślij</button>
</form>
</>
)
}