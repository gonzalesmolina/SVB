import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="notFound centrarNF ">
           
               
                  {/* <div ><h3>¡Ups! la página no existe</h3></div> */}
                  <Link to="/" >  <button className="btn btn-danger p-2 "  style={{"color": "white","fontWeight":"bold","display":"block"}}>Regresar al Home</button></Link>
                     
                
           
            
        </div>
    )
}
