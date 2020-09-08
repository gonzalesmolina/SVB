import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Cliente/Home';
import Categoria from './Components/Admin/Categoria';
import Proveedor from './Components/Admin/Proveedor';
import Producto from './Components/Admin/Producto';
import Reporte from './Components/Admin/Reporte';
import Login from './Components/Admin/Login';
import Registro from './Components/Admin/Registro';
import ProductoXCateg from './Components/Cliente/ProductoXCateg';
import Carrito from './Components/Cliente/Perfil/Carrito';
import Usuario from './Components/Cliente/Perfil/Usuario';
import NotFound from './Components/Cliente/NotFound';

 const Routes=()=> {
    return (
       <Switch>
           <Route exact path="/" component={Home}   />
           <Route exact path="/categorias" component={Categoria} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/registro" component={Registro} />
           <Route exact path="/proveedores" component={Proveedor} />
           <Route exact path="/productos" component={Producto} />
           <Route exact path="/reportes" component={Reporte} />
           <Route exact path="/productos/:idCateg" component={ProductoXCateg} />
           <Route exact path="/cart" component={Carrito} />
           <Route exact path="/usuario" component={Usuario} />
           
           <Route  component={NotFound} />

           

       </Switch>
    )
}
export default Routes;