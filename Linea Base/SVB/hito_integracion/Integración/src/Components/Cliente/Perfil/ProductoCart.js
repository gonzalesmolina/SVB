import React from 'react'

export default function ProductoCart({data,add,del}) {
  
    let cant=[{
        value:"1",
        name:"1"
    },
    {
        value:"2",
        name:"2"
    },
    {
        value:"3",
        name:"3"
    },
    {
        value:"4",
        name:"4"
    },
    {
        value:"5",
        name:"5"
    },
    {
        value:"6",
        name:"6"
    },
    {
        value:"7",
        name:"7"
    },
    {
        value:"8",
        name:"8"
    }
]
        


    const handleChange=(e)=>{
        let valor=e.target.value;
        add(valor,data)
      
    }

    const eliminar=()=>{
      //  console.log(data);
        del(data)
    }


    // useEffect(() => {
    //     // productos= JSON.parse(localStorage.getItem("carrito"));
    // },[])
    return (
        <li className="media">
                        {/* <img className="align-self-center mr-3 img-prodCart" src={data.image} alt={data.name} /> */}
                        <div className="media-body">
                        <h5 className="mt-0 mb-1">
                             {data.name}
                         <span className="my-4"> - S/ {data.price}</span>
                        </h5>
                        <div>
                            <div className="form-group">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                <label className="input-group-text">Cantidad</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01" 
                                value={data.quantity}
                                onChange={handleChange}
                                >
                               { cant.map(v=>(
                                <option key={v.value} value={v.value}>{v.name}</option>

                               ))
                                
                                }
                                </select>
                            </div>
                            </div>
                        </div>
                         <button type="button" className="btn btn-danger" onClick={eliminar}>Eliminar</button>
            </div>
                    </li>
    )
}
