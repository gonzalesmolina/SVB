import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NavegacionLateral from './NavegacionLateral';
import NavBar from './NavBar'

const url = process.env.REACT_APP_CATEGORIES;


export default function Categoria() {


  const [categ, setCateg] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [formu, setFormu] = useState({
    id: '',
    name: '',
    description: '',
    is_active: false,
    tipoModal: ''
  })

  const getCategorias = async () => {

    const res = await fetch(url);
    const data = await res.json();
    //   console.table("datos",data)
    setCateg(data.results); //es para el url verdadero
    // setCateg(data) //de mi api fake json server
  }

  const postCategorias = async () => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formu),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const formatoJson = await res.json();
      // console.log(formatoJson);     
      getCategorias();
      ModalInsertar();
    } catch (error) {
      console.log(error.message);
    }




  }
  function ModalInsertar() {
    setModalInsertar(!modalInsertar);

  }


  const handleChange = async (e) => {
    e.persist();

    await setFormu({
      ...formu,
      [e.target.name]: e.target.value
    })


  }

  const seleccionarCateg = (el) => {
    setFormu({
      id: el.id,
      name: el.name,
      description: el.description,
      is_active: el.is_active,
      tipoModal: 'actualizar'

    })


  }
  const peticionPut = async () => {
    try {
      const res = await fetch(url + "/" + formu.id, {
        method: 'PUT',
        body: JSON.stringify(formu),
        headers: {
          //    'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const Json = await res.json();
      //   console.log(Json);     

      ModalInsertar();
      getCategorias();
    } catch (error) {
      console.log(error.message);
    }

  }


  const peticionDelete = () => {
    axios.delete(url + "/" + formu.id).then(response => {

      setModalEliminar(false);
      getCategorias();

    })
  }

  useEffect(() => {

    getCategorias();


  }, [])

  return (
    <>
      <NavBar />
      <div className=" container-fluid contenedor ">
        <div className="row">
          <div className="col-md-3 side-nav">

            <NavegacionLateral />
          </div>
          <div className="col-md-9 pl-5">
            {/* Navbar Admin responsivo-alternativa al navbarSide */}
            {/* <nav className="nav nav-pills flex-column flex-sm-row mb-4 "  >
            <a className="flex-sm-fill text-sm-center nav-link active" href>Pedidos</a>
            <a className="flex-sm-fill text-sm-center nav-link" href>Productos</a>
            <a className="flex-sm-fill text-sm-center nav-link" href>Categorias</a>
           <a className="flex-sm-fill text-sm-center nav-link " href>Proveedores</a>
          </nav> */}

            {/* <div > sirve para centrar la tabla */}

            {/* <div class="table-responsive">  */}
            <button type="button" className="btn btn-primary" onClick={() => {
              ModalInsertar(); setFormu({
                ...null,
                tipoModal: 'insertar'

              })
            }}>
              Nueva categoría
    </button>
            <table className="table table-striped  table-responsive">
              <thead className="thead-dark">
                <tr>
                  
                  <th scope="col">Nombre</th>
                  <th scope="col">Descripción</th>
                  {/* <th scope="col">Slug</th>  */}
                  <th scope="col">Estado</th>
                  <th scope="col">Editar</th>
                  <th scope="col">Borrar</th>
                </tr>

              </thead>
              <tbody>
                {categ.map((el, i) => (
                  <tr key={i}>
                    
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    {/* <td>1022323456549</td> */}
                    {/* <td>{el.is_active? ""}</td> */}
                    {(el.is_active) ? <td>Activo</td> : <td>No activo</td>}
                    <td className="text-center" >

                      <i className="fa fa-edit fa-1x " onClick={() => { seleccionarCateg(el); ModalInsertar() }}></i>

                    </td>
                    <td className="text-center"   >
                      <i className="fa fa-trash-alt fa-1x " onClick={() => { seleccionarCateg(el); setModalEliminar(true) }}></i>
                    </td>

                  </tr>

                ))


                }

              </tbody>
            </table>
            {/* </div> sirve para centrar la tabla */}
            <Modal isOpen={modalInsertar}>
              <ModalHeader style={{ display: 'block' }}>
                <strong className="modal-title">Ingresar datos de la categoría</strong>
                <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => ModalInsertar()}
                  className="close"
                >x</span>

              </ModalHeader>
              <ModalBody>
                <form >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label >Nombre</label>
                      <input name="name" type="text" className="form-control"
                        placeholder="Nombre" onChange={handleChange} value={formu ? formu.name : ''} />
                    </div>
                    <div className="form-group col-md-6">
                      <label >Descripción</label>
                      <input name="description" type="text" className="form-control"
                        placeholder="Descripción" onChange={handleChange} value={formu ? formu.description : ''} />
                    </div>
                  </div>


                  <div className="form-row">

                    <div className="form-group col-md-6 ">
                      <label>Estado:</label> <br />
                      <input type="checkbox" name="is_active"
                        onChange={(e) => { setFormu({ ...formu, is_active: e.target.checked }) }}
                        checked={formu.is_active} />
                      <label > Activo </label>

                    </div>

                  </div>
                </form>
              </ModalBody>

              <ModalFooter>
                {formu.tipoModal === 'insertar' ?
                  <button type="button" className="btn btn-primary" onClick={() => postCategorias()}>Guardar</button>
                  : <button className="btn btn-primary" type="button" onClick={() => peticionPut()}> Actualizar </button>
                }
                {/* <button className="btn btn-danger" onClick={()=>ModalInsertar()}>Cancelar</button> */}
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => ModalInsertar()}>Cancelar</button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
              <ModalBody>
                ¿Estás seguro que deseas eliminar la categoría {formu && formu.name}?
                </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={() => peticionDelete()}>Sí</button>
                <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>No</button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
