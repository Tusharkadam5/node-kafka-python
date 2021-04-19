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
    var socket = socketClient (SERVER);
    socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
});
socket.on('broadcast', (data) => {
  console.log(data);
  this.setState({
    content: data
  });

});
    // this.setState({
    //          content: "Hello World!"
    //        });

    // UserService.getPublicContent().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );
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
