import {useJsApiLoader} from "@react-google-maps/api";
import React, {createContext, useEffect, useState} from "react";
import Loading from "../Loading";
import ViewPaginaIndex from "../views/ViewPaginaIndex/ViewPaginaIndex";
import MapaEstacaoEspacial from "../views/ViewPaginaIndex/ViewPaginaIndex";

export default function Index() {
  const [atualizar, setAtualizar] = useState(true); // Para ou Retoma as chmadas para API
  const [showVoltas, setShowVoltas] = useState(false); // Mostra ou Ocultas as linhas de voltas concluídas
  const [dados, setDados] = useState(); // Dados da API
  const [rastros, setRastros] = useState([]); // Usado para fazer a linha no mapa
  const [position, setPosition] = useState({
    lat: -27.096554765736826,
    lng: -48.8930125119364,
  });
  const [posSol, setPosSol] = useState();
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY, // ,
    // ...otherOptions
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

  if (!dados) {
    return <Loading />;
  }
  return (
    <IndexContext.Provider
      value={{dados, isLoaded, position, rastros, posSol, showVoltas, setShowVoltas, atualizar, setAtualizar}}
    >
      <ViewPaginaIndex />
    </IndexContext.Provider>
  );
}

export const IndexContext = createContext();
