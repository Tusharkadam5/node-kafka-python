import React, { Component, useEffect } from "react";
import socketClient  from "socket.io-client";
import UserService from "../services/user.service";
const SERVER = "http://localhost:8000";
var socket = null;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Hello World!"
    };
  }
  
  componentDidMount() {

     socket = socketClient(SERVER, { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('broadcast', (socket) => {
      console.log(socket);

      this.setState({
        content: socket
      });

    });
  }
  componentWillUnmount() {
    if(socket){
     // socket.disconnect();
    }
  }
  
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
      </div>
    );
  }
}
