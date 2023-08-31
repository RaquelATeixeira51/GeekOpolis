import "./index.css";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/img/GeekOpolisLogo.png";
import { useEffect, useState } from "react";

export default function Header() {;

  const teste = localStorage.getItem('token');

  const [user, setUser] = useState();
  const [redirect, setRedirect] = React.useState("");

  const deslogar = () => {localStorage.removeItem('token')
  setRedirect('/')
  };

  useEffect(() => { const token = localStorage.getItem('token')
  if (token){fetch(`http://localhost:8080/usuario/informacoes?jwtToken=${token}`, {
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
      console.log(data)
      setUser(data);
    })
    .catch((error) => {
      console.log(error);
    });}
  }, []);
  if (redirect !== "") return <Navigate to={redirect} />;

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
  }else if(user && user.grupo === 'ADMIN'){
    console.log(user.grupo)
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
                <button onClick={deslogar}>deslogar</button>
              </h3>
            </div>
          </div>
        </header>
      </>
    );
  }
  else{
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
                <Link to="/" className="Elementos">
                  Compras
                </Link>
              </h3>
              <h3>
                <button className='deslogar' onClick={deslogar}>deslogar</button>
              </h3>
            </div>
          </div>
        </header>
      </>
    );
  }
}
