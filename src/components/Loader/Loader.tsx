import React from "react"
import './Loader.css';
export default function Loader(){
    return(
        <div className="w-full min-h-[6rem] flex items-center justify-center">
            <span className="loader"></span>
        </div>
    )
}