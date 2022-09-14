import React from "react";

const Register = ({ onRouteChange }) => {
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
        />
        <input
          className="input-box input-margin"
          type="email"
          id="email"
          placeholder="email"
        />
        <input
          className="input-box input-margin"
          type="password"
          id="password"
          placeholder="password"
        />
        <button
          className="button button-size input-margin"
          type="button"
          id="register"
          onClick={() => onRouteChange("home")}
        >
          Register
        </button>
        <h2 className="input-margin">Already registered?</h2>
        <button
          className="button button-size input-margin"
          type="button"
          id="sign-in"
          onClick={() => onRouteChange("signin")}
        >
          Sign-in
        </button>
      </div>
    </div>
  );
};

export default Register;
