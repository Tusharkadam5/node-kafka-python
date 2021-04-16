import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.usersItem =[];
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
      
       this.usersItem = response.data;
       let tmpArray = []
       for (var i = 0; i < response.data.users.length; i++) {
           tmpArray.push(<li key={i}>{response.data.users[i].firstname+' '+response.data.users[i].lastname}</li> )
       }
        this.setState({
          users: tmpArray
        });
      },
      error => {
        this.setState({
          users:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    
    //var users = this.usersItem;
  
    return (
      <div className="container">
      <header className="jumbotron">
        <h3>User List</h3>
      </header>
      <div>
      <ul>
        {this.state.users}
      </ul>
      </div>
    </div>
    );
  }
}
