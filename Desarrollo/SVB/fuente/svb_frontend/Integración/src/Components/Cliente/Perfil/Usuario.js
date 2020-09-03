import React, {useEffect,useState} from 'react'
import NavbarPerfil from './NavbarPerfil'


const url ="http://13.65.190.213:8000/api/orders/";

export default function Usuario() {

    const [orders, setOrders]=useState([]);

    const getOrdenes= async ()=>{
      
        const res = await fetch(url,{
            headers: {
                'Authorization': 'Token 31c766acf86fe3ebe6b25799b00a9cf75763d64d',
                  'Accept': 'application/json',
                'Content-type': 'application/json'
              }}
            );
        const data= await res.json();
       console.table(data.results)
        setOrders(data.results); //es para el url verdadero
      // setProductos(data) //de mi api fake json server
      
    }

useEffect(() => {
    getOrdenes();
}, [])
    return (
        <div>
             <NavbarPerfil/>

             <div className="contenido container-fluid ">
<<<<<<< HEAD
             <h3 style={{"marginLeft":"2em"}}>Órdenes</h3>

                <div className="row">

                {/* offset-md-4 */}
                    <div className="col-md-8  offset-md-4 ">
                  
                    <table className="table table-striped table-responsive ">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Número de orden</th>
                            
                            <th scope="col">Productos</th>
                            <th scope="col">Orden</th>
                            <th scope="col">Fecha</th>
=======


                <div className="row">


                    <h3>Órdenes</h3>

                    <div className="col-md-8">
                  
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Número de orden</th>
                            <th scope="col">Número de items</th>
                            <th scope="col">Productos</th>
                            <th scope="col">Orden</th>
>>>>>>> 74cceab4f80164ccb71225ba38f65d60519fc67a
                            </tr>
                        </thead>
                        <tbody>
                            {
                               orders.map(el=>(
                                <tr key={el.id}>
                                <td >{el.number}</td>
<<<<<<< HEAD
                               
=======
                                <td >{el.items.length}</td>
>>>>>>> 74cceab4f80164ccb71225ba38f65d60519fc67a
                                <td >
                                    <ul className="list-unstyled">
                                    {
                                        el.items.map(t=>(
                                            
                                        <li key={t.id}>{t.item.name}</li>
                                            
                                                ))

                                    }
                                    </ul>
                                </td>
                                <td>{
                                el.ordered? "Realizada": "No realizada" 
                                }</td>
<<<<<<< HEAD
                                <td>{ el.created_at }</td>
=======
>>>>>>> 74cceab4f80164ccb71225ba38f65d60519fc67a
                                
                                </tr>

                               ))         

                            }
                        
                        </tbody>
                    </table>    
                 </div>

                </div>
<<<<<<< HEAD
             </div>  
=======
             </div>   
>>>>>>> 74cceab4f80164ccb71225ba38f65d60519fc67a

        </div>
    )
}
