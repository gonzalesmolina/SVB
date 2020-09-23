import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NavegacionLateral from './NavegacionLateral';
import NavBar from './NavBar';

const url = process.env.REACT_APP_PRODUCTS;

const urlCtg = process.env.REACT_APP_CATEGORIES;

export default function Producto() {

  const [productos, setProductos] = useState([]);
  const [catg, setCatg] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [formu, setFormu] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    discount: 0,
    image: '',
    is_active: false,
    category: 0,
    tipoModal: ''
  })


  const getCatg = async () => {
    console.log(url);
    const res = await fetch(urlCtg);
    const data = await res.json();

    setCatg(data.results); //es para el url verdadero
    // setCatg(data) //de mi api fake json server
    // console.table("categ en Component Productos:",data.results)
  }

  const getProductos = async () => {

    const res = await fetch(url);
    const data = await res.json();
    //   console.table("datos",data)
    setProductos(data.results); //es para el url verdadero
    // setProductos(data) //de mi api fake json server

  }

  const postProductos = async () => {
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
      console.log(formatoJson);
      getProductos();
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

    console.log("datos de handlechange", formu);
  }

  const seleccionarProducto = (el) => {
    setFormu({
      id: el.id,
      name: el.name,
      description: el.description,
      price: el.price,
      discount: el.discount,
      image: el.image,
      is_active: el.is_active,
      category: el.category,
      tipoModal: 'actualizar'

    })


  }
  const peticionPut = async () => {
    try {
      const res = await fetch(url + "/" + formu.id,{
        method: 'PUT',
        body: JSON.stringify(formu),
        headers: {
          //  'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const Json = await res.json();
      console.log("peticion Put", Json);

      ModalInsertar();
      getProductos();
    } catch (error) {
      console.log(error.message);
    }

  }


  const peticionDelete = () => {
    axios.delete(url + "/" + formu.id).then(response => {

      setModalEliminar(false);
      getProductos();

    })
  }

  useEffect(() => {

    getProductos();
    getCatg();

  }, [])


  return (
    <>
      <NavBar />
      <div className=" container-fluid contenedor ">
        <div className="row">
          <div className="col-md-3 side-nav">

            <NavegacionLateral />
          </div>
          <div className="col-md-9 ">
            {/* <div > sirve para centrar la tabla */}

            {/* <div class="table-responsive">  */}
            <button type="button" className="btn btn-primary" onClick={() => {
              ModalInsertar(); setFormu({
                ...null,
                tipoModal: 'insertar'

              })
            }}>
              Nuevo producto
    </button>
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
                {productos.map((el) => (
                  <tr key={el.id}>
                    {/* <td >{el.id}</td> */}
                    <td>{el.name}</td>
                    <td>{el.description}</td>
                    <td>{el.price}</td>
                    <td>{el.discount}</td>
                    <td>{el.category}</td>
                    {/* <td>{el.image}</td> */}
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


                }
              </tbody>
            </table>
            {/* </div> sirve para centrar la tabla */}
            <Modal isOpen={modalInsertar}>
              <ModalHeader style={{ display: 'block' }}>
                <h5 className="modal-title">Ingresar datos del producto</h5>
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
                      <label >Description</label>
                      <input name="description" type="text" className="form-control"
                        placeholder="Descripción" onChange={handleChange} value={formu ? formu.description : ''} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label >Precio</label>
                      <input name="price" type="text" className="form-control"
                        placeholder="S/ 5,99 " onChange={handleChange} value={formu ? formu.price : 0} />
                    </div>
                    <div className="form-group col-md-6">
                      <label >Descuento</label>
                      <input name="discount" type="text" className="form-control"
                        placeholder="S/ 0,50" onChange={handleChange} value={formu ? formu.discount : 0} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label >Categoría</label>
                      <select className="custom-select" name="category" onChange={handleChange} value={formu ? formu.category : 0}>
                        <option selected>Elija una categoría</option>
                        {catg.map(ctg => (

                          <option key={ctg.id} value={ctg.id}>{ctg.name}</option>
                        ))

                        }

                      </select>

                    </div>
                    <div className="form-group col-md-6">

                      <label>Imagen</label>

                      <div className="custom-file">
                        <input type="file" className="custom-file-input"
                          name="image"
                          onChange={(e) => { setFormu({ ...formu, image: URL.createObjectURL(e.target.files[0]) }) }}
                        />
                        <label className="custom-file-label" >Elige una imagen</label>
                      </div>
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
                  <button type="button" className="btn btn-primary" onClick={() => postProductos()}>Guardar</button>
                  : <button className="btn btn-primary" type="button" onClick={() => peticionPut()}> Actualizar </button>
                }
                {/* <button className="btn btn-danger" onClick={()=>ModalInsertar()}>Cancelar</button> */}
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => ModalInsertar()}>Cancelar</button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
              <ModalBody>
                ¿Estás seguro que deseas eliminar el proveedor {formu && formu.name}?
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
