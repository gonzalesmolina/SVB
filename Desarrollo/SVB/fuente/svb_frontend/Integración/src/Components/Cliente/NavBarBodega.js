import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBarBodega() {
    return (
      
    <nav className="navbar navbar-expand-lg navbar-light " >
         <Link to="/categorias" className="navbar-brand ml-3 font-weight-bold">   BODEGA.pe </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {/* <li className="nav-item active">
                  <a className="nav-link" href>Home <span class="sr-only">(current)</span></a>
                </li> */}

                {/* <li className="nav-item active">
                  <a className="nav-link" href>Promociones</a>
                </li> */}
              
               
              </ul>
              <form className="form-inline  buscador">
               
                <input className="form-control mr-sm-2" type="search" placeholder="¿Qué estas buscando?" aria-label="Search" />
                 <button className="btn btn-outline-success  my-2 my-sm-0" type="submit" >Buscar</button> 
  
              </form>
              <div >
                  <a href className="registro">Login|Registro</a>
                
            </div>

              <span className="carrito"> <i className="fa fa-shopping-cart fa-1x "></i></span>
              
            </div>
    </nav>

        
    )
}
