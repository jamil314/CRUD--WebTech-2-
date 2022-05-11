import React, { useState, useEffect } from "react";

function EditProfile(prop) {
    const [name, setName] = useState(prop.profile.name);
    const [email, setEmail] = useState(prop.profile.email);
    const [phone, setPhone] = useState(prop.profile.phone_number);
    const [DOB, setDOB] = useState(prop.profile.date_of_birth);
    console.log(prop);
    async function editProfile(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/user', {
            method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                DOB,
                phone
            }),
        })
        const status = await response.status;
        switch (status) {
            case 204:
                alert('Profile updated successfully');
                prop.done();
                break;
            case 400:
                alert('Invalid input');
                break;
            default:
                alert('Something went wrong');
                prop.done();
        }
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
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                    type="text"
                />
                <input
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                />
                <input
                    value={phone}
                    placeholder="Phone Number"
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                />
                <input
                    value={DOB}
                    placeholder="Date of Birth"
                    onChange={e => setDOB(e.target.value)}
                    type="number"
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