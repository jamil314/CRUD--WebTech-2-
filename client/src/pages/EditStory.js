import React, { useState, useEffect } from "react";

function EditStory(prop) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);
    async function editStory(event){
        event.preventDefault();
        const response = await fetch('http://localhost:3001/story/'+id, {
			method: 'PATCH',
			headers: {
				'authorization': localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
				body: JSON.stringify({
				title,
				body,
				id
			}),
        })
		const status = await response.status;
		switch (status) {
			case 204:
				alert('Story updated')
				prop.done(title, body)
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


	useEffect(() => {
		setTitle(prop.title)
		setBody(prop.body)
		setId(prop.id)
	}, [prop])


  return (prop.trigger === prop.id ? (
    <div className='popup'>
        <div className='popup_card center'>
            <div className="popup_header">
              <h1>Edit Story</h1>
            </div>
            <div className="popup_body">
              <div className="left">
                Title:
              </div>
              <textarea
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  type="text" 
              />
              <div className="left">
                Story:  
              </div>
              <textarea
                className="input_story"
                  value={body} 
                  onChange={e => setBody(e.target.value)}
                  type="text" 
              />
            </div>
            <div className="popup_footer">
              <button onClick={editStory}>Update</button>
              {prop.children}
            </div>
        </div>
    </div>
  ) :"")
}

export default EditStory