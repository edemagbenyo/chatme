import React from "react";


const DUMMY_DATA = [
    {
        senderid:'edem',
        message:'sup??'
    },
    {
        senderid:'john',
        message:'Cool man'
    },
    {
        senderid:'mike',
        message:'Can we have the cash??'
    },
    {
        senderid:'edem',
        message:'relax man!!'
    },
];
export default class MessageList extends React.Component{
    render(){
        const messages = this.props.messages;
        return (
        <div className="message-list">
            {
                messages.map((message,index)=>{
                    return(<div key={index}>
                         <div className="message-username">{message.senderId}</div>
                         <div className="message-username">{message.text}</div>
                        </div>);
                })
            }
        </div>
        );
    }
}