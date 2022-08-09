import React from "react";
const Switch = () => {

    const changeTheme = () => {
        let theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            localStorage.setItem('theme', 'light');
            document.body.classList.replace('dark', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
            document.body.classList.replace('light', 'dark');
        }
    }

    return (
        <label className="switch" >
            <input type="checkbox" />
            <div className="slider" onClick={changeTheme}></div>
        </label>
    )
}
export default Switch;
