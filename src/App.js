import "./App.css";
import ContextProvider from "./Components/ContextProvider";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementoEnDetalle from "./Components/ElementoEnDetalle";
import Categorias from "./Components/Categorias";
import PelotasEnCategorias from "./Components/PelotasEnCategorias";
import Carrito from "./Components/Carrito";
import SeguimientoDeOrden from "./Components/SeguimientoDeOrden";

function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<ElementoEnDetalle />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route
              path="/categorias/:categoria"
              element={<PelotasEnCategorias />}
            />
            <Route path="/*" element={<h3>ERROR: Página no encontrada</h3>} />
            <Route path="/carrito" element={<Carrito />} />
            <Route
              path="/seguimientoDeOrden"
              element={<SeguimientoDeOrden />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
