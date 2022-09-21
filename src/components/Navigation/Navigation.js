import React from "react";
import "./Navigation.css";

const Navigation = ({ changeRoute, resetHomePage, deleteUser }) => {
  return (
    <nav className="signout-container">
      <button
        className="button signout-button"
        onClick={() => {
          resetHomePage();
          deleteUser();
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