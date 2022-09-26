import React from "react";
import "./Navigation.css";

const deleteUser = (email) => {
  fetch(`https://protected-crag-39335.herokuapp.com/delete`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const Navigation = ({ changeRoute, resetHomePage, email }) => {
  return (
    <nav className="signout-container">
      <button
        className="button signout-button"
        onClick={() => {
          resetHomePage();
          deleteUser(email);
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
