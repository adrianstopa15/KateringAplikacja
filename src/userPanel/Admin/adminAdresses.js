// import axios from "axios";
// import "../profilePages.css";
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";




export default function adminAdresses() {


  // useEffect(() => {
  //   const fetchAddresses = async () => {
  //     try {
  //       const getCookieValue = (name) => {
  //         const value = `; ${document.cookie}`;
  //         const parts = value.split(`; ${name}=`);
  //         if (parts.length === 2) return parts.pop().split(';').shift();
  //         return null;
  //       };
  //       const authToken = getCookieValue("authToken");
  
  //       const response = await axios.get(
  //         `http://localhost:8080/showAddresses`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${authToken}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };
 
  //   fetchAddresses();
  // }, []);


    return (
      <div>
        <div className="ml-s mt-s">
          <h1 className="h1-regular mb-m">Adresy Użytkowników:</h1>
        </div>
      </div>
    );
  }
  