import style from './style.css'

export default function InfoIss(dados) {


  const lat = dados.latitude?.toFixed(2).replace(".",",")
  const lon = dados.longitude?.toFixed(2).replace(".",",")
  
  const alt = dados?.altitude?.toString().substring(0,6).replace(".",",");
  const vel = dados?.velocity?.toString().substring(0,5)




  return (
    <>
      <div className="card">
        <div className="content">
          <p>Latitude: {lat}</p>
          <p>Longitude: {lon}</p>
          <p>Altitude: {alt} Km</p>
          <p>Velocidade: {vel} km/h</p>
        </div>
      </div>
    </>
  );
}
