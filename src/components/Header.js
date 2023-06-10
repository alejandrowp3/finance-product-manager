import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <FontAwesomeIcon icon={faPiggyBank} className="bank-icon" />
      <h1 className="header-title">BANCO PICHINCHA</h1>
    </header>
  );
};

export default Header;
