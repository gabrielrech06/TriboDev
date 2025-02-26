// Importando outlet para o uso de rotas
import { Outlet } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1000px] mx-auto my-[2rem] px-[2rem]">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
