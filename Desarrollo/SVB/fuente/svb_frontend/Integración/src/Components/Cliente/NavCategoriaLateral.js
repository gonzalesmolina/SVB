import React,{useState,useEffect} from 'react'
import {NavLink} from  'react-router-dom'


const urlCateg=process.env.REACT_APP_CATEGORIES;


export default function NavCategoriaLateral() {

    const [categ,setCateg]=useState([]);

    const getCategorias= async ()=>{
      
        const res = await fetch(urlCateg);
        const data= await res.json();
     //   console.table("datos",data)
        setCateg(data.results); //es para el url verdadero
      // setCateg(data) //de mi api fake json server
      // console.table("categ en Component Productos:",data.results)
      console.log(categ);
    }

    useEffect(() => {
 
        getCategorias();
        
        
    },[])
    return (
       
        // id="list-example"
                        <div  className="list-group mx-auto">
                            <a className="list-group-item list-group-item-action  cabecera-categoria" href=".">Nuestras categorias</a>
                            {
                                categ.map((catg)=>(
                                    <NavLink to={"/"+catg.name} 
                                    className="list-group-item list-group-item-action" 
                                    key={catg.id}
                                    activeClassName="active"
                                    >{catg.name}</NavLink> 
                                ))
                            }
                            {/* <NavLink to="" className="list-group-item list-group-item-action" href="#list-item-1">Frutas y verduras</NavLink>
                            <NavLink  to="" className="list-group-item list-group-item-action " href="#list-item-2">Bebidas</NavLink>
                            <a className="list-group-item list-group-item-action " href="#list-item-3">Abarrotes</a>
                            <a className="list-group-item list-group-item-action" href="#list-item-4">Golosinas</a>
                            <a className="list-group-item list-group-item-action" href="#list-item-4">Limpieza</a>
                            <a className="list-group-item list-group-item-action" href="#list-item-4">Otros</a> */}
                        </div>
                        
                  
        
    )
}
