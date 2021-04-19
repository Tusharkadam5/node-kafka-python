import React, { Component } from "react";
import socketClient  from "socket.io-client";
import UserService from "../services/user.service";
const SERVER = "http://localhost:8000";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "Hello World!"
    };
  }

  componentDidMount() {
    // var socket = socketClient (SERVER);
    var socket = socketClient('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

    socket.on('broadcast', (socket) => {
      console.log(socket);

      this.setState({
        content: socket
      });

    });
    // this.setState({
    //          content: "Hello World!"
    //        });

  
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
