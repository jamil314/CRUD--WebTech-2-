import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Menu from './menu'
import EditStory from "./EditStory";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const Profile = () =>{
    const {id} = useParams();

    let owner = id;

    const [stories, setStories] = useState([])
    const [profile, setProfile] = useState({})
    const [editStoryMode, setEditStoryMode] = useState(-1)
    const [editProfileMode, setEditProfileMode] = useState(false)
    const [changePasswordMode, setChangePasswordMode] = useState(false)
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



    async function deleteStory(pid){
        console.log(pid)
        const response = await fetch('http://localhost:3001/api/deletestory', {
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

      function editDone(){
        setEditStoryMode(-1)
      }


    return (
        <><Menu /><div className="App center">
          <div className="profile">
            <pre>Name: {profile.name}</pre>
            <pre>Username: {profile.username}</pre>
            <pre>Email: {profile.email}</pre>
            <div className="linear">
              {isOwner ? <button className="btn" onClick={() => setEditProfileMode(true) }>Edit Profile</button>:<button>Poke</button>}

              <EditProfile trigger={editProfileMode} profile={profile} >
                  <button className="btn" onClick={() => setEditProfileMode(false)}>Cancel</button>
              </EditProfile>

              {isOwner ? <button onClick={() => setChangePasswordMode(true) }>Change Password</button>:null}
            <ChangePassword trigger={changePasswordMode} profile={profile} >
                <button onClick={() => setChangePasswordMode(false)}>Cancel</button>
            </ChangePassword>
            </div> 
          </div>

            

            {
                stories.map((val)=> {
                    return (
                      <div className="card">
                      <div className="card-header">
                        Posted by <a href={`/profile/${val.uploader}`}>{val.author}</a> on {val.create_time}
                      </div>
                      <div className="card-body">
                        <h1>{val.title}</h1>
                        <p>{val.content}</p>
                      </div>
                      <div className="card-footer">
                      {
                        isOwner ?
                        <div className="modify">
                          <button onClick={() => setEditStoryMode(val.id)}>Edit Story</button>
                          <button onClick={() => deleteStory(val.id)}>Delete</button>
                          <EditStory 
                            trigger={editStoryMode} 
                            title={val.title} 
                            body={val.content} 
                            id={val.id}
                            done={editDone}
                          >
                              <button onClick={() => setEditStoryMode(-1)}>Cancel</button>
                          </EditStory>
                        </div>
                        :
                        <div className="votes">
                          <button className="btn">UpVote</button>
                          {val.upvote-val.downvote}
                          <button className="btn">DownVote</button>
                        </div>
                      }
                        <div className="comment">
                          <button className="btn">Comment</button>
                        </div>
                      </div>
                    </div>
                    )
                })
            }
        </div></>
      );
}

export default Profile;