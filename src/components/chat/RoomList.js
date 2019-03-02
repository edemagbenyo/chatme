import React from "react";

export default class RoomList extends React.Component{
    
   
    render(){
        return (
            <div>
                <h3>List of Rooms</h3>
            <ul className="rooms">
                {
                    this.props.rooms.map(room => (<li className="room"> <a href="#" onClick={()=>this.props.subscribeRoom(room.id)}> # {room.name} </a></li>))
                }
        </ul>
        </div>
        );
    }
}