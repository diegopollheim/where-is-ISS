import {useEffect, useLayoutEffect, useState} from "react";

import {Circle, GoogleMap, InfoWindow, LoadScript, Marker, Polyline, useJsApiLoader} from "@react-google-maps/api";
import MenuSuperior from "../MenuSuperior/Index";
import Loading from "../Loading";
import locais from "../Data";
import style from "./style.css";
import volta01 from "../Data/voltas/volta01.json";
import volta02 from "../Data/voltas/volta02.json";
import volta03 from "../Data/voltas/volta03.json";
import volta04 from "../Data/voltas/volta04.json";
import volta05 from "../Data/voltas/volta05.json";
import InfoIss from "../InfoIss";

function MapaEstacaoEspacial() {
  const [atualizar, setAtualizar] = useState(true); // Dados da API
  const [showVoltas, setShowVoltas] = useState(false); // Dados da API
  const [dados, setDados] = useState(); // Dados da API
  const [rastros, setRastros] = useState([]); // Usado para fazer a linha no mapa
  const [position, setPosition] = useState({
    lat: -27.096554765736826,
    lng: -48.8930125119364,
  });

  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // ,
    // ...otherOptions
  });

  const [posSol, setPosSol] = useState();
  // Funcao delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Requisição API
  useEffect(async () => {
    await delay(2000);
    if (atualizar) {
      const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
      const data = await res.json();
      setDados(data);

      setPosition({
        lat: data?.latitude,
        lng: data?.longitude,
      });

      // ADICIONANDO NOVO ITEM AO ARRAY DE OBJ COM O TRAJETO FEITO
      setRastros([
        ...rastros,
        {
          lat: dados.latitude,
          lng: dados.longitude,
        },
      ]);

      setPosSol({lat: dados.solar_lat, lng: dados.solar_lon});
    }
  }, [dados, atualizar]);

  var mapOptions = {
    streetViewControl: false,
    disableDefaultUI: true,
    // mapTypeId: "satellite",
    // tilt: 25,
  };

  // Icone mostrado no marcador
  const iconIss = "https://raw.githubusercontent.com/diegopollheim/where-is-ISS/master/public/iss.png";

  // console.log(rastros);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <MenuSuperior
        showVoltas={showVoltas}
        setShowVoltas={setShowVoltas}
        atualizar={atualizar}
        setAtualizar={setAtualizar}
      />
      <div className="container-map">
        <GoogleMap
          onLoad={(map) => {
            window.nite.init(map);
          }}
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

          {/* Linhas com voltas completadas */}
          {showVoltas && (
            <>
              <Polyline
                path={volta01}
                options={{
                  strokeColor: "#eeff00",
                  strokeWeight: 2,
                }}
              />
              <Polyline
                path={volta02}
                options={{
                  strokeColor: "#298300",
                  strokeWeight: 2,
                }}
              />
              <Polyline
                path={volta03}
                options={{
                  strokeColor: "#0d00c9",
                  strokeWeight: 2,
                }}
              />
              <Polyline
                path={volta04}
                options={{
                  strokeColor: "#9b009b",
                  strokeWeight: 2,
                }}
              />
              <Polyline
                path={volta05}
                options={{
                  strokeColor: "#0084d1",
                  strokeWeight: 2,
                }}
              />
            </>
          )}

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
          <InfoIss {...dados} />
        </GoogleMap>

        <iframe
          width="100%"
          height="40%"
          src="https://ustream.tv/embed/17074538?html5ui=1&volume=0&autoplay=true"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </>
  );
}

export default MapaEstacaoEspacial;
