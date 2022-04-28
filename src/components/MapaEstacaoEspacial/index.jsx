import { useEffect, useState } from "react";

import Iss from "../ISS";
import { Circle, GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import MenuSuperior from "../MenuSuperior/Index";
import Loading from "../Loading";
import locais from "../Data";
import style from "./style.css";
import allRastros from "../Data/allRastros.json";

function MapaEstacaoEspacial() {
  const [dados, setDados] = useState(); // Dados da API
  const [rastros, setRastros] = useState([]); // Usado para fazer a linha no mapa
  const [position, setPosition] = useState({
    lat: -27.096554765736826,
    lng: -48.8930125119364,
  });

  const [posSol, setPosSol] = useState();
  // Funcao delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Requisição API
  useEffect(async () => {
    await delay(2000);
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    const data = await res.json();
    setDados(data);

    setPosition({
      lat: dados.latitude,
      lng: dados.longitude,
    });

    // ADICIONANDO NOVO ITEM AO ARRAY DE OBJ COM O TRAJETO FEITO
    setRastros([
      ...rastros,
      {
        lat: dados.latitude,
        lng: dados.longitude,
      },
    ]);

    setPosSol({ lat: dados.solar_lat, lng: dados.solar_lon });
  }, [dados]);

  var mapOptions = {
    streetViewControl: false,
    disableDefaultUI: true,
    // mapTypeId: "satellite",
    // tilt: 25,
  };

  // Icone mostrado no marcador
  const iconIss = "https://raw.githubusercontent.com/diegopollheim/where-is-ISS/master/public/iss.png";

  // console.log(rastros);

  if (!dados) {
    return <Loading />;
  }

  return (
    <>
      <MenuSuperior {...dados} />
      <div className="container-map">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            options={mapOptions}
            mapContainerStyle={{
              width: "100%",
              height: "60%",
            }}
            center={position}
            zoom={2}
          >
            {/* Posição da ISS */}
            <Marker position={position} icon={iconIss} />
            <Polyline
              path={rastros}
              options={{
                strokeColor: "#FF0000",
                strokeWeight: 2,
              }}
            />

            <Marker position={posSol} icon="http://openweathermap.org/img/wn/01d@2x.png" />
            <Circle
              center={position}
              radius={2000000}
              options={{
                strokeColor: "#000",
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: "#000",
                fillOpacity: 0.3,
              }}
            />

            {/* SENAI BRUSQUE */}
            <InfoWindow position={locais.brusque}>
              <span>Brusque</span>
            </InfoWindow>
          </GoogleMap>
        </LoadScript>

        <iframe
          width="100%"
          height="40%"
          src="https://ustream.tv/embed/17074538?html5ui=1&volume=0&autoplay=true"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}

export default MapaEstacaoEspacial;
