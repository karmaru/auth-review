import React from "react";
import routes from "./routes";
import "./App.css";
import axios from "axios";
import store from "./store";
import { withRouter } from "react-router-dom";
import { SAVE_USER } from "./ducks/reducer";

class App extends React.Component {
  componentDidMount() {
    axios
      .get("/auth/current")
      .then(res => {
        store.dispatch({
          type: SAVE_USER,
          payload: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Not logged in");
      });
  }

  render() {
    return (
      <div className="App">
        <h1>AUTH Review</h1>
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
