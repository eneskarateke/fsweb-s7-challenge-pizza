import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import PizzaForm from "./components/PizzaForm";

import Success from "./components/Success";
import logo from "./images/logo.svg";
import "./App.css";

const App = () => {
  return (
    <div className="homePage">
      <Switch>
        <Route path="/pizza">
          <PizzaForm />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/">
          <div className="icerik">
            <div className="svgHeader">
              <img src={logo} alt="logo" />
            </div>

            <div className="icerikler">
              <p className="baslik">KOD ACIKTIRIR PİZZA DOYURUR!</p>
              <NavLink
                id="order-pizza"
                exact
                to="/pizza"
                activeClassName="active"
              >
                Acıktım
              </NavLink>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
