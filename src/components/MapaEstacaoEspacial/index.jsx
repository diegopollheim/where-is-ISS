import {useEffect, useState} from "react";

import Iss from "../ISS";
import {GoogleMap, InfoWindow, LoadScript, Marker, Polyline} from "@react-google-maps/api";
import MenuSuperior from "../MenuSuperior/Index";
import Loading from "../Loading";

function MapaEstacaoEspacial() {
  const [dados, setDados] = useState(); // Dados da API
  const [rastros, setRastros] = useState([{}]); // Usado para fazer a linha no mapa
  const [position, setPosition] = useState({
    lat: -27.096554765736826,
    lng: -48.8930125119364,
  });

  // Funcao delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Requisição API
  useEffect(async () => {
    await delay(2000);
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await res.json();
    setDados(data);

    // ADICIONANDO NOVO ITEM AO ARRAY DE OBJ COM O TRAJETO FEITO
    setRastros([
      ...rastros,
      {
        lat: dados.latitude,
        lng: dados.longitude,
      },
    ]);

    setPosition({
      lat: dados.latitude,
      lng: dados.longitude,
    });
  }, [dados]);

  // Remove o priemiro objeto vazio do array de rastros
  if (rastros[0].lat == undefined) {
    rastros.shift();
  }
  // Icone mostrado no marcador
  const iconIss = "https://raw.githubusercontent.com/diegopollheim/where-is-ISS/master/public/iss.png";

  console.log(rastros);

  if (!dados) {
    return <Loading />;
  }

  return (
    <>
      <MenuSuperior {...dados} />
      <LoadScript googleMapsApiKey="AIzaSyDdk4QLWPmk3KbK79iSwnYsFYYvFLFDaak">
        <GoogleMap
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          center={position}
          zoom={4}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker position={position} icon={iconIss} />
          <Polyline path={rastros} />

          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapaEstacaoEspacial;
