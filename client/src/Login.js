import React from "react";
import { user_Create } from "./services/user.service";

class Login extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  userCreateRequest = () => {
    let payload = this.createPayload();
    user_Create(payload);
  };

  createPayload = () => {
    let payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    return payload;
  };

  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <div className="form-group" style={{ marginTop: "10em" }}>
          <label>First Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <br />
          <input
            className="form-control"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <br />
          <input
            className="form-control"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>
        <br />
        <button
          className="form-control btn btn-primary"
          type="button"
          onClick={this.userCreateRequest}
        >
          Send
        </button>
      </div>
    );
  }
}

export default Login;
