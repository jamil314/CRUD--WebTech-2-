import './../App.css'
import React, { useState } from "react";
import App from "../App";

function Login() {

  console.log("We are in login")

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event){
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data = await response.json();
    console.log(data);
    if(data.code === 200){
      localStorage.setItem('token', data.token);
      window.location.href = '/home';
    }
  }

  return (
    <div class='App'>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={username} 
          onChange={e => setUsername(e.target.value)}
          type="text" 
          placeholder="Username" 
        />
        <br/>
        <input
          value={password} 
          onChange={e => setPassword(e.target.value)}
          type="text" 
          placeholder="Password" 
        />
        <br/>
        <input type="submit" value="Login" />
        <br/>
        <p>Don't have an account?</p>
        <a href="/register">Register now</a>
      </form>
    </div>
  );
}

export default Login;
