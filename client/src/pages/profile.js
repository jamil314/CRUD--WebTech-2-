import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Menu from './menu'
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import StoryCard from "./storyCard";
import NotFound from "./notFound";

const Profile = () =>{
    const {id} = useParams();
    let owner = id!==undefined? id : localStorage.getItem("userID");
	
    const [profile, setProfile] = useState({})
    const [editProfileMode, setEditProfileMode] = useState(false)
    const [changePasswordMode, setChangePasswordMode] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
	const [error, setError] = useState(false)
	const [errorCode, setErrorCode] = useState(false)
	const [errorMsg, setErrorMsg] = useState(false)



	const [stories, setStories] = useState([])
	async function getStories(){
		const response = await fetch('http://localhost:3001/story/from/'+owner, {
			method: 'GET',
		})
		const data = await response.json();
		console.log(data);
		setStories(data)
		console.log(stories);
	}

    async function getProfile(){
        const response = await fetch('http://localhost:3001/user/byid/'+owner, {
			method: 'GET',
        })
		const status = await response.status;
		switch (status) {
			case 200:
				const data = await response.json();
				setProfile(data)
				break;
			case 404:
				setError(true)
				setErrorCode(404)
				setErrorMsg("User Not Found")
				break;
			default:
				setError(true)
				setErrorCode(status)
				setErrorMsg("Unknown error")
		}
    }

    async function authUser(){
		const user = localStorage.getItem('userID')
		if(user === owner){
			setIsOwner(true)
		}
	}

  
    useEffect(() => {
        authUser()
		getProfile()
		getStories()
    }, [])


	const editProfileDone = () =>{
		setEditProfileMode(false)
		getProfile()
	}

	const changePasswordDone = () =>{
		setChangePasswordMode(false)
	}

    return ( 
		error? <NotFound code={errorCode} msg={errorMsg} /> :
        <><Menu />
        <div className="App center">
			<div className="profile">
            	<pre>Name: {profile.name}</pre>
				<pre>Username: {profile.username}</pre>
				<pre>Email: {profile.email}</pre>
				<pre>Phone: {profile.phone_number}</pre>
				<pre>Stories: {profile.stories}</pre>
				<div className="linear">
            		{isOwner ? <button className="btn" onClick={() => setEditProfileMode(true) }>Edit Profile</button>:<button>Poke</button>}
					<EditProfile trigger={editProfileMode} profile={profile} done={editProfileDone}>
						<button className="btn" onClick={() => setEditProfileMode(false)}>Cancel</button>
					</EditProfile>

					{isOwner ? <button onClick={() => setChangePasswordMode(true) }>Change Password</button>:null}
					<ChangePassword trigger={changePasswordMode} profile={profile} done={changePasswordDone} >
						<button onClick={() => setChangePasswordMode(false)}>Cancel</button>
					</ChangePassword>
            	</div> 
          	</div>
			{stories.map((val)=> {return <StoryCard storyId={val.id} showFull={false}/>})}
        </div></>
      );
}

export default Profile;