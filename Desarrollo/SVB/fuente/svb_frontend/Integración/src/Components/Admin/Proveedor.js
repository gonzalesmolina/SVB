import React, {useEffect,useState} from 'react';
 import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
 import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
 import NavegacionLateral from './NavegacionLateral';
 import NavBar from './NavBar'



  const url="http://localhost:3000/proveedores"; //api fake
 //const url="http://13.65.190.213:8000/api/suppliers/suppliers"; //api real

export default function Proveedor() {
    const [proveedor, setProveedor]=useState([]);
    const [modalInsertar, setModalInsertar] = useState(false)
    const [modalEliminar, setModalEliminar] = useState(false)
    const [formu, setFormu] = useState({
        id:'',
        ruc:'',
        name:'',
        office_phone_number:'',
        mobile_phone_number:'',
        address: '',
        category:'',
        is_active: false,
        tipoModal:''
    })

    const getProveedores= async ()=>{
      
        const res = await fetch(url);
        const data= await res.json();
     //   console.table("datos",data)
       // setProveedor(data.results); //es para api real
       setProveedor(data) //de mi api fake json server 
    }

    const postProveedores= async()=>{
        try{
     const res=   await fetch(url,{
            method: 'POST',
            body: JSON.stringify(formu),
            headers: {
                'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
     const formatoJson=await res.json();
    // console.log(formatoJson);     
          getProveedores();
          ModalInsertar();
        }catch(error){
            console.log(error.message);
        }
          
          
        

    }
function ModalInsertar(){
    setModalInsertar(!modalInsertar);

}


const handleChange= async (e)=>{
    e.persist();
  
    await setFormu({
        ...formu,
        [e.target.name]: e.target.value 
    })

   
}

const seleccionarProveedor=(el)=>{
    setFormu({
        id:el.id,
        ruc:el.ruc,
        name:el.name,
        office_phone_number:el.office_phone_number,
        mobile_phone_number:el.mobile_phone_number,
        address:el.address,
        category:el.category,
        is_active:el.is_active,
        tipoModal:'actualizar'
        
    })
  
  
}
const peticionPut= async()=>{
    try{
        const res=   await fetch(url+"/"+formu.id,{
               method: 'PUT',
               body: JSON.stringify(formu),
               headers: {
                //    'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             })
        const Json=await res.json();
     //   console.log(Json);     
            
             ModalInsertar();
             getProveedores();
           }catch(error){
               console.log(error.message);
           }

}


const peticionDelete=()=>{
    axios.delete(url+"/"+formu.id).then(response=>{
   
      setModalEliminar(false);
      getProveedores();
  
    })
  }

 useEffect(() => {
 
    getProveedores();
    
    
},[])

    return (
        <>
           <NavBar/>
        <div className=" container-fluid contenedor ">
        <div className="row">
            <div className="col-md-3 side-nav">

            <NavegacionLateral/>
            </div>
             <div className="col-md-9 ">
               {/* <div > sirve para centrar la tabla */}
               
     {/* <div class="table-responsive">  */}
     <button type="button" className="btn btn-primary"   onClick={()=>{ModalInsertar() ; setFormu({
      ...null,
        tipoModal:'insertar'
        
    }) }}>
      Nuevo proveedor
    </button>
        <table className="table table-striped  table-responsive">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">ID</th> */}
                <th scope="col">Nombre</th>
                <th scope="col">Rubro</th>
                <th scope="col">Ruc</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Celular</th>
                <th scope="col">Dirección</th>
                <th scope="col">Estado</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
              </tr>

            </thead>
            <tbody>
                { proveedor.map((el,i)=>(
                    <tr key={i}>
                    {/* <td >{el.id}</td> */}
                    <td>{el.name}</td>
                    <td>{el.category}</td>
                    <td>{el.ruc}</td>
                    <td>{el.office_phone_number}</td>
                    <td>{el.mobile_phone_number}</td>
                    <td>{el.address}</td>
                    {(el.is_active)? <td>Activo</td> : <td>No activo</td>}
                    <td className="text-center" >

                        <i className="fa fa-edit fa-1x " onClick={()=>{seleccionarProveedor(el); ModalInsertar()}}></i>
                        
                        </td>
                    <td className="text-center"   >
                        <i className="fa fa-trash-alt fa-1x " onClick={()=>{seleccionarProveedor(el); setModalEliminar(true)}}></i>
                        </td>
                    
                  </tr>

                ))
                     

                }
               
                 
                  
             
              
           
              
            </tbody>
          </table>
   {/* </div> sirve para centrar la tabla */}
   <Modal isOpen={modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                <h5 className="modal-title">Ingresar datos del proveedor</h5>
                  <span style={{float: 'right', cursor: 'pointer'}} onClick={()=>ModalInsertar()}
                  className="close"
                  >x</span>
               
                </ModalHeader>
                <ModalBody>
                <form >
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >Nombre</label>
                          <input name="name" type="text" className="form-control"
                           placeholder="Nombre" onChange={handleChange} value={formu?formu.name:''}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Rubro</label>
                          <input name="category" type="text" className="form-control" 
                          placeholder="Rubro" onChange={handleChange} value={formu?formu.category:''}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >RUC</label>
                          <input name="ruc" type="text" className="form-control"
                           placeholder="RUC: 10446937832" onChange={handleChange} value={formu?formu.ruc:''}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Teléfono</label>
                          <input name="office_phone_number" type="text" className="form-control" 
                          placeholder="Teléfono" onChange={handleChange} value={formu?formu.office_phone_number:''}/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label >Celular</label>
                          <input name="mobile_phone_number" type="text" className="form-control"
                           placeholder="Cel." onChange={handleChange} value={formu?formu.mobile_phone_number:''}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Dirección</label>
                          <input name="address" type="text" className="form-control" 
                          placeholder="Dirección..." onChange={handleChange} value={formu?formu.address:''}/>
                        </div>
                      </div>
                    
                   
                    <div className="form-row">
                        
                        <div className="form-group col-md-6 ">
                            <label>Estado:</label> <br/>
                            <input type="checkbox" name="is_active"  
                            onChange={(e)=> {setFormu({...formu, is_active: e.target.checked}) }} 
                            checked={formu.is_active} />
                            <label > Activo </label>
                           
                          </div>
                          
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  { formu.tipoModal==='insertar'? 
                  <button type="button" className="btn btn-primary" onClick={()=>postProveedores()}>Guardar</button>
                  :<button className="btn btn-primary" type="button" onClick={()=>peticionPut()}> Actualizar </button>
                    } 
                    {/* <button className="btn btn-danger" onClick={()=>ModalInsertar()}>Cancelar</button> */}
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>ModalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>  

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                ¿Estás seguro que deseas eliminar el proveedor {formu && formu.name}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>peticionDelete()}>Sí</button>
                    <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}>No</button>
                    </ModalFooter>
            </Modal>
            </div>
        </div>
    </div>  
        </>
    )
}
