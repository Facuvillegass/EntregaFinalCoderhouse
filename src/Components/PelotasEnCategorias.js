import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextoGeneral } from "./ContextProvider";
import ElementosEnHome from "./ElementosEnHome.js";
import ContadorDeItems from "./ContadorDeItems";
import Modal1 from "./Modal1";

const PelotasEnCategorias = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const { productos, mostrarTodo, setMostrarTodo, mostrarModal } =
    useContext(ContextoGeneral);
  const { categoria } = useParams();

  return (
    <div>
      {mostrarTodo && <ElementosEnHome data={productos} key={productos.id} />}
      <div>{mostrarModal && <Modal1 />}</div>
      <div>
        <div className="btnCategorias">
          <h2>¡Filtrá pelotas por deporte!</h2>
          <Link to="/categorias/futbol">
            <button
              className="btnFutbol"
              onClick={() => {
                setMostrarTodo(false);
              }}
            >
              Pelotas de fútbol
            </button>
          </Link>
          <Link to="/categorias/tenis">
            <button
              className="btnTenis"
              onClick={() => {
                setMostrarTodo(false);
              }}
            >
              Tubos de pelotas de tenis
            </button>
          </Link>
          <Link to="/categorias/ovaladas">
            <button
              className="btnOvaladas"
              onClick={() => {
                setMostrarTodo(false);
              }}
            >
              Guindas y otras pelotas ovaladas
            </button>
          </Link>
          <Link to="/categorias/basquet">
            <button
              className="btnBasquet"
              onClick={() => {
                setMostrarTodo(false);
              }}
            >
              Pelotas de básquet
            </button>
          </Link>
          <Link to="/categorias/voley">
            <button
              className="btnVoley"
              onClick={() => {
                setMostrarTodo(false);
              }}
            >
              Pelotas de vóley
            </button>
          </Link>
        </div>
      </div>
      {productos.map((pelota) => {
        if (pelota.categoria == categoria) {
          return (
            <div className={`${mostrarModal ? "claseOpacity" : undefined}`}>
              <div>
                <div key={pelota.id} className="cadaElementoEnHomeCat">
                  <h4 className="tituloPelota">{pelota.nombre}</h4>
                  <Link to={"/" + pelota.id}>
                    <img src={pelota.imagen} className="imgPelota" />
                    <h6>¡Ver más!</h6>
                  </Link>
                  <h5 className="descripcionElementoHome">
                    {pelota.descripcion}
                  </h5>
                  <h4>Precio: ${pelota.precio}</h4>
                  <ContadorDeItems
                    data={pelota}
                    setCantidadCarrito={setCantidadCarrito}
                  />
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PelotasEnCategorias;
