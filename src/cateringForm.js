import { useAuth } from "./AuthContext"
import axios from "axios";

export default function CateringForm(){
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

              
            };
        
            try {
              console.log(formData);
              console.log("ee");
              
              const response = await axios.post(
                `http://localhost:8080/addFirm`,
                formData
                
              );
          
            
              console.log('dodano pomyślnie:', response.data);
            } catch (error) {
          
              console.error('Failed to add firm:', error.response?.data || error.message);
            }
          };

return(
    <>

 



<form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '10px' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Nazwa Firmy:</label>
    <input type="text" name="companyName" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required/>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Nip:</label>
    <input type="text" name="nip" id="nip" value={nip} required onChange={(e) => setNip(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Adres Email:</label>
    <input type="email" name="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Numer Telefonu:</label>
    <input type="tel" name="phone" id="phone" value={phone}  required onChange={(e) => setPhone(e.target.value)} />
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
    <input type="text" name="postalCode" id="postalCode" value={postalCode} pattern="\d{2}-\d{3}" placeholder="00-000" required onChange={(e) => setPostalCode(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Rodzaj Oferowanych Diet:</label>
    <textarea name="dietType" id="dietType" required value={dietType} style={{ flex: '1' }} onChange={(e) => setDietType(e.target.value)} />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ width: '150px' }}>Uwagi:</label>
    <textarea name="description" id="description" style={{ flex: '1' }} onChange={(e) => setDescription(e.target.value)} />
  </div>
  <button type="submit" className="modal-button">Wyślij</button>
</form>
</>
)
}