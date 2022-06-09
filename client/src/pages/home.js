import React, { useState, useEffect } from "react";
import Menu from './menu'
import StoryCard from "./storyCard";
const Home = () => {
	const [stories, setStories] = useState([])

	async function getStories(){
		const response = await fetch('http://localhost:3001/story', {
			method: 'GET',
		})
		const data = await response.json();
		setStories(data)
	}

	useEffect(() => {
    	getStories()
	}, [])

	return (
	<><div>
		<Menu />
    </div>
	<div className="App center">
		{stories.map((val)=> {return <StoryCard storyId={val.id} showFull={false}/>})}
    </div></>
  );
}

export default Home;
