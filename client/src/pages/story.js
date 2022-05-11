import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Menu from "./menu";
import StoryCard from "./storyCard";

function Story(){
    const { id } = useParams();
    return (
        <>
        <div>
            <Menu />
        </div>
        <div className="App center">
            <StoryCard storyId={id} showFull={true}/>
        </div>
        </>
    )
}

export default Story;