// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import axios from "axios";


export default function AdminList() {
//   const [customers, setCustomers] = useState([]);

//   const {
//       firstName, setFirstName,
//       lastName, setLastName,
//       phone, setPhone} = useAuth();

//   useEffect(() => {
//       const fetchCustomers = async () => {
//         try {
//           const getCookieValue = (name) => {
//             const value = `; ${document.cookie}`;
//             const parts = value.split(`; ${name}=`);
//             if (parts.length === 2) return parts.pop().split(';').shift();
//             return null;
//           };
//           const authToken = getCookieValue("authToken");
    
//           const response = await axios.get(
//             `http://localhost:8080/showCustomers`,
//             {
//               headers: {
//                 Authorization: `Bearer ${authToken}`,
//               },
//             }
//           );
//           setCustomers(response.data);
//         } catch (error) {
//           console.error("Error fetching cutomers:", error);
//         }
//       };
//       fetchCustomers();
//     }, []);

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//     };

    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Lista użytkowników:</h1>
        </div>
      </div>
    );
  }
  