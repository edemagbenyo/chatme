import React, { Component } from 'react';
import './App.css';
import  Chatkit from "@pusher/chatkit-client";
import {instanceLocator, tokenUrl} from './config';
import RoomList from './components/chat/RoomList';
import MessageList from './components/chat/MessageList';
import NewRoomForm from './components/chat/NewRoomForm';
import SendMessageForm from './components/chat/SendMessageForm';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      messages:[]
    }
  }

  componentDidMount(){
    console.log("Hi, we are mounted")
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'edem',
      tokenProvider: new Chatkit.TokenProvider({ url: tokenUrl })
    });

    chatManager.connect()
    .then(currentUser=>{
      currentUser.subscribeToRoom({
        roomId:'19410020',
        hooks:{
          onMessage:message => {
            this.setState({
              messages: [...this.state.messages,message]
            });
          }
        },
        messageLimit:20
      })
    });
  }

  render() {
    return (
      <div>
        <RoomList />
        <MessageList messages = {this.state.messages} />
        <NewRoomForm />
        <SendMessageForm />
      </div>
    );
  }
}


export default App;
