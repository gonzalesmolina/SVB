import React from 'react'
import { Link } from 'react-router-dom'

export default function CardCategoria({name,id,img}) {
    return (
        <div className="card" style={{"width": "15rem"}}>
        <img src={img} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <Link to={`/productos/${id}`} className="btn  btn-block btn-product">IR</Link>
        </div>
      </div>
    )
}
