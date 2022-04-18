import React, { useState } from "react";
const Home = () => {

    console.log("Home is running");
    const token = localStorage.getItem('token');
    console.log(token);
  return (
    <div className="App">
        <h1>Home</h1>
    </div>
  );
}

export default Home;
