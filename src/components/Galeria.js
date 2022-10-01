import "../assets/css/galeria.css";
import Heart from "./Heart";
import { useContext } from "react"
import Context from "../Context"

export default function Galeria() {
  const { imagenes, setImagenes } = useContext(Context); //CONSUMO DEL CONTEXTO
  const creaFavoritos = (id) => {
    const galeriaImagenes = imagenes.findIndex((e) => e.id === id);
    imagenes[galeriaImagenes].liked = !imagenes[galeriaImagenes].liked; //CAMBIO DE ESTADO (FALSE - TRUE, TRUE - FALSE) 
    setImagenes([...imagenes]);
  };

  return (
    <div className="galeria grid-columns-5 p-3">
      {imagenes.map((e, i) => ( //MUESTRA TODAS LAS IMAGENES
        //LLAMADO A FUNCION DE FAVORITOS SI SE HACE CLICK SOBRE LA IMAGEN
        <div onClick={() => creaFavoritos(e.id)} className="foto" style={{ backgroundImage: `url(${e.origen})` }} key={i}>
          <Heart filled={e.liked} />
          <p>{e.descripcion}</p>  {/* MUESTRA LA DESCRIPCION DENTRO DE LA IMAGEN */}
        </div>
      ))}
    </div>
  );
}
