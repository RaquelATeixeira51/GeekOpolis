/* eslint-disable import/extensions */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
import './index.css';
import Carrinho from '../../assets/img/produtos/carrinho.png';
import avaliacao from '../../assets/img/produtos/avaliacao.png'
import Pix from '../../assets/img/produtos/pix.svg'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Aside from '../../components/aside';
import LogoutIcon from '../../assets/img/icons/edit-icon.png';
import makeToast from '../../shared/toaster';
import Pagination from '../../components/Pagination';

function ListaProdutos() {
  const nameRef = React.createRef();
  const [requests, setRequests] = useState([]);
  const [produto, setUsuario] = useState({});
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
      `http://localhost:8080/produto/buscaProdutos?token=${localStorage.getItem(
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
        makeToast('error', 'Erro ao carregar, tente novamente');
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
      `http://localhost:8080/produto/buscaProdutos?nomeFiltro=${
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
        makeToast('error', 'Erro ao carregar, tente novamente');
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
      `http://localhost:8080/produto/atualizaProduto/${id}?token=${localStorage.getItem(
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

  const buscaProduto = (id) => {
    fetch(
      `http://localhost:8080/produto/buscaProdutos/${id}?token=${localStorage.getItem(
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
        makeToast('error', 'Erro ao carregar, tente novamente');
        return null;
      })
      .then((data) => {
        setUsuario(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizaProduto = (id) => {
    fetch(
      `http://localhost:8080/produto/atualizaProduto/${id}?token=${localStorage.getItem(
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
      setBody(produto);
    }
  }, [isModalOpen, produto]);

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
              placeholder="Pesquisar produto"
              className="inserir"
            />
            <button type="button" className="botao-Filtro" onClick={filtrar}>
              <p>Filtrar</p>
            </button>
            <div className="adicionar-Produto" />
            <button
              type="button"
              className="botao-adicionar"
              onClick={() => {
                window.location.href = '/cadastroProduto';
              }}
            >
              <h2>Adicionar produto</h2>
              <p>+</p>
            </button>
          </div>
          <tbody className="user-list">
            <table className="request-table">
              <thead className="lista">
                <th>Id</th>
                <th>Produto</th>
                <th>Valor</th>
                <th>Quatidade em estoque</th>
                <th>Status</th>
                <th>Editar</th>
              </thead>
            </table>
            {requests &&
              requests.map((client) => (
                <tr className="coluns">
                  <td className="user-data">{client.id}</td>
                  <td className="user-data">{client.Produto}</td>
                  <td className="user-data">{client.valor}</td>
                  <td className="user-data">{client.quantidade}</td>
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
                      buscaProduto(client.id);
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
          <p>Valor</p>
          <input
            type="valor"
            name="valor"
            ref={body.valor}
            className="rounded-input"
            onChange={handleBody}
          />
        </div>
        <div className="input-container">
          <p>Quantidade</p>
          <input
            type="quantidade"
            id="quantidade"
            ref={body.quantidade}
            className="rounded-input"
          />
        </div>
        
        <div className="modal-botoes">
          <button
            type="button"
            className="botao-Filtro"
            onClick={() => atualizaProduto(produto.id)}
          >
            <p>Editar</p>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ListaProdutos;
