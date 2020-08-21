import React,{useState,useEffect} from 'react'
import NavBarBodega from './NavBarBodega'
import CardCategoria from './CardCategoria'


//const url="http://localhost:3000/categorias";  //api fake
const url="http://13.65.190.213:8000/api/products/categories" //api real

export default function Home() {

    const [categoria, setCategoria]=useState([]);

    const getCategorias= async ()=>{
      
        const res = await fetch(url);
        const data= await res.json();
       //console.table("datos",data);
     setCategoria(data.results); // url verdadero
       //setCategoria(data) // api fake json server
    }
    useEffect(() => {
 
        getCategorias();
        
        
    },[])
    return (
        <div>
            <NavBarBodega/>
            <div className="container-fluid contenido">

            <div className="row  d-flex flex-row justify-content-center">
               
               {
                   categoria.map((categ ,i) =>(
                       (categ.is_active)?
                      <CardCategoria name={categ.name}/>: <></>
                   
                   ))
               }
               
            
           
           </div>


            </div>
        </div>
    )
}
