import React from "react";
import Message from './Message';


export default class MessageList extends React.Component{
    render(){
        const messages = this.props.messages;
        return (
        <div className="message-list">
            <h3>Our chats</h3>
            {
                messages.map((message,index)=>{
                    return(<Message key={index} username = {message.senderId} text={message.text} />);
                })
            }
        </div>
        );
    }
}