import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { NavLink,Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useHistory } from "react-router-dom";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import NavegacionLateral from './NavegacionLateral';
// import NavBar from './NavBar'
import  imga from '../bodega.png'



//const url="http://localhost:3000/categorias"; //api fake
const url = process.env.REACT_APP_LOGIN; //api real

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

      //history.push('/categorias')
      /* getCategorias();
      ModalInsertar(); */
      localStorage.setItem('token', JSON.stringify(formatoJson.token));
      localStorage.setItem('user', JSON.stringify(formu.username));
      localStorage.setItem('is_admin', JSON.stringify(formatoJson.is_admin));

      let user = JSON.parse(localStorage.getItem('user'))
      let ad = JSON.parse(localStorage.getItem('is_admin'))
      if (user === "admin") {
        localStorage.setItem('is_admin', true);
        history.push('/categorias')
        console.log("admin", ad);
      } else {

        history.push('/')
        console.log("admin", ad);
      }
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
      <div className="container">
        <div className="row">
        
          <div className="col-md-6 mx-auto ">
         
        <Link to="/">  <img src={imga} alt="Bodega" style={{height:"90px"}} ></img> </Link>
            <div className="container register ">
           
              <form>
                <label className="title">Iniciar Sesión</label>
                <div className="form-group col">
                  <label>Nombre de usuario</label>
                  <input type="text" name="username" onChange={handleChange} value={formu ? formu.username : ''} className="form-control" placeholder="Ingresa tu nombre de usuario" />
                </div>
                <div className="form-group col">
                  <label>Contraseña</label>
                  <input type="password" name="password" onChange={handleChange} value={formu ? formu.password : ''} className="form-control" placeholder="Ingresa tu contraseña" />
                </div>
                <div className="form-group col">
                  <button type="button" onClick={() => postLogin()} className="btn btn-success  btn-block">Ingresar</button>
                </div>
                <div className="form-group col">
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
