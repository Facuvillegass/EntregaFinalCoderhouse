import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { ContextoGeneral } from "./ContextProvider";

const Navbar = () => {
  const { setMostrarTodo, unidadesEnCarrito } = useContext(ContextoGeneral);
  return (
    <div className="navbarContainer">
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link to="/">
            <img src="../Assets/logoBallsWorld.png" width="75" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/">
                <button className="btnNavbar">Inicio</button>
              </Link>
              <Link to="/categorias">
                <button
                  className="btnNavbar"
                  onClick={() => setMostrarTodo(true)}
                >
                  Categorías
                </button>
              </Link>
              <Link to="/seguimientoDeOrden">
                <button className="btnNavbar">Seguimiento de orden</button>
              </Link>
            </ul>
            <Link to="/carrito">
              <button className="btnCarritoNav">
                <span className="navbar-text">
                  <img src="../Assets/carrito.png" width="60" alt="" />
                </span>
                <div className="cantidadItems">
                  <div className="numeroCantidadItems">{unidadesEnCarrito}</div>{" "}
                  {/* ACA HICE CAMBIOS */}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
