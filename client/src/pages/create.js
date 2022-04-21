import React, { useState, useEffect } from "react";
const Create = (prop) =>{
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [done, setDone] = useState(false);

    async function createStory(event){
        event.preventDefault();
        const response = await fetch('http://localhost:3001/api/createstory', {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            body
          }),
        })
        const res = await response.json();
        console.log(res);
        alert("Created New Post")
        setTitle('')
        setBody('')
        prop.done()
      }

	  useEffect(() => {
        setDone(false)
        }, [prop])


      return (prop.trigger && !done? (
        <div className='popup'>
            <div className='popup_card center'>
                <div className="popup_header">
                  <h1>Create Story</h1>
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
                  <button onClick={createStory}>Post</button>
                  {prop.children}
                </div>
            </div>
        </div>
      ) :"")
}

export default Create;