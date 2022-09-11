import { useContext, useState } from "react";
import { ContextoGeneral } from "./ContextProvider";
import "./SeguimientoDeOrden.css";

const SeguimientoDeOrden = () => {
  const { ordenes } = useContext(ContextoGeneral);
  const [usuarioId, setUsuarioId] = useState();

  const [ordenesUsuario, setOrdenesUsuario] = useState([]);

  const [checkId, setCheckId] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setOrdenesUsuario(ordenes.filter((orden) => orden.id === usuarioId));
    setCheckId(true);
  };

  const [ordenRecuperada, setOrdenRecuperada] = useState();

  const recuperarOrden = () => {
    const ultimaOrden = localStorage.getItem("orden");
    setOrdenRecuperada(ultimaOrden);
    localStorage.clear();
  };
  return (
    <div>
      <div className="formularioSeguimientoOrden">
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Pega tu ID de orden"
            onChange={(e) => setUsuarioId(e.target.value)}
          />
          <div>
            <button className="btnVerSeguimiento" type="submit">
              Consultar el estado de mi orden
            </button>
          </div>
          <br />

          <button onClick={() => recuperarOrden()}>
            Ver el ID de mi última orden
          </button>
          <br />
          <br />

          <h5>El ID de tu última orden es:</h5>
          <h4>{ordenRecuperada}</h4>
        </form>
      </div>

      <div>
        {checkId &&
          ordenesUsuario.map((orden, index) => {
            return (
              <div className="ordenDeSeguimiento" key={index}>
                <h2> Tu orden ID: {orden.id}</h2>
                {orden.items.map((o) => {
                  return (
                    <>
                      <h3>
                        {o.cantidad}X de {o.nombre}
                      </h3>
                    </>
                  );
                })}
                <div>
                  {orden.enProceso ? (
                    <div>
                      <h4>
                        Estamos procesando tu pedido. En breve te enviaremos por
                        correo electrónico la confirmación oficial.
                      </h4>
                      <h5>Gracias por elegirnos!</h5>
                    </div>
                  ) : (
                    <div>
                      <h2>
                        Todavía no pudimos procesar tu pedido. Por favor,
                        intenta nuevamente realizar tu compra.
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SeguimientoDeOrden;
