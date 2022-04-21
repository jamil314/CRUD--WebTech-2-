import React, { useState, useEffect } from "react";

function ChangePassword(prop) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordVerificationMsg, setPasswordVerificationMsg] = useState('');
    const [passwordVerificationColor, setPasswordVerificationColor] = useState('Red');
    const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
    const [passwordValidationColor, setPasswordValidationColor] = useState('Red');
    const [passwordLengthValidationMsg, setPasswordLengthValidationMsg] = useState('');
    const [passwordLengthValidationColor, setPasswordLengthValidationColor] = useState('Red');
    console.log(prop);
    async function changePassword(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/changepassword', {
            method: 'POST',
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            }),
          })
          const res = await response.json();
          console.log(res);
          alert("Password Changed")
          window.location.href = '/profile'
    }


    async function verifyPassword(password){
    
        if(password.length <6){
            setPasswordVerificationMsg('Wrong password')
            setPasswordVerificationColor('red')
            return;
        }
    
        const response = await fetch('http://localhost:3001/api/verifypassword', {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              password: password
          }),
        })
        const data = await response.json();
        console.log(data);
        setPasswordVerificationMsg(data.message)
        setPasswordVerificationColor(data.code===200 ? 'green' : 'red')
      }
    
        function validatePassword(confirmPassword){
            setPasswordValidationMsg( confirmPassword === newPassword ? 'Password matched': 'Password did not match')
            setPasswordValidationColor(confirmPassword === newPassword ? 'green' : 'red')
        }
    
        function validatePasswordLength(tempPassword){
            setPasswordLengthValidationMsg( tempPassword.length<6 ? 'Password must be at least 6 characters long': '')
            setPasswordLengthValidationColor(tempPassword.length<6 ? 'red' : 'green')
        }

  return (prop.trigger ? ( 
      <div className="popup">
            <div className="change_pass_pop center">
                <h1>Change Password</h1>
                <input
                    value={oldPassword} 
                    onChange={e => [setOldPassword(e.target.value), verifyPassword(e.target.value)]}
                    type="text" 
                    placeholder="Old Password" 
                />
                <pre style={{color:passwordVerificationColor}}>
                    {passwordVerificationMsg}
                </pre>
                <input
                    value={newPassword} 
                    onChange={e => [setNewPassword(e.target.value), validatePasswordLength(e.target.value)]}
                    type="text" 
                    placeholder="New Password" 
                />
                <pre style={{color:passwordLengthValidationColor}}>
                    {passwordLengthValidationMsg}
                </pre>
                <input
                    onChange={e => validatePassword(e.target.value)}
                    type="text" 
                    placeholder="Confirm Password" 
                />
                <pre style={{color:passwordValidationColor}}>
                    {passwordValidationMsg}
                </pre>
                <div className="linear">
                    <button className="btn" onClick={changePassword}>Save</button>
                    {prop.children}
                </div>
            </div>

      </div>
  ) :"")
}

export default ChangePassword