import React, { useState } from 'react'
import NavbarPerfil from './NavbarPerfil'
import ProductoCart from './ProductoCart'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useHistory } from "react-router-dom";


const url = "http://13.65.190.213:8000/api/orders/create"

export default function Carrito() {

  const [bolsa, setBolsa] = useState(localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : '');



  const edit = (nuevaCant, prod) => {
    //  console.log(nuevaCant,prod);
    bolsa.map(m => {
      if (m.id === prod.id) {
        m.quantity = nuevaCant;
        // console.log("Qnew",m.quantity);
      }
    })
    localStorage.setItem("carrito", JSON.stringify(bolsa));
    setBolsa(JSON.parse(localStorage.getItem("carrito")));
  }
  const borrar = (prod) => {
    // console.log("borrar",bolsa.indexOf(prod));
    let index = bolsa.indexOf(prod);
    bolsa.splice(index, 1);
    console.log("nueva bolsa con el borrado", bolsa);
    localStorage.setItem("carrito", JSON.stringify(bolsa));
    setBolsa(JSON.parse(localStorage.getItem("carrito")));

  }
  console.log("bolsa", bolsa);


  return (
    <>
      <NavbarPerfil />

      <div className="contenido container-fluid ">


        <div className="row">
          <div className="col-md-6">
            <ul className="list-unstyled">
              {
                bolsa ?
                  bolsa.map((el) => (
                    <ProductoCart
                      key={el.id}
                      data={el}
                      add={edit}
                      del={borrar}
                    />
                  )) : ''
              }

            </ul>
          </div>
          <div className="col-md-6">
            <Total bolsa={bolsa} />

          </div>
        </div>
      </div>
    </>
  )
}


function Total({ bolsa }) {
  let history = useHistory();
  const [modalInsertar, setModalInsertar] = useState(false)
  const [formu, setFormu] = useState({
    operation_number: '',
    payment_method: 3

  })
  //const [orden, setOrden] = useState(...bolsa);


  const ModalInsertar = () => {
    setModalInsertar(!modalInsertar);

  }

  const alerta = () => {
    return (
      <div className="alert alert-primary" role="alert">
        La orden se creó! :)
      </div>
    )
  }
  const postOrdenes = async () => {

    // console.log("pagando...");

    // console.log("bolsa",bolsa);
    // console.log("formu",formu);
    //  console.log("ordeeeeen",dataa);
    try {
      let dataa = { "products": bolsa, "payment": formu }
      console.log("ordeeeeen", dataa);
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(dataa),
        headers: {
          'Authorization': 'Token 31c766acf86fe3ebe6b25799b00a9cf75763d64d',
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      const formatoJson = await res.json();
      console.log(formatoJson);

      localStorage.removeItem('carrito');

      ModalInsertar();
      
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }

    ModalInsertar();

  }
  // const postOrden= async()=>{
  //     try{
  //  const res=   await fetch(url,{
  //         method: 'POST',
  //         body: JSON.stringify(formu),
  //         headers: {
  //             'Accept': 'application/json',
  //           'Content-type': 'application/json'
  //         }
  //       })
  //  const formatoJson=await res.json();
  //  console.log(formatoJson);     

  //       ModalInsertar();
  //     }catch(error){
  //         console.log(error.message);
  //     }

  // } //fin postProductos

  let sub = 0;
  bolsa && bolsa.map((el) => { sub += el.quantity * el.price; })

  const handleChange = async (e) => {
    // console.log(e.target.value);
    //  e.preventDefault();
    e.persist();
    await setFormu({
      ...formu,
      [e.target.name]: e.target.value
    })
    //  setFormu(...bolsa, {"payment": {
    //           formu
    //         }})
    // setOrden(...bolsa,{ "payment":{formu}})
  }

  // console.log("formu",formu);

  return (
    <>

      <div className="detalle">
        <div className="mb-4 text-center w-100">
          <h3>RESUMEN DE PEDIDO</h3>
        </div>
        <div className="mb-2 ml-5 mr-5">
          <div className="d-flex justify-content-between">
            <h5>
              SUBTOTAL:
                            </h5>
            <h5> S/
                               {sub.toFixed(2)}
            </h5>
          </div>
        </div>
        <div className="mb-2 ml-5 mr-5">
          <div className="d-flex justify-content-between">
            <h5>
              ENVÍO:
                            </h5>
            <h5>
              S/10.00
                            </h5>
          </div>
        </div>
        <div className="mb-2 ml-5 mr-5">
          <div className="d-flex justify-content-between">
            <h5>
              TOTAL:
                            </h5>
            <h5>S/
                                {
                (sub) ? `${(sub + 10).toFixed(1)}0` : 0
              }
            </h5>
          </div>
        </div>
        <div className="w-100 text-center">
          <button className="btn btn-lg btn-block btn-success"
            onClick={ModalInsertar}
          >Comprar</button>
        </div>
      </div>

      {/* modaaaall pago */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader style={{ display: 'block' }}>
          <strong className="modal-title">Ingresar datos del pago</strong>
          <span style={{ float: 'right', cursor: 'pointer' }} onClick={() => ModalInsertar()}
            className="close"
          >x</span>

        </ModalHeader>
        <ModalBody>
          <form >
            <h1 className="text-center"> Pago</h1>

            <div className="form-group">
              <label >Método de pago</label>
              <input type="text" className="form-control" readOnly placeholder="Yape" />
            </div>
            <div className="form-group">
              <label >Número de operación</label>
              <input type="text"
                className="form-control"
                placeholder="Ej. 1234"
                name="operation_number"
                value={formu.operation_number}
                onChange={handleChange}
              />
            </div>

            <button type="button"
              className="btn btn-success btn-block"
              onClick={postOrdenes}
            >Pagar {`S/ ${(sub + 10).toFixed(1)}0`}
            </button>
          </form>
          {/* <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >Nombre</label>
                          <input name="name" type="text" className="form-control"
                           placeholder="Nombre" onChange={handleChange} value={formu?formu.name:''}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Description</label>
                          <input name="description" type="text" className="form-control" 
                          placeholder="Descripción" onChange={handleChange} value={formu?formu.description:''}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >Precio</label>
                          <input name="price" type="text" className="form-control"
                           placeholder="S/ 5,99 " onChange={handleChange} value={formu?formu.price:0}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Descuento</label>
                          <input name="discount" type="text" className="form-control" 
                          placeholder="S/ 0,50" onChange={handleChange} value={formu?formu.discount:0}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >Categoría</label>
                          <select className="custom-select" name="category" onChange={handleChange} value={formu?formu.category:0}>
                            <option  selected>Elija una categoría</option>
                            { catg.map(ctg=>(

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
                                onChange={(e)=>{setFormu({...formu, image:URL.createObjectURL(e.target.files[0])}) }  }
                                />
                                <label className="custom-file-label" >Elige una imagen</label>
                              </div>
                        </div>
                      </div>
                    
                   
                    <div className="form-row">
                        
                        <div className="form-group col-md-6 ">
                            <label>Estado:</label> <br/>
                            <input type="checkbox" name="is_active"  
                            onChange={(e)=> {setFormu({...formu, is_active: e.target.checked}) }} 
                            checked={formu.is_active} />
                            <label > Activo </label>
                           
                          </div>
                          
                    </div>
                  </form> */}

        </ModalBody>

        {/* <ModalFooter>
                  { formu.tipoModal==='insertar'? 
                  <button type="button" className="btn btn-primary" onClick={()=>postProductos()}>Guardar</button>
                  :<button className="btn btn-primary" type="button" onClick={()=>peticionPut()}> Actualizar </button>
                    } 
                  
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>ModalInsertar()}>Cancelar</button>
                </ModalFooter> */}
      </Modal>
    </>
  )

}