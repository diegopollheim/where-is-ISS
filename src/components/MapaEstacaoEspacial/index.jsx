import {useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import MenuSuperior from "../MenuSuperior/Index";
import Iss from "../ISS";

function MapaEstacaoEspacial(props) {
  const [dados, setDados] = useState(1);
  const [rastros, setRastros] = useState([{}]);

  // Funcao delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Requisição API
  useEffect(async () => {
    await delay(2000);
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await res.json();
    setDados(data);

    // ARRAY DE OBJ COM O TRAJETO FEITO 
    setRastros([
      ...rastros,
      {
        lat: dados.latitude,
        lng: dados.longitude,
      },
    ]);

  }, [dados]);

  const defaultProps = {
    center: {
      lat: 0.05069659588340878,
      lng: -10.769468209507245,
    },
    zoom: 0,
  };

  return (
    <div style={{height: "100vh", width: "100%"}}>
      <MenuSuperior {...dados} />
      <GoogleMapReact
        bootstrapURLKeys={{key: ""}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {rastros.map((rastro) => {
          // Adiciona um "." para cada item dentro do array de rastro. Basedado nas coordenadas
          return (
            <h1 lat={rastro.lat} lng={rastro.lng}>
              .
            </h1>
          );
        })}

        <Iss lat={dados.latitude} lng={dados.longitude} />
      </GoogleMapReact>
    </div>
  );
}

export default MapaEstacaoEspacial;