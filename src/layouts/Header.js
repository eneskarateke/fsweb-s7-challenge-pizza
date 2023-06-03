import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../images/logo.svg";
const Header = () => {
  return (
    <header>
      <div className="headerLogo">
        <img src={logo} alt="logo" />
      </div>
      <div className="headerTexts">
        <nav className="headerNav">
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold",
            }}
          >
            Anasayfa
          </NavLink>

          <NavLink
            to="/pizza"
            activeStyle={{
              fontWeight: "bold",
              color: "orange",
            }}
          >
            Sipariş Oluştur
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
