import React from "react";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  changeNameState = (event) => {
    this.setState({ name: event.target.value });
  };

  changeEmailState = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordState = (event) => {
    this.setState({ password: event.target.value });
  };

  registerUser = (event) => {
    fetch("https://protected-crag-39335.herokuapp.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.email) {
          this.props.updateUser(result);
          this.props.changeRoute("home");
        }
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div className="signin-container">
        <div className="card signin-card">
          <form action=""></form>
          <h2 className="input-margin">Register</h2>
          <input
            className="input-box input-margin"
            type="text"
            id="name"
            placeholder="full name"
            onChange={this.changeNameState}
          />
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
            id="register"
            onClick={this.registerUser}
          >
            Register
          </button>
          <h2 className="input-margin">Already registered?</h2>
          <button
            className="button button-size input-margin"
            type="button"
            id="sign-in"
            onClick={() => this.props.changeRoute("signin")}
          >
            Sign-in
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
