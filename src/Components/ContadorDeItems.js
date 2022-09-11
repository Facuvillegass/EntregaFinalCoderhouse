import "./ContadorDeItems.css";
import { useState } from "react";
import { useContext } from "react";
import { ContextoGeneral } from "./ContextProvider";
import toast, { Toaster } from "react-hot-toast";

const ContadorDeItems = ({ data, setCantidadCarrito }) => {
  const [contador, setContador] = useState(1);
  const { agregarAlCarrito, setMostrarModal } = useContext(ContextoGeneral);
  const notify = () =>
    toast.success("Pelota agregada al carrito!", {
      duration: 1000,
      position: "top-center",
      style: { background: "green", color: "white" },
    });

  const onAdd = () => {
    setCantidadCarrito(contador);
    agregarAlCarrito({ ...data, cantidadCarrito: contador });
    notify();
  };

  return (
    <div className="contadorDeItems">
      <div>
        <button
          className="btnContadorMas"
          onClick={() => {
            setContador(contador + 1);
          }}
        >
          +
        </button>
        <p>{contador}</p>
        <button
          className="btnContadorMenos"
          onClick={() => {
            contador > 1 && setContador(contador - 1);
          }}
        >
          -
        </button>
      </div>
      <button className="btnAgregarAlCarrito" onClick={onAdd}>
        Agregar {contador}{" "}
        <h6 className="nombreEnBtnAgregar">
          {contador == 1 ? data.nombreSintesis : data.nombreSintesisPlural}
        </h6>
        <br />
        <img src="../Assets/carrito.png" width="25" alt="" />
        <Toaster />
      </button>

      <button className="btnIrAPagar" onClick={() => setMostrarModal(true)}>
        Finalizar compra
      </button>
    </div>
  );
};

export default ContadorDeItems;
