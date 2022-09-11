import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../Components/FirebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import "./ElementoEnDetalle.css";
import ContadorDeItems from "./ContadorDeItems.js";
import { useContext } from "react";
import { ContextoGeneral } from "./ContextProvider";
import Modal1 from "./Modal1";

const ElementoEnDetalle = () => {
  const { mostrarModal } = useContext(ContextoGeneral);

  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const { id } = useParams();
  const [producto, setProducto] = useState({});

  useEffect(() => {
    obtenerProducto().then((res) => {
      setProducto(res);
    });
  }, [id]);

  const obtenerProducto = async () => {
    const docRef = doc(db, "pelotas", id);
    const docSnapshot = await getDoc(docRef);
    docSnapshot.data();
    let producto = docSnapshot.data();
    producto.id = docSnapshot.id;
    return producto;
  };
  return (
    <div>
      <div>{mostrarModal && <Modal1 />}</div>
      <div className={`${mostrarModal ? "claseOpacity" : undefined}`}>
        <div className="elementoEnDetalle">
          <ul>
            <h3 className="tituloDetalle">{producto.nombre}</h3>
            <img
              className="imagenDetalle"
              src={producto.imagen}
              alt=""
              width="150"
            />
            <h5>{producto.descripcionDetalle}</h5>
            <img
              className="imagenDealleGrande"
              src={producto.imgDetalle}
              width="400"
              alt=""
            />
            <h4>Precio por unidad: ${producto.precio}</h4>
            {producto.enOferta && (
              <div className="ofertaEnDetalle">
                <h2>¡Producto en oferta!</h2>
                <img src="../Assets/oferta-especial.png" width="100" alt="" />
                <div>
                  <h3>
                    Precio final por cada {producto.nombreSintesis}:{" "}
                    <h2>${producto.precio * 0.8}</h2>
                  </h3>
                </div>
              </div>
            )}
            <div className="contadorDeItemsDetalle">
              <ContadorDeItems
                data={producto}
                setCantidadCarrito={setCantidadCarrito}
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ElementoEnDetalle;
