import React, { useState } from "react";

function Login() {
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
  }

  return (
    <div class='App'>
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
      </form>
    </div>
  );
}

export default Login;
