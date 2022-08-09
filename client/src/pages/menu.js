import React, { useEffect, useState } from "react";
import Create from "./create";
import Switch from "./switch";
const Menu = () =>{
    const [createMode, setCreateMode] = useState(false)
    const [loggedIn, setloggedIn] = useState(false)
    async function auth(){
        if(localStorage.getItem('token') === null){
            setloggedIn(false)
            localStorage.removeItem('userId')
            return;
        }
        const response = await fetch('http://localhost:3001/user/auth', {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token'),
            },
        })
        if(await response.status === 200){
            setloggedIn(true)
            localStorage.setItem('userId', await response.json().userId)
        } else {
            setloggedIn(false)
            localStorage.removeItem('userId')
        }
    }
    useEffect(() => {
        auth();
    }, [])
        
    function logOut(){
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        setloggedIn(false)
        window.location.href='/login'
    }

    function createDone(){
      setCreateMode(false)
    }

    const gotoProfile = () =>{
        if(loggedIn){
            const userID = localStorage.getItem('userID')
            window.location.href='/profile/'+userID
        }else {
            alert('You must be logged in to view your profile')
            window.location.href='/login'
        }
    }

    return (
      <div className="menuHolder">
        <div className="menu">
            <input type="text" placeholder="Search" />
            <button onClick={() => window.location.href='/home'}>Home</button>
            <button onClick={gotoProfile}>Profile</button>
            <button onClick={() => setCreateMode(true)}>Create</button>
            <Create trigger={createMode} done={createDone}>
                <button onClick={() => setCreateMode(false)}>Cancel</button>
            </Create>
            {loggedIn ? 
                <button onClick={logOut}>Logout</button> : 
                <button onClick={() => window.location.href='/login'}>Login</button>}
            <Switch/>
        </div>
      </div>
      );
}

export default Menu;