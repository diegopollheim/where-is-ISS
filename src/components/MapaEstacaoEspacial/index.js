import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";


// Componente da ISS
const AnyReactComponent = () => (
  <div style={{ width: "30px", height: "30px", backgroundColor: "red" }}></div>
);

function MapaEstacaoEspacial() {
  const [dados, setDados] = useState(1);
  // useEffect(() => {
  //   setTimeout(async function () {
  //     const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  //     const data = await res.json();
  //     setDados(data);
  //   }, 2000);
  // }, [dados]);

  console.log(dados)

  const defaultProps = {
    center: {
      lat: 0.05069659588340878,
      lng: -10.769468209507245,
    },
    zoom: 0,
  };

  return (

    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={dados.latitude} lng={dados.longitude} />
      </GoogleMapReact>
    </div>
  );
}

export default MapaEstacaoEspacial;