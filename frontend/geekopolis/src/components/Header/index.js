import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/GeekOpolisLogo.png";

export default function Header() {
  return (
    <>
      <header>
        <div className="header">
          <img alt="GeekOpolis Logo" src={logo} />
          <div className="opcoes">
            <h3>
              <Link to="/" className="Elementos">
                Inicio
              </Link>
            </h3>
            <h3>
              <Link to="/cadastro-usuario" className="Elementos">
                Cadastro
              </Link>
            </h3>
            <h3>
              <Link to="/cadastrar-admin" className="Elementos">
                CadastroAdmin
              </Link>
            </h3>
          </div>
        </div>
      </header>
    </>
  );
}
