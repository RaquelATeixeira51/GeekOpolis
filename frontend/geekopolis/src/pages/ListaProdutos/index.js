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
import VizuIcon from '../../assets/img/icons/Visualizar.png';

function ListaProdutos() {
  const nameRef = React.createRef();
  const [requests, setRequests] = useState([]);
  const [produto, setUsuario] = useState({});
  const [body, setBody] = React.useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleBody = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  useEffect(() => {
    fetch(
      `http://localhost:8080/produto/buscaProdutos/?nomeFiltro=${
        nameRef.current.value
      }`,
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
        setRequests(data.produtos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filtrar = () => {
    setRequests([]);
    fetch(
      `http://localhost:8080/produto/buscaProdutos/?nomeFiltro=${
        nameRef.current.value
      }`,
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
        setRequests(data.produtos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizaAcesso = (id) => {
    fetch(
      `http://localhost:8080/produto/atualizaStatusProduto/${id}?token=${localStorage.getItem(
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
        window.location.href = '/listaProdutos';
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaProdutos';
      });
  };

  const buscaProduto = (id) => {
    fetch(
      `http://localhost:8080/produto/buscaProduto/${id}`,
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

  useEffect(() => {
    if (isModalOpen2) {
      setBody(produto);
    }
  }, [isModalOpen2, produto]);

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
                <th>Nome</th>
                <th>Valor</th>
                <th>Quatidade em estoque</th>
                <th>Status</th>
                <th>Editar</th>
                <th>Visualizar</th>
              </thead>
            </table>
            {requests &&
              requests.map((client) => (
                <tr className="coluns">
                  <td className="user-data">{client.nome}</td>
                  <td className="user-data">{client.preco}</td>
                  <td className="user-data">{client.qtdEstoque}</td>
                  <td className="user-data">
                  <button
                      type="button"
                      className={`status ${client.status ? 'ativo' : 'inativo'}`}
                      onClick={() => atualizaAcesso(client.id)}
                    >
                      {client.status ? 'Ativo' : 'Inativo'}
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
                  <td
                  onClick={() => {
                    buscaProduto(client.id);
                    setIsModalOpen2(true);
                  }}
                  >
                    <img
                      src={VizuIcon}
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
      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal2}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="input-container">
        <div className="box">
      <div className="MODAL">
        <div className="overlap">
          <img className="pix" alt="Pix" src={Pix} />
          <p className="text-wrapper">3% OFF à vista no Pix</p>
          <p className="div">6x de R$ 31,65 sem juros</p>
          <div className="text-wrapper-2">R$ 120,00</div>
          <div className="text-wrapper-3">(104 Avaliações)</div>
          <div className="overlap-group">
            <img className="img-super-man" alt="Img super man" src="" />
          </div>
          <div className="funko-pop-super-man">Funko Pop - Super Man</div>
          <div className="text-wrapper-4">X</div>
          <div className="stars">
            <img className="star" alt="Star" src={avaliacao} />
          </div>
          <div className="adicionar-ao">
            <div className="overlap-2">
              <div className="rectangle" />
              <div className="adicionar-ao-2">Adicionar ao Carrinho</div>
              <img className="carrinho-carrinho" alt="Carrinho carrinho" src={Carrinho} />
              <div className="rectangle-2" />
            </div>
          </div>
          <div className="overlap-3">
            <div className="CEP">
              <div className="rectangle-3" />
              <div className="group">
                <div className="overlap-group-3">
                  <div className="rectangle-4" />
                  <div className="text-wrapper-5">Calcular</div>
                </div>
              </div>
            </div>
            <p className="frete-e-prazo-de">
              <span className="span">
                Frete e prazo de entrega
                <br />
                <br />
                CEP
                <br />
              </span>
              <span className="span">
                <br />
                <br />
                <br />
                FRETE GRÁTIS EM TODO BRASIL
                <br />
                Acima de R$ 189,90
              </span>
            </p><p className="DESCRI-o-DO-PRODUTO">
            DESCRIÇÃO DO PRODUTO
            <br />
            <br />
            Funko Pop Super Man
            <br />
            Acompanha base de acrílico
          </p>
          </div>
          </div>
          </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ListaProdutos;
