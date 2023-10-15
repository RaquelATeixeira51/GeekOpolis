/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-debugger */
import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Aside from '../../components/aside';
import './index.css';
import LogoutIcon from '../../assets/img/icons/edit-icon.png';
import makeToast from '../../shared/toaster';

export default function ListaUsuarios() {
  const passwordRef = React.createRef();
  const passwordConfirmationRef = React.createRef();
  const nameRef = React.createRef();
  const [requests, setRequests] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [body, setBody] = React.useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBody = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8080/usuario/buscaUsuarios?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar usuarios, tente novamente');
        return null;
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filtrar = () => {
    setRequests([]);
    fetch(
      `http://localhost:8080/usuario/buscaUsuarios?nomeFiltro=${
        nameRef.current.value
      }&token=${localStorage.getItem('token')}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao filtrar usuarios, tente novamente');
        return null;
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizaAcesso = (id) => {
    fetch(
      `http://localhost:8080/usuario/atualizaAcessoUsuario/${id}?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        makeToast('error', 'Erro na atualização de acesso do usuário.');
        return null;
      })
      .then(() => {
        window.location.href = '/listaUsuarios';
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaUsuarios';
      });
  };

  const buscaUsuario = (id) => {
    fetch(
      `http://localhost:8080/usuario/buscaUsuario/${id}?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar usuario, tente novamente');
        return null;
      })
      .then((data) => {
        setUsuario(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizaUsuario = (id) => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      makeToast('error', 'As senhas não coincidem');
      return;
    }
    fetch(
      `http://localhost:8080/usuario/atualizaUsuario/${id}?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        if (response.status === 401) {
          makeToast('error', 'Não é possível atualizar o próprio usuário');
          return null;
        }

        makeToast('error', 'Erro na atualização do usuário.');
        return null;
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = '/listaUsuarios';
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaUsuarios';
      });
  };

  useEffect(() => {
    if (isModalOpen) {
      setBody(usuario);
    }
  }, [isModalOpen, usuario]);

  return (
    <>
      <Aside />
      <div className="container">
        <div className="fundo">
          <div className="filtro">
            <input
              type="text"
              name="nome"
              id="nome"
              ref={nameRef}
              placeholder="Pesquisar por nome"
              className="inserir"
            />
            <button type="button" className="botao-Filtro" onClick={filtrar}>
              <p>Filtrar</p>
            </button>
            <div className="adicionar-Usuario" />
            <button
              type="button"
              className="botao-adicionar"
              onClick={() => {
                window.location.href = '/cadastro';
              }}
            >
              <h2>Adicionar usuário</h2>
              <p>+</p>
            </button>
          </div>
          <tbody className="user-list">
            <table className="request-table">
              <thead className="lista">
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Grupo</th>
                <th>Status</th>
                <th>Editar</th>
              </thead>
            </table>
            {requests &&
              requests.map((client) => (
                <tr className="coluns">
                  <td className="user-data">{client.nome}</td>
                  <td className="user-data">{client.email}</td>
                  <td className="user-data">
                    {client.cpf.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      '$1.$2.$3-$4'
                    )}
                  </td>
                  <td className="user-data">{client.grupo}</td>
                  <td className="user-data">
                    <button
                      type="button"
                      className={`status ${client.ativo ? 'ativo' : 'inativo'}`}
                      onClick={() => atualizaAcesso(client.id)}
                    >
                      {client.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td
                    className="user-edit"
                    onClick={() => {
                      buscaUsuario(client.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <img
                      src={LogoutIcon}
                      alt="GeekOpolis Logout Icon"
                      id="edit"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="input-container">
          <p>Nome</p>
          <input
            type="text"
            name="nome"
            value={body.nome}
            className="rounded-input"
            onChange={handleBody}
          />
        </div>
        <div className="input-container">
          <p>Senha</p>
          <input
            type="password"
            name="senha"
            ref={passwordRef}
            className="rounded-input"
            onChange={handleBody}
          />
        </div>
        <div className="input-container">
          <p>Cofirmar Senha</p>
          <input
            type="password"
            id="password"
            ref={passwordConfirmationRef}
            className="rounded-input"
          />
        </div>
        <div className="input-container">
          <p>CPF</p>
          <input
            type="text"
            name="cpf"
            value={body.cpf}
            className="rounded-input"
            onChange={handleBody}
          />
        </div>
        <div className="input-container">
          <p>Grupo</p>
          <select
            name="grupo"
            value={body.grupo}
            className="rounded-select"
            onChange={handleBody}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="ESTOQUISTA">ESTOQUISTA</option>
          </select>
        </div>
        <div className="modal-botoes">
          <button
            type="button"
            className="botao-Filtro"
            onClick={() => atualizaUsuario(usuario.id)}
          >
            <p>Editar</p>
          </button>
        </div>
      </Modal>
    </>
  );
}
