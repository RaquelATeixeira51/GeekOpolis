import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/GeekOpolisLogo.png";
import { useEffect, useState } from "react";

export default function Header() {;

  const teste = localStorage.getItem

  const [requests, setRequests] = useState([]);
  

  useEffect(() => {
    fetch(`http://localhost:8080/usuario/buscaUsuarios`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to get requests");
        }
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInactive = (id) => {
    fetch(`http://localhost:8080/usuario/atualizaAcessoUsuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((result) => (window.location.href = "/usuarios"))
      .catch((err) => {
        console.log(err);
        window.location.href = "/usuarios";
      });
  };
  const handleActive = (id) => {
    fetch(`http://localhost:8080/usuario/atualizaAcessoUsuario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((result) => (window.location.href = "/usuarios"))
      .catch((err) => {
        console.log(err);
        window.location.href = "/usuarios";
      });
  };
  
  if (teste == null){
    console.log("deslogado")
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
                <Link to="/login" className="Elementos">
                  Login
                </Link>
              </h3>
              <h3>
                <Link to="/cadastro-usuario" className="Elementos">
                  Cadastro
                </Link>
              </h3>
            </div>
          </div>
        </header>
      </>
    );
  }else{
    console.log(requests.map)
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
                <Link to="/usuarios" className="Elementos">
                  Listar Usuario
                </Link>
              </h3>
              <h3>
                <Link to="/cadastro-usuario" className="Elementos">
                  Deslogar
                </Link>
              </h3>
            </div>
          </div>
        </header>
      </>
    );
  }
}
