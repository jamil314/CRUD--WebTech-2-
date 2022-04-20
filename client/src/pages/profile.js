import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Menu from './menu'
import EditStory from "./EditStory";
import EditProfile from "./EditProfile";

const Profile = () =>{
    const {id} = useParams();

    let owner = id;

    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({})
    const [editStoryMode, setEditStoryMode] = useState(-1)
    const [editProfileMode, setEditProfileMode] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    async function getStories(){
      const response = await fetch('http://localhost:3001/api/getsoriesfrom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner
        }),
      })
      const data = await response.json();
      // console.log(data.data, "###");
      setStories(data.data)
      console.log(stories, "+++")
    }

    async function getProfile(){
        console.log('Getting profile for: ', owner);
        const response = await fetch('http://localhost:3001/api/getprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                owner
            }),
        })
        const data = await response.json();
        setProfile(data.data)
      }

      async function authUser(){
          console.log("AUTHINGGGGGGGGGGGG: ", localStorage.getItem('token'))
          const response = await fetch('http://localhost:3001/api/auth', {
            method: 'GET',
            headers: {
              'x-access-token': localStorage.getItem('token')
            },
          })
          const res = await response.json();
          console.log("RESULT: ", res.id);
          if(res.code === 403) window.location.href = '/login'
          else {
              if(owner === undefined){
                owner = res.id
                setIsOwner(true)
              } else if(parseInt(owner) === res.id) setIsOwner(true)
              console.log("OWNER ID: ", owner);
              getStories()
              getProfile()
            }
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
        authUser()
      }, [])

    return (
        <><Menu /><div className="App">
            <h1>Profile</h1>
            <p>Name: {profile.name}</p>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            {isOwner && <button onClick={() => setEditProfileMode(true)}>Edit Profile</button>}
            <EditProfile trigger={editProfileMode} name={profile.name} email={profile.email} password={profile.password}>
                <button onClick={() => setEditProfileMode(false)}>Cancel</button>
            </EditProfile>
            
            {
                stories.map((val)=> {
                    return (
                        <div>
                            <p>Title: {val.title} | Published on: {val.create_time}</p>
                            <p>{val.content}</p>
                            {isOwner?<button onClick={() => setEditStoryMode(val.id)}>Edit Post</button>:null}
                            {isOwner?<button onClick={() => deletePost(val.id)}>Delete</button>:null}
                            <EditStory trigger={editStoryMode} title={val.title} body={val.content} id={val.id}>
                                <button onClick={() => setEditStoryMode(-1)}>Cancel</button>
                            </EditStory>
                        </div>
                      )
                })
            }
        </div></>
      );
}

export default Profile;