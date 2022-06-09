import React, {useEffect, useState} from "react";
import EditStory from "./EditStory";
import NotFound from "./notFound";

function StoryCard(prop){

    const id = parseInt(prop.storyId)

    const [deleted, setDeleted] = useState(false)
    const [storyTitle, setStoryTitle] = useState('Loading...')
    const [storyBody, setStoryBody] = useState('Lodaing...')
    const [story, setStory] = useState({})
    const [editStoryMode, setEditStoryMode] = useState(-1)
	const [error, setError] = useState(false)
	const [errorCode, setErrorCode] = useState(false)
	const [errorMsg, setErrorMsg] = useState(false)
    
    async function deleteStory(storyID){
		const response = await fetch('http://localhost:3001/story/'+id, {
			method: 'DELETE',
			headers: {
				'authorization': localStorage.getItem('token')
			}
		})
		const status = await response.status;
		switch (status) {
			case 204:
				alert('Story deleted')
				// window.location.href = '/home'
                setDeleted(true)
				break;
            case 401:
                alert('You are not logged in')
                window.location.href = '/login'
                break;
			case 403:
				alert('You are not the uploader of this story')
				break;
			case 404:
				alert('Story not found')
				break;
			case 500:
				alert('Something went wrong')
				break;
		}
    }
      
    
    async function getStory(){
        const response = await fetch('http://localhost:3001/story/'+id, {
            method: 'GET',
        })
        const status = await response.status;
        switch (status) {
            case 200:
                const data = await response.json();
                setStory(data)
                setStoryTitle(data.title)
                setStoryBody(data.body)
                break;
            case 404:
                setError(true)
                setErrorCode(404)
                setErrorMsg("Story Not Found")
                break;
            default:
                alert('Something went wrong')
        }
    }
    
    useEffect(() => {
        getStory()
    }, [])
    
    const trim=(str, maxLength) => {
        return str.length > maxLength ? str.slice(0, maxLength - 3) + '...' : str;
    }
    
    function editDone(title, body){
        setEditStoryMode(-1)
        setStoryTitle(title)
        setStoryBody(body)
    }

    return (
		error? <NotFound code={errorCode} msg={errorMsg} /> :
        deleted? <pre className="strikethrough">[Deleted]</pre> :
        <div className="card">
            <div className="card-header">
                <h1>{storyTitle}</h1>
                Posted by <a href={`/profile/${story.uploader}`}>{story.uploader_name}</a> on {new Date(story.uploaded_on).toLocaleDateString()}
            </div>
            {prop.showFull ? 
                <div className="card-body">
                    <p>{storyBody}</p>
                </div>
            :
                <div className="card-body">
                    <p>{trim(storyBody, 300)}</p>
                    <div className='readMore'>
                        <pre className='linear '>
                            <a href={`/story/${id}`}>Read more...</a>
                        </pre>
                    </div>
                </div>}
            <div className="card-footer">
                <div className="votes">
                    <button className="btn">UpVote</button>
                    {story.upvote-story.downvote}
                    <button className="btn">DownVote</button>
                </div>
                {
                story.uploader === parseInt(localStorage.getItem('userID')) ?
                    <div className="modify">
                        <button onClick={() => setEditStoryMode(story.id)}>Edit Story</button>
                        <button onClick={() => deleteStory(story.id)}>Delete</button>
                        <EditStory 
                            trigger={editStoryMode}
                            title={story.title}
                            body={story.body}
                            id={story.id} 
                            done={editDone}
                        >
                            <button onClick={() => setEditStoryMode(-1)}>Cancel</button>
                        </EditStory>
                    </div>
                :
                    null
                }
                <div className="comment">
                    <button className="btn">Comment</button>
                </div>
            </div>
        </div>
    )
}

export default StoryCard;