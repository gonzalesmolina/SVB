import React from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navbar  navbar-dark bg-dark pr-4">
      <Link to="/">  <a className="navbar-brand" href="../home.html" id="loguito">Bodeguita</a> </Link>
     
        <div className="dropdown" id="dropDown">
    
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Admin
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">Gestión</button>
            <div className="dropdown-divider"></div>
            <NavLink to="/login">
              <button className="dropdown-item" type="button">Salir</button>
            </NavLink>
          </div>
        </div>
      </nav>
    )
}
