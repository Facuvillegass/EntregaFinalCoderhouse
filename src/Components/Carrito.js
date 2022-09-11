import { useContext, useState } from "react";
import { ContextoGeneral } from "./ContextProvider";
import "./Carrito.css";
import FormModal from "./FormModal";
import db from "../Components/FirebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Carrito = () => {
  const [idEstadoOrden, setIdEstadoOrden] = useState();

  const {
    pelotasCarrito,
    setPelotasCarrito,
    eliminarDelCarrito,
    unidadesEnCarrito,
    setUnidadesEnCarrito,
    ordenes,
    setOrdenes,
    cantidadDeOrdenesLocales,
    setCantidadDeOrdenesLocales,
  } = useContext(ContextoGeneral);

  let sumaTotal = 0;
  pelotasCarrito.map((pelota) => {
    const sumaCadaProducto =
      pelota.cantidadCarrito *
      (pelota.enOferta ? pelota.precio * 0.8 : pelota.precio);
    sumaTotal = sumaTotal + sumaCadaProducto;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [ordenOk, setOrdenOk] = useState();
  const dataAFirebase = (e) => {
    e.preventDefault();
    pushData({ ...order, dataComprador: formData });
  };

  const pushData = async (orden) => {
    const collectionRef = collection(db, "ordenes");
    const orderDoc = await addDoc(collectionRef, orden);

    setOrdenes([...ordenes, orden]);
    setOrdenOk(orderDoc.id);
    console.log(ordenes);
    setCantidadDeOrdenesLocales(cantidadDeOrdenesLocales + 1);
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
  });

  const formChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [order, SetOrder] = useState({
    items: pelotasCarrito.map((producto) => {
      return {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidadCarrito,
      };
    }),
    dataComprador: {},
    total: sumaTotal,
    enProceso: true,
  });

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  const [acomodarForm, setAcomodarForm] = useState(true);

  const generarOrden = () => {
    setAcomodarForm(false);
    setMostrarFormulario(true);
    setPelotasCarrito([]);
    setUnidadesEnCarrito(0);
  };

  return (
    <div>
      {acomodarForm && (
        <div className="contenedorCarrito">
          {sumaTotal === 0 ? (
            <h2 className="tituloCarrito">¡Agrega productos a tu carrito!</h2>
          ) : (
            <h2 className="tituloCarrito">¡Último paso!</h2>
          )}
          {pelotasCarrito.map((pelota) => {
            return (
              <div key={pelota.id}>
                <div className="detalleElementoEnCarrito">
                  <h4 className="tituloPelotaEnCarrito">{pelota.nombre}</h4>
                  <img src={pelota.imagen} height="50" alt="" />
                  <h4>
                    Precio por unidad: $
                    {pelota.enOferta ? pelota.precio * 0.8 : pelota.precio}
                  </h4>
                  {pelota.cantidadCarrito === 1 ? (
                    <h6>
                      Tienes en tu carrito {pelota.cantidadCarrito} unidad.
                    </h6>
                  ) : (
                    <h6>
                      Tienes en tu carrito {pelota.cantidadCarrito} unidades.
                    </h6>
                  )}
                  {pelota.enOferta && (
                    <img
                      src="../Assets/oferta-especial.png"
                      width="45"
                      alt=""
                    />
                  )}
                  <h4 className="precioEnCarrito">
                    El precio es: $
                    {(pelota.enOferta ? pelota.precio * 0.8 : pelota.precio) *
                      pelota.cantidadCarrito}
                  </h4>
                  <button onClick={() => eliminarDelCarrito(pelota.id)}>
                    Eliminar pelota del carrito
                  </button>
                </div>
              </div>
            );
          })}
          {unidadesEnCarrito > 0 ? (
            <>
              <div className="cuadroDePago">
                <h3 className="tituloCarrito">Precio total: ${sumaTotal}</h3>
                <button className="btnGenerarOrden" onClick={generarOrden}>
                  ¡Generar orden de pago!
                </button>
              </div>
              <div className="btnVaciar">
                <button
                  className="btnVaciarCarrito"
                  onClick={() => {
                    setPelotasCarrito([]);
                    setUnidadesEnCarrito(0);
                  }}
                >
                  Vaciar mi carrito
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  cursor: "pointer",
                  boxShadow: "rgba(0,0,0,0.1) 2px 2px 6px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  Ver productos
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        {mostrarFormulario && (
          <FormModal title="Formulario de orden de compra">
            {ordenOk ? (
              <>
                <h3>¡La orden ya está generada!</h3>
                <p>
                  Recuerda guardar este ID para que puedas consultar el estado
                  de tu orden en cualquier momento.
                </p>
                <h2 style={{ "margin-top": 30 }}>
                  ID de seguimiento:
                  <br /> {ordenOk}
                </h2>

                <Link to="/seguimientoDeOrden">
                  <button
                    onClick={() => {
                      localStorage.setItem("orden", ordenOk);
                    }}
                  >
                    Segui tu orden
                  </button>
                </Link>

                <Link to="/">
                  <button>Inicio</button>
                </Link>
              </>
            ) : (
              <form onSubmit={dataAFirebase}>
                <div className="camposFormulario">
                  <input
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={formChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Ingrese su apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={formChange}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Ingrese su teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={formChange}
                    required
                  />
                </div>
                <button type="submit" className="btnEnviarInfoForm">
                  Enviar info
                </button>
                <br />
                <button onClick={cerrarFormulario}>Cerrar</button>
              </form>
            )}
          </FormModal>
        )}
      </div>
    </div>
  );
};

export default Carrito;
