import React from "react";
import "./SignIn.css";

const SignIn = ({ onRouteChange }) => {
  return (
    <div className="signin-container">
      <div className="card signin-card">
        <form action=""></form>
        <h2 className="input-margin">Log-In</h2>
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
          id="sign-in"
          onClick={() => onRouteChange("home")}
        >
          Sign-In
        </button>
        <h2 className="input-margin">New user?</h2>
        <button
          className="button button-size input-margin"
          type="button"
          id="register"
          onClick={() => onRouteChange("register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignIn;
