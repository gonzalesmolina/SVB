import React from 'react';
import { Link } from 'react-router-dom';


export default function NavegacionLateral() {
    return (
     
        <div id="list-example" className="list-group mx-auto ">
          
          <a className="list-group-item list-group-item-action " href="Pedidos.html">Pedidos</a>
        
        <Link to="/productos">  <a className="list-group-item list-group-item-action" href="CatalogoProductos.html">Productos</a> </Link>

        <Link to="/categorias">  <a className="list-group-item list-group-item-action active " href>Categorias</a> </Link> 
         
        <Link to="/proveedores"> <a className="list-group-item list-group-item-action" href>Proveedores</a> </Link>

        </div>
      
    )
}
