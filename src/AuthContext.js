import React, { createContext, useContext, useState} from "react";
import axios from "axios";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BorderAll, Style } from "@mui/icons-material";
import UserStats from "./userPanel/userStats";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const MySwal = withReactContent(Swal);

  const [login, setLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});
  const [housingType, setHousingType] = useState("dom");
  const [houseNumber, setHouseNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [nip, setNip] = useState("");
  
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bmi,setBmi] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  //dane do pobierania id itp
  const [addresses, setAddresses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  const [preferences, setPreferences] = useState([]);

  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [editCustomerIndex, setEditCustomerIndex] = useState(null);
  const [editCompanyIndex, setEditCompanyIndex] = useState(null);
  
  const [editPreferenceIndex, setPreferenceIndex] = useState(null);

  const [currentEdit, setCurrentEdit] = useState();
  const [currentCustomer, setCustomersEdit] = useState();
  const [currentCompany, setCompanyEdit] = useState();

  const [currentPreference, setPreferencesEdit] = useState();
  // koniec

  const [companyName, setCompanyName] = useState("");
  const [dietType, setDietType] = useState('');
  const [dietName, setDietName] = useState("");
  const [dietDescription, setDietDescription] = useState("");

  const [comments, setComments] = useState('');
  const [description, setDescription] = useState('');
  const [popupType, setPopupType] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [companyStatus, setCompanyStatus] = useState("");

  const [newAddress, setNewAddress] = useState({
    street: '',
    apartmentNumber: '',
    floor: '',
    postalCode: '',
    city: '',
    housingType: '',
    houseNumber: '',
  });

  const handleLogin = (success) => {
    setIsLoggedIn(true);
    fetchUserData();
  };

  const togglePopup = (type) => setPopupType(type === popupType ? "none" : type);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Nie udało się pobrać danych użytkownika", error);
    }
  };

  const onEdit = (x) => {
    setCurrentEdit(x);
  };

  const onEditCustomer = (x) => {
    setCustomersEdit(x);
  };

  const onEditCompany = (x) => {
    setCompanyEdit(x);
  };

  const onEditPreferences = (x) => {
    setPreferencesEdit(x);
  };

   const handleCloseModal = () => {
    setIsOpen(false);
    setModalMode(null);
    setEditAddressIndex(null);
  };

  const handleEditPreferences = async (e) => {

    const preferences = {
      weight, 
      height, 
      age, 
      selectedGoal,
    };

    try {
      const getCookieValue = (name) =>
        document.cookie
          .split("; ")
          .find((row) => row.startsWith(name + "="))
          ?.split("=")[1];
      const authToken = getCookieValue("authToken");
      const decodedToken = jwtDecode(authToken);

      const login = decodedToken.sub;

      const response = await axios.post(`http://localhost:8080/editPreference?login=${login}&id=${currentPreference}`, preferences, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        console.log("Preferences updated successfully:", response.data);

        
        setPreferences(prevPreferences => [...prevPreferences, response.data]);
        window.location.reload();
    } else {
        console.error("Failed to update preferences:", response.status);
    }
} catch (error) {
    console.error("Error updating preferences:", error);
}
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addressData = {
      city,
      street,
      houseNumber,
      postalCode,
      apartmentNumber,
      floor,
      housingType,
    };

    try {
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        return parts.length === 2 ? parts.pop().split(';').shift() : null;
      };
      const authToken = getCookieValue("authToken");
      const decodedToken = jwtDecode(authToken);
      const login = decodedToken.sub;
      
      if (!authToken) {
        console.error("JWT token is missing");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/addAddress?login=${login}`,
        addressData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      setAddresses(prevAddresses => [...prevAddresses, response.data]);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error adding address:', error.response?.data || error.message);
    }
  };


  const handleEdit = async (e) => {
  
    const formData = {
      street,
      apartmentNumber,
      floor,
      postalCode,
      city,
      housingType,
      houseNumber,
    };

    const getCookieValue = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  const authToken = getCookieValue("authToken");
  
  console.log(currentEdit); 
  console.log(authToken);

  try {
    const response = await axios.post(
      `http://localhost:8080/editAddress?id=${currentEdit}`,
      formData,
      { headers: {Authorization: `Bearer ${authToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error editing address:', error);
    throw error; 
  }
}

const handleEditCompany = async (e) => {

  const formData = {
    companyName,
    phone, 
    nip, 
    dietType, 
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  const authToken = getCookieValue("authToken");
  console.log(currentCompany); 

  try {
    const response = await axios.post(`http://localhost:8080/editCompany?id=${currentCompany}`, formData,
     {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });


    if (response.status === 200) {
      console.log('Company update successful', response.data);
      MySwal.fire({
        title: 'Success!',
        text: 'Firma została zaktualizowana',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      window.location.reload();
    } else {
      console.error('Unexpected server response when updating company:', response);
      alert("Nie udało się zaktualizować firmy. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating company:", error);
    alert("Nie udało się zaktualizować firmy: " + error.message);
  }
};

const handleCustomerEdit = async (e) => {
  if (currentCustomer === null) {
    alert('Nie wybrano klienta do edycji!');
    return;
  }

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };
  const authToken = getCookieValue("authToken");
  console.log(currentCustomer); 


  const data = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
  };

  try {
    const response = await axios.post(`http://localhost:8080/editCustomer?id=${currentCustomer}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Edycja zakończona sukcesem', response.data);
      alert("Dane użytkownika zostały zaktualizowane.");
      
      const updatedCustomers = [...customers];
      updatedCustomers[editCustomerIndex] = response.data;
      setCustomers(updatedCustomers);

      setIsOpen(false);
      setModalMode(null);
    } else {
      console.error('Nieoczekiwana odpowiedź serwera przy edycji klienta:', response);
      alert("Nie udało się zaktualizować danych użytkownika. Status: " + response.status);
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    alert("Nie udało się zaktualizować danych użytkownika: " + error.message);
  }
};

const handleDelete = async (id) => {
  const result = await MySwal.fire({
    title: 'Czy na pewno chcesz usunąć adres?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Tak',
    cancelButtonText: "Anuluj"
  });

  if (!result.isConfirmed) {
    return;
  }

  const getCookieValue = (name) =>
    document.cookie
      .split('; ')
      .find((row) => row.startsWith(name + '='))
      ?.split('=')[1];

  const authToken = getCookieValue('authToken');

  try {
    await axios.post(`http://localhost:8080/deleteAddress?id=${id}`, {}, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('Adres został usunięty.');
    MySwal.fire({
      title: 'Usunięto!',
      text: 'Adres został usunięty',
      icon: 'success',
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error('Błąd przy usuwaniu adresu:', error);
    MySwal.fire({
      title: 'Error!',
      text: 'Nie udało się usunąć adresu. Spróbuj ponownie później.',
      icon: 'error',
    });
  }
};


const handleSetDefaultAddress = async (addressId) => {
  const getCookieValue = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  const authToken = getCookieValue("authToken");
  const decodedToken = jwtDecode(authToken);
  const login = decodedToken.sub;

  try {
    await axios.post(
      `http://localhost:8080/setDefaultAddress?id=${addressId}&login=${login}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    MySwal.fire({
      title: "Sukces!",
      text: "Twój domyślny adres został zmieniony.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error("Błąd przy ustawianiu domyślnego adresu:", error);
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Spróbuj ponownie później!",
    });
  }
};

  const handleLogout = () => {
    setIsLoggedIn(false);
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setUserData({});
    window.location.reload();
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);



  return (
    <AuthContext.Provider
    value={{
      isLoggedIn, userData, 
      handleLogin, handleLogout,
      housingType, setHousingType,
      firstName, setFirstName,
      lastName, setLastName,
      phone, setPhone,
      street, setStreet,
      apartmentNumber, setApartmentNumber,
      floor, setFloor,
      postalCode, setPostalCode,
      city, setCity,
      weight, setWeight,
      height, setHeight,
      age, setAge,
      gender, setGender,
      bmi, setBmi,
      selectedGoal, setSelectedGoal,

      
      onEdit, 
      onEditCustomer,
      onEditCompany,
      onEditPreferences, 

      handleEdit, 
      handleCustomerEdit, 
      handleEditCompany,
      handleEditPreferences,
      
    
      isOpen, setIsOpen, 
      handleSubmit, handleSetDefaultAddress,
      modalMode, setModalMode, 
      login, setLogin,
      handleDelete, 
      houseNumber, setHouseNumber, 
      companyName, setCompanyName, 
      newAddress, setNewAddress,
      email, setEmail, 
      comments, setComments,

      addresses, setAddresses,
      customers, setCustomers,
      companies, setCompanies,
      preferences, setPreferences,

      editAddressIndex, setEditAddressIndex,
      editCustomerIndex, setEditCustomerIndex,
      editCompanyIndex, setEditCompanyIndex,
      editPreferenceIndex, setPreferenceIndex,

      currentEdit, setCurrentEdit,
      currentCustomer, setCustomersEdit,
      currentCompany, setCompanyEdit,
      currentPreference, setPreferencesEdit,
    
     
      dietType, setDietType, description, setDescription, nip, setNip, togglePopup, popupType, setPopupType, companyStatus, setCompanyStatus,
      dietName, setDietName, dietDescription, setDietDescription, 
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
