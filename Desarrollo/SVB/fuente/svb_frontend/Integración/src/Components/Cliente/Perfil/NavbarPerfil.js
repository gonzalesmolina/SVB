import React from 'react';
import {Link} from 'react-router-dom';

export default function NavbarPerfil() {

const logout=()=>{
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   localStorage.removeItem('is_admin');

   JSON.parse(localStorage.getItem('carrito'))&&localStorage.removeItem('carrito');
   
  //console.log("salir",JSON.parse(localStorage.getItem('carrito')));
}

    return (
        <nav className="navbar  navbar-light bg-light">
        <Link to="/" className="navbar-brand"  style={{"marginLeft": "2em"}}>Home</Link>
       
        <div className="dropdown" style={{"marginRight": "4em"}}>
          <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {JSON.parse(localStorage.getItem("user"))}
          </button>
          <div className="dropdown-menu " aria-labelledby="dropdownMenu2">
          <Link to="/usuario" > <button className="dropdown-item" type="button">Historial</button> </Link>
            <Link to="/cart" >  <button className="dropdown-item" type="button">Mi carrito</button> </Link>
            <div className="dropdown-divider"></div>
            <Link to="/" >  <button className="dropdown-item" type="button" onClick={logout}>Salir</button></Link>
          </div>
        </div>
      </nav>
    )
}
