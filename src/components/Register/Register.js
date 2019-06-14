import React, { Component } from "react";
import axios from "axios";
import store from "../../store";
import { SAVE_USER } from "../../ducks/reducer";
import { Link, Redirect } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register() {
    const { email, password } = this.state;

    axios
      .post("/auth/register", { email, password })
      .then(res => {
        store.dispatch({
          type: SAVE_USER,
          payload: res.data
        });
        this.props.history.push("/");
      })
      .catch(err => {
        alert("User Already Exist Try Logging IN");
      });
  }

  render() {
    const reduxState = store.getState();

    if (reduxState.id !== 0) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={this.handleInput}
          value={this.state.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={this.handleInput}
          value={this.state.password}
        />
        <button onClick={() => this.register()}>Register</button>
        <div>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <button>Login</button>
            </Link>{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
