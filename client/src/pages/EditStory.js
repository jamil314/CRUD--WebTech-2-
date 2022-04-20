import React, { useState, useEffect } from "react";

function EditStory(prop) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);

    async function editStory(event){
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/editstory', {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            body,
            id
          }),
        })
        const res = await response.json();
        console.log(res);
        alert("Post Updated")
        window.location.href = '/profile'
      }


      useEffect(() => {
        setTitle(prop.title)
        setBody(prop.body)
        setId(prop.id)
        }, [])


  return (prop.trigger === prop.id? (
    <div className='popup'>
        <div className='App'>
            <h1>Edit</h1>
            <form onSubmit={editStory}>
            <input
                value={title} 
                onChange={e => setTitle(e.target.value)}
                type="text" 
            />
            <br/>
            <input
                value={body} 
                onChange={e => setBody(e.target.value)}
                type="text" 
            />
            <br/>
            <input type="submit" value="Update" />
            {prop.children}
            </form>
        </div>
    </div>
  ) :"")
}

export default EditStory