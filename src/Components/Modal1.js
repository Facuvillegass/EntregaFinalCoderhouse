import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContextoGeneral } from "./ContextProvider";

const Modal1 = () => {
  const { pelotasCarrito, setMostrarModal } = useContext(ContextoGeneral);
  return (
    <div className="modal1">
      <div>
        <h4 className="tituloEnModal">
          ¿Ir al carrito con los siguientes productos?
        </h4>
        <div className="productosEnModal">
          {pelotasCarrito.map((pelota) => {
            return (
              <div key={pelota.id}>
                <h4>
                  {pelota.cantidadCarrito}x {pelota.nombre}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/carrito">
        <button
          onClick={() => setMostrarModal(false)}
          className="btnConfirmarEnModal"
        >
          Confirmar
        </button>
      </Link>
      <div>
        <button
          onClick={() => setMostrarModal(false)}
          className="btnNoQuieroEnModal"
        >
          No, quiero seguir viendo productos
        </button>
      </div>
    </div>
  );
};

export default Modal1;
