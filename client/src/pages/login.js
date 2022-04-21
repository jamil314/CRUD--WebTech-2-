import './../App.css'
import React, { useState } from "react";

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
      localStorage.setItem('userID', data.id);
      window.location.href = '/home';
    }
  }

  return (
    <div class='App2 center'>
      <div className='card2 center'>
        <h1>Login</h1>
        <div className='login center2'>
          <div className='login_with_cred center'>
            <input
              className='login_shape'
              value={username} 
              onChange={e => setUsername(e.target.value)}
              type="text" 
              placeholder="Username" 
            />
            <input
              className='login_shape'
              value={password} 
              onChange={e => setPassword(e.target.value)}
              type="text" 
              placeholder="Password" 
            />
            <button className='login_shape' onClick={loginUser}>Login</button>
            <pre className='linear'>
              Don't have an account? <a href="/register">Register now</a>
            </pre>
          </div>
          OR
          <div className='continue_with center'>
            <button className='login_shape'>Continue With Google</button>
            <button className='login_shape'>Continue With Facebook</button>
            <button className='login_shape'>Continue With Apple</button>
            <button className='login_shape'>Continue With Microsoft</button>
          </div>

        </div>
        <div className='center'>
          <pre className='linear '>
            By continuing, you agree to our <a href='/terms'>Terms of Service</a> and <a href='/privacy'>Privacy Policy</a>.
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Login;
