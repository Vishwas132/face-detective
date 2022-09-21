import React from "react";
import "./SignOut.css";

const Navigation = ({ changeRoute, resetHomePage }) => {
  return (
    <nav className="signout-container">
      <button
        className="button signout-button"
        onClick={() => {
          resetHomePage();
          changeRoute("signin");
        }}
      >
        Delete account
      </button>
      <button
        className="button signout-button"
        onClick={() => {
          resetHomePage();
          changeRoute("signin");
        }}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
