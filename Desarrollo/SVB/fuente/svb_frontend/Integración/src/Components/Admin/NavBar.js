import React from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import  imga from '../bodega.png'

export default function NavBar() {

  const logout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
 
    //JSON.parse(localStorage.getItem('carrito'))&&localStorage.removeItem('carrito');
    
   //console.log("salir",JSON.parse(localStorage.getItem('carrito')));
 }
    return (
        <nav className="navbar  navbar-dark bg-dark pr-4">
      <Link to="/" className="navbar-brand" id="loguito">  <img src={imga} alt="Bodega" style={{height:"80px"}}></img>  </Link>
     
        <div className="dropdown" id="dropDown">
    
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            {JSON.parse(localStorage.getItem("user"))}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          
            <NavLink to="/login">
              <button className="dropdown-item" type="button" onClick={logout}>Salir</button>
            </NavLink>
          </div>
        </div>
      </nav>
    )
}
