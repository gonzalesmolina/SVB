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
const url = "http://13.65.190.213:8000/auth/login/" //api real

export default function Login() {

  let history = useHistory();

  const [formu, setFormu] = useState({
    username: '',
    password: ''
  })

  const postLogin = async () => {
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

      history.push('/categorias')
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

    // getCategorias();


  }, [])

  return (
    <>
      <div class="container">
        <div class="row">

          <div class="col-md-6 mx-auto ">

            <div class="container register">
              <form>
                <label class="title">Iniciar Sesión</label>



                <div class="form-group col">
                  <label>Nombre de usuario</label>
                  <input type="text" name="username" onChange={handleChange} value={formu ? formu.username : ''} class="form-control" placeholder="Ingresa tu nombre de usuario" />
                </div>
                <div class="form-group col">
                  <label>Contraseña</label>
                  <input type="password" name="password" onChange={handleChange} value={formu ? formu.password : ''} class="form-control" placeholder="Ingresa tu contraseña" />
                </div>



                <div class="form-group col">
                  <button type="button" onClick={() => postLogin()} class="btn btn-success  btn-block">Ingresar</button>
                </div>
                <div class="form-group col">
                  <small>¿Aún no tienes cuenta? ingresa
                  <NavLink to="/registro"> Aqui</NavLink>
                  </small>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
