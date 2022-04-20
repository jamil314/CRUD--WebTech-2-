import React, { useState, useEffect } from "react";

function EditProfile(prop) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function editProfile(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/editprofile', {
            method: 'POST',
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
          })
          const res = await response.json();
          console.log(res);
          alert("Profile Updated")
          window.location.href = '/profile'
    }

    useEffect(() => {
        setName(prop.name)
        setEmail(prop.email)
        setPassword(prop.password)
        console.log(name, email, password);
    }, [])

  return (prop.trigger ? ( 
      <div>
          <h1>Edit Profile</h1>
            <form onSubmit={editProfile}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
                <br/>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                />
                <br/>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="text"
                />
                <br/>
                <input type="submit" value="Update" />
            </form>

        {prop.children}
      </div>
  ) :"")
}

export default EditProfile