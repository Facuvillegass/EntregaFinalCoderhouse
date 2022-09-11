import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../Components/FirebaseConfig.js";

const ContextoGeneral = createContext();

const ContextProvider = ({ children }) => {
  const [pelotasCarrito, setPelotasCarrito] = useState([]);
  const [unidadesEnCarrito, setUnidadesEnCarrito] = useState(0);

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = [];

    for (let i in pelotasCarrito) {
      if (pelotasCarrito[i].id !== id) nuevoCarrito.push(pelotasCarrito[i]);
      else
        setUnidadesEnCarrito(
          unidadesEnCarrito - pelotasCarrito[i].cantidadCarrito
        );
    }
    setPelotasCarrito(nuevoCarrito);
  };

  const agregarAlCarrito = (pelota) => {
    setUnidadesEnCarrito(unidadesEnCarrito + pelota.cantidadCarrito);

    for (let i in pelotasCarrito) {
      if (pelotasCarrito[i].id === pelota.id) {
        pelotasCarrito[i].cantidadCarrito += pelota.cantidadCarrito;
        return;
      }
    }
    setPelotasCarrito((pelotasCarrito) => [...pelotasCarrito, pelota]);
  };

  const [mostrarModal, setMostrarModal] = useState(false);

  const [productos, setProductos] = useState([]);
  const [mostrarTodo, setMostrarTodo] = useState(true);

  const getProducts = async () => {
    const productCollection = collection(db, "pelotas");
    const productSnapshot = await getDocs(productCollection);
    const productList = productSnapshot.docs.map((e) => {
      let product = e.data();
      product.id = e.id;
      return product;
    });
    return productList;
  };

  useEffect(() => {
    getProducts().then((res) => {
      setProductos(res);
    });
  }, []);

  const [ordenes, setOrdenes] = useState([]);

  const getOrdenes = async () => {
    const ordenesColeccion = collection(db, "ordenes");
    const productSnapshot = await getDocs(ordenesColeccion);
    const ordenesLista = productSnapshot.docs.map((e) => {
      let product = e.data();
      product.id = e.id;
      return product;
    });
    return ordenesLista;
  };

  const [cantidadDeOrdenesLocales, setCantidadDeOrdenesLocales] = useState(0);

  useEffect(() => {
    getOrdenes().then((res) => {
      setOrdenes(res);
    });
  }, [cantidadDeOrdenesLocales]);

  const data = {
    productos,
    mostrarTodo,
    setMostrarTodo,
    agregarAlCarrito,
    pelotasCarrito,
    setPelotasCarrito,
    mostrarModal,
    setMostrarModal,
    eliminarDelCarrito,
    ordenes,
    setOrdenes,
    unidadesEnCarrito,
    setUnidadesEnCarrito,
    cantidadDeOrdenesLocales,
    setCantidadDeOrdenesLocales,
  };
  return (
    <ContextoGeneral.Provider value={data}>{children}</ContextoGeneral.Provider>
  );
};

export default ContextProvider;
export { ContextoGeneral };
