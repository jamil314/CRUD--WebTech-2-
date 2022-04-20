import React, { useState, useEffect } from "react";
import Menu from './menu'
const Home = () => {
  const [stories, setStories] = useState([])

  async function getStories(){
    console.log('getting stories')
    const response = await fetch('http://localhost:3001/api/getsories', {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    })
    const data = await response.json();
    // console.log(data.data, "###");
    setStories(data.data)
    console.log(stories, "+++")

  }

  useEffect(() => {
    getStories()
    }, [])


  return (
    <><Menu /><div className="App">
      <h1>Home</h1>
      {
        stories.map((val)=> {
          return (
            <div>
                <p>Title: {val.title} | Author: {val.author} | Published on: {val.create_time} </p>
                <p>{val.content}</p>
                <button>UpVote</button>
                <button>DownVote</button>
                <button>Comment</button>
            </div>
          )
        })
      }
    </div></>
  );
}

export default Home;
