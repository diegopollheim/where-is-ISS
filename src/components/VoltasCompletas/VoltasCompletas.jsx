import {useContext} from "react";
import {IndexContext} from "../pages/Index";
import volta01 from ".././Data/voltas/volta01.json";
import volta02 from ".././Data/voltas/volta02.json";
import volta03 from ".././Data/voltas/volta03.json";
import volta04 from ".././Data/voltas/volta04.json";
import volta05 from ".././Data/voltas/volta05.json";
import {Polyline} from "@react-google-maps/api";

export default function VoltasCompletas() {
  const {showVoltas} = useContext(IndexContext);

  if (showVoltas) {
    return (
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
    );
  }
  return null;
}
