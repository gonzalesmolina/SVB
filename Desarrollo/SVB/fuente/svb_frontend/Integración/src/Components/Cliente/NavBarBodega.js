import React from 'react'
import { Link } from 'react-router-dom'
import  imga from '../bodega.png'

export default function NavBarBodega({ cartShop }) {
  const logout=()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('is_admin');
 
    JSON.parse(localStorage.getItem('carrito'))&&localStorage.removeItem('carrito');
    
   //console.log("salir",JSON.parse(localStorage.getItem('carrito')));
 }
  return (

    <nav className="navbar navbar-expand-lg  navbar-light" >
      <Link to="/" className="navbar-brand ml-3 font-weight-bold">  <img src={imga} alt="Bodega" style={{height:"90px"}}></img> </Link>
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
          <button className="btn btn-danger  my-2 my-sm-0" type="submit" >Buscar</button>

        </form>
        <div >
          {/* <a href className="registro">Login|Registro</a> */}
          {
            JSON.parse(localStorage.getItem("user"))?
             <div className="dropdown" style={{"marginRight": "4em"}}>
             <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
               {JSON.parse(localStorage.getItem("user"))}
             </button>
             <div className="dropdown-menu " aria-labelledby="dropdownMenu2">
               {
                 JSON.parse(localStorage.getItem("user"))==="admin"?(
                   <>
                 <Link to="/categorias" >  <button className="dropdown-item" type="button">Mantenimiento</button> </Link>
                 <div className="dropdown-divider"></div>
                 <Link to="/" >  <button className="dropdown-item" type="button" onClick={logout}>Salir</button></Link>
                 </>
                 ):(
                   <>
                 <Link to="/usuario" > <button className="dropdown-item" type="button">Historial</button> </Link>
                 <Link to="/cart" >  <button className="dropdown-item" type="button">Mi carrito</button> </Link>
                 <div className="dropdown-divider"></div>
                 <Link to="/" >  <button className="dropdown-item" type="button" onClick={logout}>Salir</button></Link>
                 </>
                 )
               }
             
             </div>
           </div>
           :  <Link to="/login" className="registro">Login|Registro</Link>
          }
         

        </div>

        <Link to="/cart">
          <span className="carrito">
            <i className="fa fa-shopping-cart fa-1x "></i>
            <span className="badge badge-pill badge-warning">{cartShop ? cartShop.length : 0}
            </span>
          </span>
        </Link>

      </div>
    </nav>


  )
}
