import style from "./style.css";

function MenuSuperior(dados) {

const lat = dados.latitude
const lon = dados.longitude
const alt = dados?.altitude?.toString().substring(0,6).replace(".",",");
const vel = dados?.velocity?.toString().substring(0,5)


  return (
    <>
      <div className="menu">
        <div className="container">
          <div className="bloco-esq">
            <div className="info-1">
              <p>Lat: {lat}</p>
              <p>Lon: {lon}</p>
            </div>
            <div className="info-2">
              <p>Alt: {alt} km</p>
              <p>Vel: {vel} Km/h</p>
            </div>
          </div>
          <div className="bloco-dir">
            <div className="dia-noite"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuSuperior;
