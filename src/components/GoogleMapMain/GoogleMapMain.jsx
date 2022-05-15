import {GoogleMap} from "@react-google-maps/api";
import {useContext} from "react";
import {IndexContext} from "../pages/Index";

export default function GoogleMapMain({children}) {
  const {position, isLoaded} = useContext(IndexContext);


  var mapOptions = {
    streetViewControl: false,
    disableDefaultUI: true,
    minZoom:3
    // mapTypeId: "satellite",
    // tilt: 25,
  };

  return (
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
      zoom={3}
    >
      {children}
    </GoogleMap>
  );
}