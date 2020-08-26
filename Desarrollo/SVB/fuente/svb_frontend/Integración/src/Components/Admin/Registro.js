import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useHistory } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import NavegacionLateral from './NavegacionLateral';
import NavBar from './NavBar'



//const url="http://localhost:3000/categorias"; //api fake
const url = "http://13.65.190.213:8000/api/auth/register" //api real

export default function Registro() {

  let history = useHistory();

  const [formu, setFormu] = useState({
    username: '',
    password: '',
    email: ''
  })

  const postRegistro = async () => {
    try {

      console.log(formu)

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

      history.push('/login')
      // setIsRedirect(true)
      /* getCategorias();
      ModalInsertar(); */
    } catch (error) {
      console.log(error.message);
    }




  }

  const handleChange = async (e) => {
    e.persist();

    await setFormu({
      ...formu,
      [e.target.name]: e.target.value
    })


  }

  useEffect(() => {

    console.log('aqui');

    // getCategorias();


  }, [])

  return (
    <>
      <div class="container">
        <div class="row">

          <div class="col-md-6 mx-auto ">

            <div class="container register">
              <form >
                <label class="title">Crea una cuenta</label>


                <div class="form-group col">
                  <label >Nombre de usuario</label>
                  <input type="text" name="username" onChange={handleChange} value={formu ? formu.username : ''} class="form-control" placeholder="Ingresa tu nombre de usuario" />
                </div>
                <div class="form-group col">
                  <label >Correo</label>
                  <input type="email" name="email" onChange={handleChange} value={formu ? formu.email : ''} class="form-control" placeholder="Ingresa tu correo" />
                </div>
                <div class="form-group col">
                  <label >Contraseña</label>
                  <input type="password" name="password" onChange={handleChange} value={formu ? formu.password : ''} class="form-control" placeholder="Ingresa tu contraseña" />
                </div>



                <div class="form-group col">
                  <button type="button" onClick={() => postRegistro()} class="btn btn-success  btn-block">Registrarse</button>
                  <div class="form-group col">
                    <small>¿Ya tienes cuenta? ingresa
                      <NavLink to="/login"> Aqui</NavLink>
                    </small>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
