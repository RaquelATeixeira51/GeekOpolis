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

  
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusUpdate = (orderId, newStatus) => {
    fetch(`http://localhost:8080/pedido/atualizaStatusPedido/id/${orderId}?status=${newStatus}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          makeToast('success', 'Status atualizado com sucesso');
        } else {
          makeToast('error', 'Erro ao atualizar o status');
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        makeToast('error', 'Erro ao atualizar o status');
      });
  };
  

  console.log(pedidos.status)
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
                <th>data do pedido</th>
                <th>ID</th>
                <th>valor</th>
                <th>Status</th>
              </thead>
            </table>
            {pedidos &&
              pedidos.map((pedido) => (
                <tr className="coluns">
                  <td className="user-data">{pedido.dataDoPedido}</td>
                  <td className="user-data">{pedido.id}</td>
                  <td className="user-data">R$ {pedido.total.toFixed(2)}</td>
                  <td className="user-data" id='status-pedidos'>
                  <select
                      onChange={(e) => handleStatusUpdate(pedido.id, e.target.value)}
                    >
                      <option value="AGUARDANDOPAGAMENTO">Aguardando Pagamento</option>
                      <option value="PAGAMENTOREJEITADO">Pagamento Rejeitado</option>
                      <option value="PAGAMENTOCOMSUCESSO">Pagamento com Sucesso</option>
                      <option value="AGUARDANDORETIRADA">Aguardando Retirada</option>
                      <option value="EMTRANSITO">Em Trânsito</option>
                      <option value="ENTREGUE">Entregue</option>
                    </select>

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
