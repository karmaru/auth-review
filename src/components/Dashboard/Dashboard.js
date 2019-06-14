import React, { Component } from "react";
import store from "../../store";
import { Redirect } from "react-router-dom";
import { CLEAR_USER } from "../../ducks/reducer";
import axios from "axios";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  logout = () => {
    axios.post("/auth/logout").then(res => {
      store.dispatch({
        type: CLEAR_USER
      });
      this.props.history.push("/login");
    });
  };

  render() {
    const reduxState = store.getState();
    if (!reduxState.id) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h1>Dashboard</h1>
        {reduxState.email}
        <br></br>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
