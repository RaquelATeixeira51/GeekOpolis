import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function RequestsList() {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = useState([]);
    // const json = '{"nome":"Rael","email":"rsouza@mia.com","senha":"fakmakmfpa","cpf":38866183822,"grupo":"ADM","ativo":"Ativo"}';
    const json = [
        {
          nome: "Rael",
          email: "rsouza@mia.com",
          senha: "fakmakmfpa",
          cpf: "38866183822",
          grupo: "ADM",
          ativo: "Ativo",
        },
        {
          nome: "Marcos",
          email: "msilva@gmail.com",
          senha: "6jLaKibm1s",
          cpf: "95339000054",
          grupo: "ADM",
          ativo: "Ativo",
        },
      ];

    const handleRowClick = (request) => {
        setSelectedRequest(request);
    };
    const filtrar = () => {

    };
    return (

        <div>
            <Header>

            </Header>
            <div className='fundo'>

                <div className="filter">
                    <div className="text">
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Digite o nome do usuário"
                        />
                        <button type="submit" onClick={() => filtrar()}>
                            Filtrar
                        </button>
                    </div>

                    <table className="requests-table">
                        <thead>
                            <th>Nome</th>
                            <th>e-mail</th>
                            <th>Senha</th>
                            <th>CPF</th>
                            <th>Grupo</th>
                            <th>Status</th>
                        </thead>
                        <tbody>
                        {json.map((client) => (
                            <tr>
                                <td>{client.nome}</td>
                                <td>{client.email}</td>
                                <td>{client.senha}</td>
                                <td>{client.cpf}</td>
                                <td>{client.grupo}</td>
                                <td>{client.ativo}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="atualizar" type="submit" onClick={() => filtrar()}>
                        Atualizar
                    </button>
                </div>

            </div>
        </div>


    );
}