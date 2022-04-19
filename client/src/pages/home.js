import React, { useEffect } from "react";
import Menu from './menu'
const Home = () => { 
  async function authUser(){
    const response = await fetch('http://localhost:3001/api/auth', {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    })
    const res = await response.json();
    console.log(res);
    if(res.code === 403) 
      window.location.href = '/login';
  }
  useEffect(() => {
    authUser()
	}, [])

  return (
    <><Menu /><div className="App">
      <h1>Home</h1>
    </div></>
  );
}

export default Home;
