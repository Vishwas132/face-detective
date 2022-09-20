import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  changeEmailState = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordState = (event) => {
    this.setState({ password: event.target.value });
  };

  signinUser = (event) => {
    fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          this.props.updateUser(result);
          this.props.onRouteChange("home");
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="signin-container">
        <div className="card signin-card">
          <h2 className="input-margin">Log-In</h2>
          <input
            className="input-box input-margin"
            type="email"
            id="email"
            placeholder="email"
            onChange={this.changeEmailState}
          />
          <input
            className="input-box input-margin"
            type="password"
            id="password"
            placeholder="password"
            onChange={this.changePasswordState}
          />
          <button
            className="button button-size input-margin"
            type="button"
            id="sign-in"
            onClick={this.signinUser}
          >
            Sign-In
          </button>
          <h2 className="input-margin">New user?</h2>
          <button
            className="button button-size input-margin"
            type="button"
            id="register"
            onClick={() => this.props.onRouteChange("register")}
          >
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default SignIn;
