import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import PizzaForm from "./components/PizzaForm";
import "./App.css";
import Success from "./components/Success";

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
            <h1>Teknolojik Yemekler</h1>
            <p>KOD ACIKTIRIR PİZZA DOYURUR!</p>
            <NavLink
              id="order-pizza"
              exact
              to="/pizza"
              activeClassName="active"
            >
              {" "}
              Acıktım
            </NavLink>
          </div>
        </Route>
      </Switch>
    </div>
  );
};
export default App;
