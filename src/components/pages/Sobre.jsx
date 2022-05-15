import {GoogleMap, useGoogleMap, LoadScript, useJsApiLoader, useLoadScript} from "@react-google-maps/api";
import React, {useEffect, useLayoutEffect} from "react";
import InfoIss from "../InfoIss";

export default function Sobre() {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDdk4QLWPmk3KbK79iSwnYsFYYvFLFDaak", // ,
    // ...otherOptions
  });

  const containerStyle = {
    width: "900px",
    height: "500px",
  };

  const center = {
    lat: -27,
    lng: -48,
  };

  if (isLoaded) {
    return (
      <div id="map" style={{width: "900px", height: "500px"}}>
        <GoogleMap 
        
        
        options={{
          minZoom:3
        }}
        mapContainerStyle={containerStyle} center={center} zoom={4} />;
      </div>
    );
  }

  return (
    
      <h2>Carregando mapa...</h2>
   
  );
}
