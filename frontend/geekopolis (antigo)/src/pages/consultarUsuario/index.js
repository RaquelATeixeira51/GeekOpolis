import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function RequestsList() {
  const nameRef = React.createRef();
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

  const filtrar = () => {
    setRequests([]);
    fetch(`http://localhost:8080/usuario/buscaUsuarios?nomeFiltro=${nameRef.current.value}`, {
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
  };

  return (
    <div>
      <Header></Header>
      <div className="fundo">
        <div className="filter">
          <div className="text">
            <input
              type="text"
              name="nome"
              id="nome"
              ref={nameRef}
              placeholder="Digite o nome do usuário"
              className="inserir"
            />
            <button type="submit" onClick={filtrar}>
              Filtrar
            </button>
          </div>

          <table className="requests-table">
            <thead>
              <th>Nome</th>
              <th>e-mail</th>
              <th>CPF</th>
              <th>Grupo</th>
              <th>Status</th>
              <th>Editar</th>
            </thead>
            <tbody>
              {requests.map((client) => (
                <tr className="coluns">
                  <td className="user-data">{client.nome}</td>
                  <td className="user-data">{client.email}</td>
                  <td className="user-data">{client.cpf}</td>
                  <td className="user-data">{client.grupo}</td>
                  <td className="user-data">
                    <button
                      className={
                        client.ativo ? "inactive-button" : "active-button"
                      }
                      onClick={
                        client.ativo
                          ? () => handleInactive(client.id)
                          : () => handleActive(client.id)
                      }
                    >
                      {client.ativo ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                  <td className="user-edit">
                    <Link to={`/editar-usuario/${client.id}`} className="edit-button">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}