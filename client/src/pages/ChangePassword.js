import React, { useState, useEffect } from "react";

function ChangePassword(prop) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [passwordVerificationMsg, setPasswordVerificationMsg] = useState('');
	const [passwordVerificationColor, setPasswordVerificationColor] = useState('Green');
	const [passwordValidationMsg, setPasswordValidationMsg] = useState('');
	const [passwordValidationColor, setPasswordValidationColor] = useState('Green');
	const [passwordMatchMsg, setPasswordMatchMsg] = useState('');
	const [passwordMatchColor, setPasswordMatchColor] = useState('Green');
    
    
    async function changePassword(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/user/changepassword', {
            method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword,
                newPassword
            }),
          })
            const status = await response.status;
            switch(status){
                case 204:
                    alert('Password changed successfully');
                break;
                case 401:
                    alert('Invalid old password');
                break;
                case 500:
                    alert('Server error');
                break;
            }
            prop.done();

    }


    async function verifyPassword(password){
        if(password.length <6){
            setPasswordVerificationMsg('Wrong password')
            setPasswordVerificationColor('red')
            return;
        }
        
        const response = await fetch('http://localhost:3001/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
				body: JSON.stringify({
				username: prop.profile.username,
				password
			}),
		})
		const status = await response.status;
		switch (status) {
			case 200:
                setPasswordVerificationMsg('Password verified')
                setPasswordVerificationColor('Green')
				break;
			case 401:
                setPasswordVerificationMsg('Wrong password')
                setPasswordVerificationColor('red')
                break;
		}
        
      }
    
       
      function matchPassword(tmpPass1, tmpPass2){
		setPasswordMatchMsg( tmpPass1 === tmpPass2 ? 'Password matched': 'Password did not match')
		setPasswordMatchColor(tmpPass1 === tmpPass2 ? 'Green' : 'Red')
	}

	function validatePassword(tempPassword){
		setPasswordValidationMsg( tempPassword.length<6 ? 'Password must be at least 6 characters long': '')
		setPasswordValidationColor(tempPassword.length<6 ? 'Red' : 'Green')
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
                    onChange={e => [setNewPassword(e.target.value), validatePassword(e.target.value)
                        , matchPassword(e.target.value, password2)]}
                    type="text" 
                    placeholder="New Password" 
                />
                <pre style={{color:passwordValidationColor}}>
                    {passwordValidationMsg}
                </pre>
                <input
                    onChange={e => [setPassword2(e.target.value), matchPassword(newPassword, e.target.value)]}
                    type="text" 
                    placeholder="Confirm Password" 
                />
                <pre style={{color:passwordMatchColor}}>
                    {passwordMatchMsg}
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