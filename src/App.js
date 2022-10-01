import "./styles.css";
import Context from './Context'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Favoritos from "./views/Favoritos";

export default function App() {
  const endpoint = "/fotos.json"; //RUTA DE API (EN ESTE CASO, ES LOCAL)
  const [imagenes, setImagenes] = useState([]);

  const arregloImagenes = async () => {
    const response = await fetch(endpoint); //METODO FETCH PARA CONSUMO DE API (.JSON)
    const data = await response.json();
    let datosFiltrados = data.photos.map((e) => ({ //FILTRO APLICADO PARA DATOS A UTILIZAR DEL ARREGLO
      id: e.id,
      origen: e.src.medium,
      descripcion: e.alt
    }));
    setImagenes(datosFiltrados);
  };

  useEffect(() => {
    arregloImagenes();
  }, []); //SE EJECUTA SOLO UNA VEZ AL MOMENTO DEL MONTAJE, OBTIENE LA INFO DE LA API

  return (
    <div className="App">
      <Context.Provider value={{ imagenes, setImagenes }}> 
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}
