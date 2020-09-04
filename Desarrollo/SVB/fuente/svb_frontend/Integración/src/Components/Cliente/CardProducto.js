import React from 'react'
// import { Link } from 'react-router-dom'

export default function CardProducto({prod,agregar}) {

 

    return (
        <div className="card cardProd" style={{"width": "14rem"}}>
        <img src={prod.image} className="card-img-top" alt={prod.name} style={{"height": "12rem","width": "12rem"}}/>
        <div className="card-body"> 
          <h5 className="card-title">{prod.name}</h5>
          <p className="card-text">{prod.description}o</p>

          <p>s/ <strong>{prod.price}</strong></p>

          <button  className="btn  btn-block btn-product" onClick={()=>agregar(prod)} >AGREGAR</button>
        </div>
      </div> 
    )
}
