import React, { useState } from 'react'
import NavbarPerfil from './NavbarPerfil'
import ProductoCart from './ProductoCart'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useHistory } from "react-router-dom";


const url = process.env.REACT_APP_ORDER_CREATE;
const token = JSON.parse(localStorage.getItem("token"));

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
    
    
      const postOrdenes = async () => {
    
        // console.log("pagando...");
    
        // console.log("bolsa",bolsa);
        // console.log("formu",formu);
        //  console.log("ordeeeeen",dataa);
        try {
          let dataa = { "products": bolsa, "payment": formu }
          console.log("ordeeeeen", dataa);
          const res = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(dataa),
            headers: {
              'Authorization': `Token ${token}`,
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          const formatoJson = await res.json();
          console.log(formatoJson);
    
          localStorage.removeItem('carrito');
    
          ModalInsertar();
          alert('Compra realiza con exito')
          history.push('/');
        } catch (error) {
          console.log(error.message);
        }
    
        ModalInsertar();
    
      }
     
    
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
          
    
            </ModalBody>
    
         
          </Modal>
        </>
      )
    
    }