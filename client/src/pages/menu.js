import React, { useEffect } from "react";
const Menu = () =>{
    async function authUser(){
        const response = await fetch('http://localhost:3001/api/auth', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          },
        })
        const res = await response.json();
        console.log(res);
        if(res.code === 403) 
          window.location.href = '/login';
      }
    useEffect(() => {
    authUser()
    }, [])
        
    async function removeToken(){
        localStorage.removeItem('token')
        }



    return (
        <div className="App">
            <a href="/home"> Home </a>
            <a href="/profile"> Profile </a>
            <a href="/create"> create </a>
            <a href="/login" onClick={removeToken}> logout </a>
        </div>
      );
}

export default Menu;