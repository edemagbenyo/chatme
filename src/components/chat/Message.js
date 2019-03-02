import React from "react";

export default function Message (props){
        const username = props.username
        const text = props.text
        return (
        <div className="message">
            <div className="message-username">{username}</div>
            <div className="message-username">{text}</div>
        </div>
        );
}

