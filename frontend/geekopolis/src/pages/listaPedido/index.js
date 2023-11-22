/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
/* import './index.css'; */
import * as React from 'react';
import { useEffect, useState } from 'react';
import Aside from '../../components/aside';
import makeToast from '../../shared/toaster';
import Pagination from '../../components/Pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ListaPedido() {
  const nameRef = React.createRef();
  const [requests, setRequests] = useState([]);
  const [body, setBody] = React.useState({
    nome: '',
    avaliacao: 0,
    descricao: '',
    preco: 0, 
    qtdEstoque: 0, 
    imagesPath: 0,
    categoriaId: 0,
    status: false,
  });
  const [pedidos, setPedidos] = React.useState([]);
  const [cargo, setCargo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  console.log(pedidos)

  const buscaProdutos = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

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
        makeToast('error', 'Erro ao carregar produtos, tente novamente');
        return null;
      })
      .then((data) => {
        const productsOnPage = data.produtos.slice(startIndex, endIndex);
        setRequests(productsOnPage);
        const totalPage = Math.ceil(data.qtdTotal / productsPerPage);
        setTotalPages(totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtrar = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

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
        makeToast('error', 'Erro ao carregar produtos, tente novamente');
        return null;
      })
      .then((data) => {
        const productsOnPage = data.produtos.slice(startIndex, endIndex);
        setRequests(productsOnPage);
        const totalPage = Math.ceil(data.qtdTotal / productsPerPage);
        setTotalPages(totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    buscaProdutos(currentPage);
  }, [currentPage]);

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
        makeToast('error', 'Erro na atualização de status do produto.');
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



  useEffect(() => {
    fetch(`http://localhost:8080/usuario/informacoes?jwtToken=${localStorage.getItem(
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

      makeToast('error', 'Erro ao verificar usuario.');
      return null;
    })
    .then((data) => {
      setCargo(data.grupo);
    })
    .catch((err) => {
      console.error(err);
      window.location.href = '/listaUsuarios';
    });

  }, [])

  let disabled;

  if(cargo === "ESTOQUISTA") {
    disabled = true;
  } else {
    disabled = false;
  }

  React.useEffect(() => {
    fetch(`http://localhost:8080/pedido/retornaPedidos/token/${localStorage.getItem('token-cliente')}`, {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Nâo há pedidos');
        return null;
      })
      .then((data) => {
        if (data) {
          debugger;
          setPedidos(data);
        } else {
          makeToast('error', 'Nâo há pedidos');
        }
      })
      .catch((err) => {
        makeToast('error', err);
      });
  }, [])


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
            <button type="button" className="botao-Filtro" onClick={() => filtrar(currentPage)}>
              <p>Filtrar</p>
            </button>
            <div className="adicionar-Produto" />
            <button
              type="button"
              className="botao-adicionar"
              disabled={cargo === "ESTOQUISTA"}
              onClick={() => {
                if (cargo !== "ESTOQUISTA") {
                  window.location.href = '/cadastroProduto';
                }
              }}
            >
              <h2>Adicionar produto</h2>
              <p>+</p>
            </button>
          </div>
          <tbody className="user-list">
            <table className="request-table">
              <thead className="lista">
                <th>data</th>
                <th>numero</th>
                <th>valor</th>
                <th>Status</th>
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
                      disabled={disabled}
                      type="button"
                      className={`status ${client.status ? 'ativo' : 'inativo'} ${cargo !== 'ESTOQUISTA' ? 'able' : 'disabled'}`}
                      onClick={() => {
                        if(cargo !== 'ESTOQUISTA'){
                          atualizaAcesso(client.id);
                        }
                      }
                    }
                    >
                      {client.status ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                 
                </tr>
              ))}
          </tbody>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
    </>
  );
}

export default ListaPedido;
