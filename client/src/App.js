import React from "react";
import {BrowserRouter , Routes,  Route} from 'react-router-dom';
import Create from "./pages/create";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Story from "./pages/story";
const App = () => {
	document.body.classList.add(localStorage.getItem('theme'));
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/home" element={<Home/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/profile/:id" element={<Profile/>} />
				<Route path="/story/:id" element={<Story/>} />
				<Route path="/Create" element={<Create/>} />
				<Route path="*" element={<NotFound code={404} msg={"Page Not Found"}/>} />
			</Routes>
		</BrowserRouter>
	);
}
export default App;

