import React from 'react'

export default function CardCategoria({name}) {
    return (
        <div className="card" style={{"width": "15rem"}}>
        <img src="https://via.placeholder.com/400x250" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <a href className="btn  btn-block btn-product">IR</a>
        </div>
      </div>
    )
}
