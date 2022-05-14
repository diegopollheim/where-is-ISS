import {useContext} from "react";
import {IndexContext} from "../pages/Index";
import style from "./style.css";

function MenuSuperior() {
  const {showVoltas, setShowVoltas, atualizar, setAtualizar} = useContext(IndexContext);

  return (
    <>
      <div className="menu">
        <div className="container">
          <div className="bloco-esq">
            <div className="info-1">
              <div className="form-check">
                <input value={atualizar} type="checkbox" onChange={() => setAtualizar(!atualizar)} />
                <p>Parar atualizações</p>
              </div>
              <div className="form-check">
                <input value={showVoltas} type="checkbox" onChange={() => setShowVoltas(!showVoltas)} />
                <p>Mostar voltas completas</p>
              </div>
            </div>
            <div className="info-2">
              <div className="form-check">{/* ELIMINAR SE NAO FOR UTILIZAR */}</div>
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
