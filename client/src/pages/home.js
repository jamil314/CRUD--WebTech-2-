import React, { useState, useEffect } from "react";
import EditStory from "./EditStory";
import Menu from './menu'
const Home = () => {
  const [stories, setStories] = useState([])
  const [editStoryMode, setEditStoryMode] = useState(-1)

  async function getStories(){
    console.log(localStorage.getItem('userID'), "USERID")
    console.log('getting stories')
    const response = await fetch('http://localhost:3001/api/getsories', {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token')
      },
    })
    const data = await response.json();
    setStories(data.data)

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
    getStories()
    }, [])

    function editDone(){
      setEditStoryMode(-1)
    }

  return (
    <>
    <div>
      <Menu />
    </div>
    
    <div className="App center">
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
                val.uploader === parseInt(localStorage.getItem('userID')) ?
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

export default Home;
