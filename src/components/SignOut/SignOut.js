import React from "react";
import "./SignOut.css";

const Navigation = ({ onRouteChange, resetHomePage }) => {
  return (
    <nav className="signout-container">
      <button
        className="button signout-button"
        onClick={() => {
          resetHomePage();
          onRouteChange("signin");
        }}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
