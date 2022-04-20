import React from "react";
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import Create from "./pages/create";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Welcome from "./pages/Welcome";
const App = () => {
  console.log("App is running");
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="/Create" element={<Create/>} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;

