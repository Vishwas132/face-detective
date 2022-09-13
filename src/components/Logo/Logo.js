import React from "react";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <img src={brain} alt="logo" id="logo" width={"100px"} height={"100px"} />
  );
};

export default Logo;
