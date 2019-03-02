import React from "react";

export default class RoomList extends React.Component{
    
   
    render(){
        const orderedRooms = [...this.props.rooms].sort((a,b)=>a.id - b.id);
        
        return (
            <div>
                <h3>List of Rooms</h3>
            <ul className="rooms">
                {
                    
                    orderedRooms.map(room => {
                        const active = this.props.roomId === room.id ? "active":"";
                        return (<li className={"room " + active}> <a href="#" onClick={()=>this.props.subscribeRoom(room.id)}> # {room.name} </a></li>)
                    })
                }
        </ul>
        </div>
        );
    }
}