import React, { useState, useEffect } from "react";

function EditStory(prop) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(0);
    const [done, setDone] = useState(false);
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
        alert("Story Updated")
        // setDone(true);
        prop.done()
      }


      useEffect(() => {
        console.log(prop);
        setTitle(prop.title)
        setBody(prop.body)
        setId(prop.id)
        }, [prop])


  return (prop.trigger === prop.id && !done? (
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