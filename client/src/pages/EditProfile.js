import React, { useState, useEffect } from "react";

function EditProfile(prop) {
    const [name, setName] = useState(prop.profile.name);
    const [email, setEmail] = useState(prop.profile.email);
    console.log(prop);
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
            }),
          })
          const res = await response.json();
          console.log(res);
          alert("Profile Updated")
          window.location.href = '/profile'
    }

    useEffect(() => {
        console.log(prop);
        setName(prop.profile.name);
        setEmail(prop.profile.email)
    }, [prop])

  return (prop.trigger ? ( 
      <div className="popup">
            <div className="edit_profile_popup">
                <h1>Edit Profile</h1>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                />
                <div className="linear">
                    <button className="btn" onClick={editProfile}>Save</button>
                    {prop.children}
                </div>
            </div>

      </div>
  ) : "")
}

export default EditProfile