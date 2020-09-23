import React, { useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useHistory } from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";



//const url="http://localhost:3000/categorias"; //api fake
const url = process.env.REACT_APP_REGISTER;

export default function Registro() {

  let history = useHistory();

  
  const formik = useFormik({
    initialValues:{
      username:"",
      email:"",
      password:""
    },
    validationSchema:Yup.object({
      username:Yup.string().required('Ingresa un usuario'),
      email:Yup.string().email('ingrese email válido').required('Ingresa un correo'),
      password:Yup.string().min(8,'Mínimo 8 carácteres').required('Ingresa una contraseña')
    }),
    onSubmit: async (formData)=>{
      console.log(formData);
      try {
  
        console.log("posteando",formData)
  
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        const formatoJson = await res.json();
        console.log(formatoJson);
  
        history.push('/login')
      } catch (error) {
        console.log(error.message);
      }
    }
  })
  

  useEffect(() => {

    console.log('aqui');

  }, [])

  return (
    <>
      <div className="container">
        <div className="row">

          <div className="col-md-6 mx-auto ">

            <div className="container register">
              <form onSubmit={formik.handleSubmit}>
                <label className="title">Crea una cuenta</label>
                <div className="form-group col">
                  <label >Nombre de usuario</label>
                  <input type="text" name="username"  
                     onChange={formik.handleChange}
                  className="form-control" placeholder="Ingresa tu nombre de usuario" />
                  {formik.touched.username && formik.errors.username?(
                     <div style={{color:"red",fontSize:"14px"}}>{formik.errors.username}</div>
                   ):null}
                </div>
                <div className="form-group col">
                  <label >Correo</label>
                  <input type="email" name="email" 
                   onChange={formik.handleChange}
                   className="form-control" placeholder="Ingresa tu correo" />
                    {formik.touched.email && formik.errors.email?(
                     <div style={{color:"red",fontSize:"14px"}}>{formik.errors.email}</div>
                   ):null}
                </div>
                <div className="form-group col">
                  <label >Contraseña</label>
                  <input type="password" name="password"  
                   onChange={formik.handleChange}
                   className="form-control" placeholder="Ingresa tu contraseña" />
                    {formik.touched.password && formik.errors.password?(
                     <div style={{color:"red",fontSize:"14px"}}>{formik.errors.password}</div>
                   ):null}
                </div>
                <div className="form-group col">
                  <button type="submit"  className="btn btn-success  btn-block">Registrarse</button>
                  <div className="form-group col">
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
