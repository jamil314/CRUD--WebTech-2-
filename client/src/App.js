import React from "react";
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import Login from "./pages/login";
import Register from "./pages/register";
import Welcome from "./pages/Welcome";
const App = () => {
  console.log("App is running");
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </BrowserRouter>
  );
}
export default App;

