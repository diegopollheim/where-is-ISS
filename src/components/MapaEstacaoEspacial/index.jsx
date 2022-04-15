import {useEffect, useState} from "react";

import Iss from "../ISS";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import MenuSuperior from "../MenuSuperior/Index";
import Loading from "../Loading";

function MapaEstacaoEspacial() {
  const [dados, setDados] = useState();
  const [rastros, setRastros] = useState([{}]);
  const [position, setPosition] = useState({
    lat: 0.05069659588340878,
    lng: -10.769468209507245,
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

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const iconIss = "";

  // Posicionamento default da tela
console.log(position)
  if (!dados) {
    return <Loading />;
  }

  return (
    <>
      <MenuSuperior {...dados} />
      <LoadScript googleMapsApiKey="AIzaSyDdk4QLWPmk3KbK79iSwnYsFYYvFLFDaak">
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={4}>
          {/* Child components, such as markers, info windows, etc. */}
          <Marker position={position} icon={iconIss} />

          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default MapaEstacaoEspacial;
