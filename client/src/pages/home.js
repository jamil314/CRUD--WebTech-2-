import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
const Home = () => {
  console.log("Home is running");
  const token = localStorage.getItem("token");
  console.log(token);
  const { decodedToken, isExpired } = useJwt(token);
  console.log(decodedToken);
  console.log(isExpired);
  if(decodedToken == null){
    console.log("No token");
    console.log(decodedToken);
    // localStorage.removeItem("token");
    // window.location.href = "/login";
  }


  return (
    <div className="App">
        <h1>Home</h1>
    </div>
  );
}

export default Home;
