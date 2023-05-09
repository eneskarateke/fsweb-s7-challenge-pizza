import React from 'react'
import {NavLink} from "react-router-dom"

function Home() {
  return (
    <div>
            <h1>Teknolojik Yemekler</h1>
            <p>KOD ACIKTIRIR PİZZA DOYURUR!</p>
            <NavLink id="order-pizza" exact to="/pizza" activeClassName="active"> Sipariş Ver</NavLink>
          </div>
  )
}

export default Home