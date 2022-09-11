import ContadorDeItems from "./ContadorDeItems";
import { Link } from "react-router-dom";
import { useState } from "react";

const ElementosEnHome = ({ data }) => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  return (
    <div>
      <ul className="elementosEnHome">
        {data.map((p) => {
          return (
           
            <div key={p.id} className="cadaElementoEnHome">
              <h4 className="tituloPelota">{p.nombre}</h4>
              <Link to={"/" + p.id}>
              <img src={p.imagen} className="imgPelota" alt=""/>
              <h6>¡Ver más!</h6>
              {
                p.enOferta &&<img src="../Assets/oferta-especial.png" width="45" alt=""/>
              }
              </Link>
              <h5 className="descripcionElementoHome">{p.descripcion}</h5>
              <h4>Precio: ${p.precio}</h4>
              <ContadorDeItems data={p} setCantidadCarrito={setCantidadCarrito}/>
            </div>
           
          );
        })}
      </ul>
    </div>
  );
};

export default ElementosEnHome;
