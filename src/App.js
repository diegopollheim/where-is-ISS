
import './App.css';
import MapaEstacaoEspacial from './components/MapaEstacaoEspacial';
import MenuSuperior from './components/MenuSuperior/Index';


function App(props) {

  console.log(props)
  
  return (
    <div className="App">
      <MenuSuperior />
      <MapaEstacaoEspacial />
    </div>
  );
}

export default App;
