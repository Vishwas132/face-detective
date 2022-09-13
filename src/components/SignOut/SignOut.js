import React from "react";
import "./SignOut.css";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="signout-container">
      <button
        className="button signout-button"
        onClick={() => onRouteChange("signin")}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navigation;
