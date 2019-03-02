import React from "react";

export default class SendMessageForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            message:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({
            message:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({
            message:""
        });
        this.props.sendMessage(this.state.message);
        
    }
    render(){
        return (
        <form className="send-message-form" onSubmit={this.handleSubmit}>
            <input placeholder="Enter your message here..." value={this.state.message } type="text" onChange={this.handleChange} />
        </form>
        );
    }
}