import React, { useState } from "react";

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValidationMsg, setUsernameValidationMsg] = useState(' ');
  const [usernameValidationColor, setUsernameValidationColor] = useState('Green');
  const [passwordValidationMsg, setPasswordValidationMsg] = useState(' ');
  const [passwordValidationColor, setPasswordValidationColor] = useState('Green');
  const [passwordLengthValidationMsg, setPasswordLengthValidationMsg] = useState(' ');
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
    if(data.status === 'ok'){ 
      alert('Registered User')
      window.location.href = '/login';
    }
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

    <div class='App2 center'>
      <div className='card2 center' id="card_reg">
        <h1>Register</h1>
        <div className='login center2'>

        <div className='continue_with center'>
            <button className='login_shape'>Continue With Google</button>
            <button className='login_shape'>Continue With Facebook</button>
            <button className='login_shape'>Continue With Apple</button>
            <button className='login_shape'>Continue With Microsoft</button>
          </div>


          <div className='login_with_cred left'>
            <input
              className='login_shape'
              value={name} 
              onChange={e => setName(e.target.value)}
              type="text" 
              placeholder="Name" 
            />
            <input
              className='login_shape'
              value={email} 
              onChange={e => setEmail(e.target.value)}
              type="text" 
              placeholder="Email" 
            />
            <div className='linear'>
              <input
                className='login_shape'
                value={username} 
                onChange={e =>[setUsername(e.target.value), validateUsename(e.target.value)]}
                type="text" 
                placeholder="Username" 
              />
              <p style={{color:usernameValidationColor}}>{usernameValidationMsg}</p>
            </div>
            <div className='linear'>
              <input
                className='login_shape'
                value={password} 
                onChange={e => [setPassword(e.target.value), validatePasswordLength(e.target.value)]}
                type="text" 
                placeholder="Password" 
              />
              <p style={{color:passwordLengthValidationColor}}>{passwordLengthValidationMsg}</p>
            </div>
            <div className='linear'>
              <input
                className='login_shape'
                onChange={e => validatePassword(e.target.value)}
                type="text" 
                placeholder="Confirm Password" 
              />
              <p style={{color:passwordValidationColor}}>{passwordValidationMsg}</p>
            </div>
          </div>
          
          

        </div>
        <div className='center'>
            <button className='login_shape' onClick={registerUser}>Register</button>
            <pre className='linear'>
              Have an account? <a href="/login">Login</a>
            </pre>
          <pre className='linear '>
            By continuing, you agree to our <a href='/terms'>Terms of Service</a> and <a href='/privacy'>Privacy Policy</a>.
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Register;
