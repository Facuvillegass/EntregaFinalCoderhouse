import { Link } from "react-router-dom";
import "./Categorias.css";
import { useContext } from "react";
import { ContextoGeneral } from "./ContextProvider";
import PelotasEnCategorias from "./PelotasEnCategorias";
import Modal1 from "./Modal1";

const Categorias = () => {
  const { productos, setMostrarTodo, mostrarModal } = useContext(ContextoGeneral);

  return (
    <div>
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
      <div>
      <div>{mostrarModal && <Modal1 />}</div>
      </div>
      <div className={`${mostrarModal ? "claseOpacity" : undefined}`}>
      <PelotasEnCategorias data={productos} />
      </div>
    </div>
  );
};

export default Categorias;
