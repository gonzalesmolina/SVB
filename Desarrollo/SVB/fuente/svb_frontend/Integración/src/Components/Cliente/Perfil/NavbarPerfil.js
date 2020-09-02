import React from 'react';
import {Link} from 'react-router-dom';

export default function NavbarPerfil() {
    return (
        <nav className="navbar  navbar-light bg-light">
        <Link to="/" className="navbar-brand"  style={{"marginLeft": "2em"}}>Home</Link>
       
        <div className="dropdown" style={{"marginRight": "4em"}}>
          <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            Usuario
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">Perfil</button>
            <Link to="/cart" >  <button className="dropdown-item" type="button">Mi carrito</button> </Link>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" type="button">Salir</button>
          </div>
        </div>
      </nav>
    )
}
