
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // <- dodany Link
import http from '../api/http';
import {SERVER_URL} from "../consts";

const BACKEND_URL = SERVER_URL;

const SuccessStripe = () => {
  const navigate = useNavigate();
  const location = useLocation();


  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }          //ok

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }    //ok



useEffect(() => {

const assignAccesses = async () => {
    const customersRes = await http.get(`${BACKEND_URL}/customers`);
   
 
const foundUser = getCookie('user')?.split(';')[0];
 if (!foundUser) {
    navigate('/', { replace: true });
    return;
  }

   const myUser = customersRes.data.find(c => c.login === foundUser);
          if (!myUser) {
            navigate('/', { replace: true });
            return;
          }



          const newAccesses = getCookie('newaccesses') || '';
          const finalAccesses = myUser.accesses ? `${myUser.accesses};${newAccesses}` : newAccesses;
           await http.put(`${BACKEND_URL}/customers/${myUser._id}`, { accesses: finalAccesses });
           deleteCookie('newaccesses');
}




assignAccesses();







          

          
          

       

    
}, [location, navigate])






 

  return (
    <div className="greatSuccess">
      <h1>🎉 Płatność zakończona sukcesem! Dostęp do kursów został przyznany.</h1>
      <p>
        <Link to="/moje-kursy">Przejdź do Moje kursy</Link>
      </p>
    </div>
  ); 
};

export default SuccessStripe;
