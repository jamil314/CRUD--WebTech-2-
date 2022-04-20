import React, { useState, useEffect } from "react";
import Menu from './menu'
import Edit from "./edit";

const Profile = () =>{

    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({})
    const [editMode, setEditMode] = useState(-1)

    async function getStories(){
      const response = await fetch('http://localhost:3001/api/getsoriesfrom', {
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

    async function getProfile(){
        const response = await fetch('http://localhost:3001/api/getprofile', {
          method: 'GET',
          headers: {
            'x-access-token': localStorage.getItem('token')
          },
        })
        const data = await response.json();
        setProfile(data.data)
      }

    async function deletePost(pid){
        console.log(pid)
        const response = await fetch('http://localhost:3001/api/deletepost', {
            method: 'POST',
            headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:pid
            }),
        })
        const data = await response.json();
        console.log("DELETED!!!!")
        alert('Deleted!!!!')
        window.location.href = '/profile';
    }
  
    useEffect(() => {
      getStories()
      getProfile()
      }, [])

    return (
        <><Menu /><div className="App">
            <h1>Profile</h1>
            <p>Name: {profile.name}</p>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            {
                stories.map((val)=> {
                    return (
                        <div>
                            <p>Title: {val.title} | Published on: {val.create_time}</p>
                            <p>{val.content}</p>
                            <button onClick={() => setEditMode(val.id)}>Edit Post</button>
                            <button onClick={() => deletePost(val.id)}>Delete</button>
                            <Edit trigger={editMode} title={val.title} body={val.content} id={val.id}>
                                <button onClick={() => setEditMode(-1)}>Cancel</button>
                            </Edit>
                        </div>
                      )
                })
            }
        </div></>
      );
}

export default Profile;