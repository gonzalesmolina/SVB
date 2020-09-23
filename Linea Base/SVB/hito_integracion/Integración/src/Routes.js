import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Cliente/Home';
import Categoria from './Components/Admin/Categoria';
import Proveedor from './Components/Admin/Proveedor';
import Producto from './Components/Admin/Producto';
import Login from './Components/Admin/Login';
import Registro from './Components/Admin/Registro';
import ProductoXCateg from './Components/Cliente/ProductoXCateg';
import Carrito from './Components/Cliente/Perfil/Carrito';

 const Routes=()=> {
    return (
       <Switch>
           <Route exact path="/" component={Home}   />
           <Route exact path="/categorias" component={Categoria} />
           <Route exact path="/login" component={Login} />
           <Route exact path="/registro" component={Registro} />
           <Route exact path="/proveedores" component={Proveedor} />
           <Route exact path="/productos" component={Producto} />
           <Route exact path="/productos/:idCateg" component={ProductoXCateg} />
           <Route exact path="/cart" component={Carrito} />

           

       </Switch>
    )
}
export default Routes;