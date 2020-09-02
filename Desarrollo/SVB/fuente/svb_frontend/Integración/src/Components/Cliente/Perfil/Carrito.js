import React,{useState} from 'react'
import NavbarPerfil from './NavbarPerfil'
import ProductoCart from './ProductoCart'



export default function Carrito() {

     const [bolsa, setBolsa] = useState(localStorage.getItem("carrito")?JSON.parse(localStorage.getItem("carrito")):'');
 
   
    const edit=(nuevaCant,prod)=>{
      //  console.log(nuevaCant,prod);
        bolsa.map(m=>{
                        if(m.id===prod.id)  
                        { m.quantity=nuevaCant;
                        // console.log("Qnew",m.quantity);
                         }
                    })
             localStorage.setItem("carrito", JSON.stringify(bolsa));
             setBolsa( JSON.parse(localStorage.getItem("carrito")));
    }
    const borrar=(prod)=>{
        console.log("borrar",bolsa.indexOf(prod));
        let index=bolsa.indexOf(prod);
        bolsa.splice(index,1);
        console.log("nueva bolsa con el borrado",bolsa);
        localStorage.setItem("carrito", JSON.stringify(bolsa));
        setBolsa( JSON.parse(localStorage.getItem("carrito")));
      }

  
    
    return (
        <>
        <NavbarPerfil/>
           
        <div className="contenido container-fluid ">


            <div className="row">
                 <div className="col-md-6">
                    <ul className="list-unstyled">
                        {
                            bolsa?
                            bolsa.map((el)=>(
                                <ProductoCart  
                                key={el.id } 
                                data={el}
                                add={edit}
                                del={borrar}
                                />
                            )): ''
                        }
                        
                    </ul>
                 </div>
                    <div className="col-md-6">
                        <Total bolsa={bolsa}/>

                    </div>
            </div>
        </div>                
        </>
    )
}


function Total({bolsa}) {
   
    let sub=0;
   
    
    // <p>{sub}</p>
        bolsa &&  bolsa.map((el)=>{ sub+= el.quantity*el.price ;  })
   
    
    return (

        <div className="detalle">
                        <div className="mb-4 text-center w-100">
                            <h3>RESUMEN DE PEDIDO</h3>
                        </div>
                        <div className="mb-2 ml-5 mr-5">
                            <div className="d-flex justify-content-between">
                            <h5>
                                SUBTOTAL: 
                            </h5>
                            <h5> S/
                               {sub.toFixed(2)}
                            </h5>
                            </div>
                        </div>
                        <div className="mb-2 ml-5 mr-5">
                            <div className="d-flex justify-content-between">
                            <h5>
                                ENVÍO: 
                            </h5>
                            <h5>
                                S/10.00
                            </h5>
                            </div>
                        </div>
                        <div className="mb-2 ml-5 mr-5">
                            <div className="d-flex justify-content-between">
                            <h5> 
                                TOTAL: 
                            </h5>
                            <h5>S/
                                {
                                    (sub)? `${(sub+10).toFixed(1)}0`:0
                               }
                            </h5>
                            </div>
                        </div>
                        <div className="w-100 text-center">
                            <button className="btn btn-lg btn-block btn-success">Comprar</button>
                        </div>
                        </div>
        
    )
}