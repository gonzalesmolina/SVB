import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Cliente/Home';
import Categoria from './Components/Admin/Categoria';
import Proveedor from './Components/Admin/Proveedor';
import Producto from './Components/Admin/Producto';
import Login from './Components/Admin/Login';

 const Routes=()=> {
    return (
       <Switch>
           <Route exact path="/" component={Home}   />
           <Route path="/categorias" component={Categoria} />
           <Route path="/login" component={Login} />
           <Route path="/proveedores" component={Proveedor} />
           <Route path="/productos" component={Producto} />

           

       </Switch>
    )
}
export default Routes;