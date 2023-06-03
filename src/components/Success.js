import React from "react";
import Header from "../layouts/Header";
import pizza from "../images/pizza.svg";

import "./Success.css";
function Success() {
  return (
    <>
      <Header />
      <div className="successContainer">
        <p className="baslikSuccess">TEBRİKLER! SİPARİŞİNİZ ALINDI</p>
        <div className="pizzaLogo"></div>
        <img src={pizza} alt="logo" />
      </div>
    </>
  );
}

export default Success;
