import React, { useState } from "react";

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValidationMsg, setUsernameValidationMsg] = useState('');
  const [usernameValidationColor, setUsernameValidationColor] = useState('Green');
  const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
  const [passwordValidationColor, setPasswordValidationColor] = useState('Green');
  const [passwordLengthValidationMsg, setPasswordLengthValidationMsg] = useState('');
  const [passwordLengthValidationColor, setPasswordLengthValidationColor] = useState('Green');

  async function registerUser(event){
    console.log(name, email, password)
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password
      }),
    })
    const data = await response.json();
    console.log(data);
  }

  async function validateUsename(tempUserName){
    console.log(tempUserName)

    if(tempUserName.length <6){
        setUsernameValidationMsg('Username must be at least 6 characters long')
        setUsernameValidationColor('red')
        return;
    }


    const response = await fetch('http://localhost:3001/api/validateUsername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: tempUserName
      }),
    })
    const data = await response.json();
    console.log(data);
    setUsernameValidationMsg(data.message)
    setUsernameValidationColor(data.code===200 ? 'green' : 'red')
  }

    function validatePassword(confirmPassword){
        setPasswordValidationMsg( confirmPassword === password ? 'Password matched': 'Password did not match')
        setPasswordValidationColor(confirmPassword === password ? 'green' : 'red')
    }

    function validatePasswordLength(tempPassword){
        setPasswordLengthValidationMsg( tempPassword.length<6 ? 'Password must be at least 6 characters long': '')
        setPasswordLengthValidationColor(tempPassword.length<6 ? 'red' : 'green')
    }

  return (
    <div class='App'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name} 
          onChange={e => setName(e.target.value)}
          type="text" 
          placeholder="Name" 
        />
        <br/>
        <input
          value={email} 
          onChange={e => setEmail(e.target.value)}
          type="text" 
          placeholder="Email" 
        />
        <br/>
        <input
          value={username} 
          onChange={e =>[setUsername(e.target.value), validateUsename(e.target.value)]}
          type="text" 
          placeholder="Username" 
        />
        <br/>
        <p style={{color:usernameValidationColor}}>
            {usernameValidationMsg}
        </p>
        <br/>
        <input
          value={password} 
          onChange={e => [setPassword(e.target.value), validatePasswordLength(e.target.value)]}
          type="text" 
          placeholder="Password" 
        />
        <br/>
        <p style={{color:passwordLengthValidationColor}}>
            {passwordLengthValidationMsg}
        </p>
        <br/>
        <input
          onChange={e => validatePassword(e.target.value)}
          type="text" 
          placeholder="Confirm Password" 
        />
        <br/>
        <p style={{color:passwordValidationColor}}>
            {passwordValidationMsg}
        </p>
        <br/>
        <input type="submit" value="Register" />
        <br/>
        <p>Have an account?</p>
        <a href="/login">Log in</a>
      </form>
    </div>
  );
}

export default Register;
