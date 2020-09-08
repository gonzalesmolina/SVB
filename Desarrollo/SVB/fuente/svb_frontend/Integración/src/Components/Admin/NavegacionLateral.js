import React from 'react';
import { NavLink } from 'react-router-dom';


export default function NavegacionLateral() {
    return (

        <div id="list-example" className="list-group mx-auto ">

           <NavLink to="/reportes" className="list-group-item list-group-item-action" activeClassName="active">Reportes</NavLink> 

            <NavLink to="/productos" className="list-group-item list-group-item-action" activeClassName="active">  Productos </NavLink>

            <NavLink to="/categorias" className="list-group-item list-group-item-action " activeClassName="active">  Categorias </NavLink>

            <NavLink to="/proveedores" className="list-group-item list-group-item-action" activeClassName="active"> Proveedores</NavLink>

        </div>

    )
}
