


      import React from "react";
      import { NavLink } from "react-router-dom";
      import "./Header.css"
      const Header = () => {
        return (
          <header>
            <div className="headerTexts">
            <h1>Teknolojik Yemekler</h1>
        
        <nav>
           
              <NavLink exact to="/" activeClassName="active">Anasayfa</NavLink>
           
              <NavLink to="/pizza" activeClassName="active">Sipariş Oluştur</NavLink>
            
      </nav>
           
            </div>
          
      
          </header>
          
        );
      };
      export default Header;
      