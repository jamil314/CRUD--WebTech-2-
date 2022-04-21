import React, { useEffect, useState } from "react";
import Create from "./create";
const Menu = () =>{
    const [createMode, setCreateMode] = useState(false)
    async function authUser(){
        const response = await fetch('http://localhost:3001/api/auth', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          },
        })
        const res = await response.json();
        console.log(res);
        if(res.code === 403){
          removeToken() 
          window.location.href = '/login';
        }
      }
    useEffect(() => {
    authUser()
    }, [])
        
    function removeToken(){
      localStorage.removeItem('userID')
      localStorage.removeItem('token')
    }

    function createDone(){
      setCreateMode(false)
    }

    return (
      <div className="menuHolder">
        <div className="menu">
            <input type="text" placeholder="Search" />
            <a href="/home"> Home </a>
            <a href="/profile"> Profile </a>
            <button onClick={() => setCreateMode(true)}>Create</button>
            <Create trigger={createMode} done={createDone}>
                <button onClick={() => setCreateMode(false)}>Cancel</button>
            </Create>
            <a href="/login" onClick={removeToken}> logout </a>
        </div>
      </div>
      );
}

export default Menu;