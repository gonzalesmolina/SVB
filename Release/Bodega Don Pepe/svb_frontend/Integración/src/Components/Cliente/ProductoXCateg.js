import React, { useState, useEffect } from 'react'
import NavBarBodega from './NavBarBodega'
import NavCategoriaLateral from './NavCategoriaLateral'
import CardProducto from './CardProducto'


export default function ProductoXCateg() {


  const [productos, setProductos] = useState([]);
  const [cartShop, setCartShop] = useState(localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : '');


  const idCategoria = window.location.pathname.split("/")[2];
  const url = `${process.env.REACT_APP_PRODUCTS}?category=${idCategoria}`//api real
  // const url=`http://localhost:3000/products?categorias=${idCategoria}`

  const getProductos = async () => {

    const res = await fetch(url);
    const data = await res.json();
    //   console.table("datos",data)
    setProductos(data.results); //es para el url verdadero
    //   setProductos(data) //de mi api fake json server
    //console.table("productos:",data.results)
    // console.table(data)
  }

  const agregar = (p) => {
    let products = [...cartShop];
    let itemInCart = products.find(
      (item) => p.name === item.name
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...p,
        quantity: 1,
      };
      products.push(itemInCart);
    }

    setCartShop(products)


  }
  useEffect(() => {
    // JSON.stringify({... JSON.parse(localStorage.getItem("carrito"))

    localStorage.setItem("carrito", JSON.stringify(cartShop));
    console.log("useEffectooo", cartShop)
  })
  useEffect(() => {

    getProductos();


  }, [url])
  return (
    <>

      <NavBarBodega cartShop={cartShop} />
      <div className="container-fluid contenido">
        <div className="row">
          <div className="col-md-3 catergorias">
            <NavCategoriaLateral />
          </div>
          <div className="col-md-9 ">
            <div className="row d-flex flex-row justify-content-center">

              {
                productos.map((p) => (
                  <CardProducto
                    key={p.id}
                    prod={p}
                    agregar={agregar}
                  />
                ))
              }
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
