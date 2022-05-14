import {useContext} from "react";
import style from "./style.css";
import {Circle, Marker, Polyline} from "@react-google-maps/api";
import MenuSuperior from "../../MenuSuperior/Index";
import Loading from "../../Loading";
import InfoIss from "../../InfoIss";
import {IndexContext} from "../../pages/Index";
import FrameVideo from "../../FrameVideo";
import GoogleMapMain from "../../GoogleMapMain/GoogleMapMain";
import VoltasCompletas from "../../VoltasCompletas/VoltasCompletas";

function ViewPaginaIndex() {
  const {position, posSol, rastros, isLoaded} =
    useContext(IndexContext);

  const iconIss = "https://github.com/diegopollheim/where-is-ISS/blob/master/public/iss.png?raw=true";

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <MenuSuperior />
      <div className="container-map">
        <GoogleMapMain>
          <Marker name="sol" position={posSol} icon="http://openweathermap.org/img/wn/01d@2x.png" />
          <Marker name="iss" position={position} icon={iconIss} />
          <Polyline  path={rastros}
          options={{
            strokeColor: "#d80000",
            strokeWeight: 2,
          }}/>
          <VoltasCompletas />
          <Circle
            center={position}
            radius={2000000}
            options={{
              strokeColor: "#949494",
              strokeWeight: 1,
              fillColor: "#fff4aa",
            }}
          />
          <InfoIss name="info-iss" />
        </GoogleMapMain>
        <FrameVideo />
      </div>
    </>
  );
}

export default ViewPaginaIndex;
