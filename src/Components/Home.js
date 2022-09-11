import "./Home.css";
import ElementosEnHome from "./ElementosEnHome";
import { useContext } from "react";
import { ContextoGeneral } from "./ContextProvider";
import Modal1 from "./Modal1";


const Home = () => {
  const { productos, mostrarModal } = useContext(ContextoGeneral);
  

  return (
    <div>
      <div className="logoHome">
        <img src="./Assets/logoBallsWorld.png" width="180" />
      </div>
      <div>{mostrarModal && <Modal1 />}</div>
      <div className={`${mostrarModal ? "claseOpacity" : undefined}`}>
        <ElementosEnHome data={productos} key={productos.id} />
      </div>
    </div>
  );
};

export default Home;
