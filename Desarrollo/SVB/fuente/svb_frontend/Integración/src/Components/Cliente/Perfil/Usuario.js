import React, { useEffect, useState } from 'react'
import NavbarPerfil from './NavbarPerfil'


const url = process.env.REACT_APP_ORDERS;
const token = JSON.parse(localStorage.getItem("token"));

export default function Usuario() {

    const [orders, setOrders] = useState([]);

    const getOrdenes = async () => {

        const res = await fetch(url, {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }
        );
        const data = await res.json();
        console.table(data.results)
        console.log("tipo",typeof(data.results));
        setOrders(data.results); //es para el url verdadero
        // setProductos(data) //de mi api fake json server
        console.log("ordeeers",orders);

    }

    useEffect(() => {
        getOrdenes();
    }, [])
    return (
        <div>
            <NavbarPerfil />

            <div className="contenido container-fluid ">
                <h3 style={{ "marginLeft": "2em" }}>Órdenes</h3>

                <div className="row">

                    {/* offset-md-4 */}
                    <div className="col-md-8  offset-md-4 ">

                        <table className="table table-striped table-responsive hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">N° Orden</th>
                                    <th scope="col">Productos</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Monto (S/)</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(el => (
                                        <tr key={el.id}>
                                            <td >{el.number}</td>
                                            <td >
                                                <ul className="list-unstyled">
                                                    {
                                                        el.items.map(t => (
                                                        <li key={t.id}>  <i>{t.quantity} uni</i> {t.item.name}</li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                            <td>{
                                                el.ordered ? "Realizada" : "No realizada"
                                            }</td>
                                            <td><strong>{el.total_amount.toFixed(2)}</strong></td>
                                            <td>
                                                {new Date(el.created_at).toLocaleDateString()}
                                                <br/>
                                                {new Date(el.created_at).toLocaleTimeString()}
                                                
                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    )
}
