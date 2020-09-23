import React,{useState,useEffect} from 'react'
import NavegacionLateral from './NavegacionLateral'
import NavBar from './NavBar';



const urlS = process.env.REACT_APP_SALES;
const token = JSON.parse(localStorage.getItem("token"));

export default function Reporte() {

const [ventas, setVentas] = useState([]);
const [fechaI, setFechaI] = useState('')
const [fechaF, setFechaF] = useState('')
const [prod, setProd] = useState('')


const buscar= async()=>{
  console.log("producto a buscar",prod);
  if(prod)
  {
    const res= await fetch( `${urlS}?product=${prod}`,{
      headers: {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-type': 'application/json'  
      }
    });
    const data= await res.json();
     setVentas(data);
    console.log("ventas",data);
    setProd("");
  }
 else{
  const res= await fetch( `${urlS}?begin=${fechaI}&end=${fechaF}`,{
    headers: {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-type': 'application/json'  
    }
  });
  const data= await res.json();
   setVentas(data);
  console.log("ventas",data);
  setFechaF("")
  setFechaI("")
 }
    // console.log("fecha ini",fechaI);

}


useEffect(() => {
  // obtenerVentas();

},[]) 

    return (
        <>
         <NavBar />
      <div className=" container-fluid contenedor ">
        <div className="row">
          <div className="col-md-3 side-nav">

            <NavegacionLateral />
          </div>
          <div className="col-md-9 ">
          <form >
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label  className="col-form-label" >Fecha inicial</label>
                      <div className="col-10">
                        <input className="form-control" type="date"
                        // value={fechaI}
                         onChange={(e)=>{setFechaI(e.target.value); console.log(fechaI)}} />
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label  className="col-form-label">Fecha Final</label>
                      <div className="col-10">
                        <input className="form-control" type="date" 
                        // value={fechaF}
                        onChange={(e)=>{setFechaF(e.target.value); console.log(fechaF)}} />
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      <label className="col-2 col-form-label">Productos</label>
                      <div className="col-10">
                        <input className="form-control" type="text" value={prod} 
                        onChange={(e)=>{setProd(e.target.value); console.log(prod)}}
                        placeholder="Buscar..."/>
                      </div>
                    </div>
                    <div className="form-group col-md-3">
                      
                      <div >
                      <button type="button" className="btn btn-warning"
                      onClick={()=>buscar()}
                      >Generar</button>
                      </div>
                    </div>
                  </div>
                 
          </form>            
           <h3>Reporte de ventas</h3>


          <table className="table table-striped  table-responsive">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Número</th>
                  <th scope="col">Número de operación</th>
                  <th scope="col" className="text-center">Creado el</th>
                  <th scope="col">Método de pago</th>
                  <th scope="col">Monto S/</th>
                </tr>

              </thead>
              <tbody>
                { ventas.sales?ventas.sales.map((item,i)=>(
                  <tr key={item.id}>
                    <td> {i+1}</td>
                    <td> {item.operation_number}</td>
                    <td> {new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="text-center" >{item.payment_method===3?'Yape':''}</td>
                    
                    <td>{item.amount}</td>
                  </tr>

                )):''}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                <td ><strong>Total: S/ {ventas.total}</strong></td>
                </tr> 
               
              </tbody>
            </table>
                
            </div>
          </div>  
      </div>    
        </>
    )
}
