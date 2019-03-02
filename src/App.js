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
      messages:[],
      rooms:[],
      joinedRooms:[],
      roomId:null
    }

    this.sendMessage = this.sendMessage.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.subscribeRoom = this.subscribeRoom.bind(this);
  }

  componentDidMount(){
    console.log("Hi, we are mounted")
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'john',
      tokenProvider: new Chatkit.TokenProvider({ url: tokenUrl })
    });

    chatManager.connect()
    .then(currentUser=>{
      this.currentUser = currentUser;
      
      this.getRooms();
    })
    .catch(error =>console.log("Error connecting....."));
  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    });
    
  }
  subscribeRoom(roomId){
    this.setState({
      messages:[]
    });
    this.currentUser.subscribeToRoom({
      roomId:roomId,
      hooks:{
        onMessage:message => {
          this.setState({
            messages: [...this.state.messages,message]
          });
        }
      },
      messageLimit:20
    }).then(room=>{
      this.setState({
        roomId:room.id
      });
      this.getRooms();
    })
    .catch(err=>console.log("Could not join room"))
  }
  getRooms(){
    this.currentUser.getJoinableRooms()
      .then(rooms => {
        this.setState({
          rooms:rooms,
          joinedRooms:this.currentUser.rooms
        })
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      });
  }

  render() {
    return (
      <div>
        <RoomList roomId={this.state.roomId} rooms={[...this.state.joinedRooms, ...this.state.rooms]} subscribeRoom={this.subscribeRoom}  />
        <MessageList messages = {this.state.messages} />
        <NewRoomForm />
        <SendMessageForm  sendMessage = {this.sendMessage}/>
      </div>
    );
  }
}


export default App;
