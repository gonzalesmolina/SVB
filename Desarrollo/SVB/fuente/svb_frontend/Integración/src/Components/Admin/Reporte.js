import React from 'react'
import NavegacionLateral from './NavegacionLateral'
import NavBar from './NavBar';


//const urlS = process.env.REACT_APP_SALES;

export default function Reporte() {
    return (
        <>
         <NavBar />
      <div className=" container-fluid contenedor ">
        <div className="row">
          <div className="col-md-3 side-nav">

            <NavegacionLateral />
          </div>
          <div className="col-md-9 ">
           <h3>Reporte de ventas</h3>


          <table className="table table-striped  table-responsive">
              <thead className="thead-dark">
                <tr>
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  <th scope="col" className="text-center">Precio</th>
                  <th scope="col" className="text-center">Descuento</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Borrar</th>
                </tr>

              </thead>
              <tbody>
                {/* {productos.map((el) => (
                  <tr key={el.id}>
                   
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.price}</td>
                    <td>{el.discount}</td>
                    <td>{el.category}</td>
                  
                    <td><img src={el.image} alt={el.name} id="img-icon" /></td>
                    {(el.is_active) ? <td>Activo</td> : <td>No activo</td>}
                    <td className="text-center" >

                      <i className="fa fa-edit fa-1x " onClick={() => { seleccionarProducto(el); ModalInsertar() }}></i>

                    </td>
                    <td className="text-center"   >
                      <i className="fa fa-trash-alt fa-1x " onClick={() => { seleccionarProducto(el); setModalEliminar(true) }}></i>
                    </td>

                  </tr>

                ))


                } */}
              </tbody>
            </table>
            </div>
          </div>  
      </div>    
        </>
    )
}
