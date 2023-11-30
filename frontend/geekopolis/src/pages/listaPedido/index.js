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
import './index.css';
import Pagination from '../../components/Pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

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

  console.log(pedidos);

  React.useEffect(() => {
    fetch(`http://localhost:8080/pedido/retornaPedidos`, {
      method: 'GET',
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
          setPedidos(data);
        } else {
          makeToast('error', 'Nâo há pedidos');
        }
      })
      .catch((err) => {
        makeToast('error', err);
      });
  }, []);

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusUpdate = (orderId, newStatus) => {
    fetch(
      `http://localhost:8080/pedido/atualizaStatusPedido/id/${orderId}?status=${newStatus}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
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

  console.log(pedidos.status);
  return (
    <>
      <Aside />
      <div className="container">
        <div className="fundo">
          <tbody className="user-list">
            <table className="request-table">
              <thead className="lista">
                <th>Data do pedido</th>
                <th>ID</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </thead>
            </table>
            {pedidos &&
              pedidos.map((pedido) => (
                <tr className="coluns">
                  <td className="user-data">{pedido.dataDoPedido}</td>
                  <td className="user-data">{pedido.pedidoCode}</td>
                  <td className="user-data">R$ {pedido.total.toFixed(2)}</td>
                  <td className="user-data" id="status-pedidos">
                    <select
                      className="pedidos-input"
                      onChange={(e) =>
                        handleStatusUpdate(pedido.id, e.target.value)
                      }
                    >
                      <option
                        value="0"
                        selected={pedido.status === 'AGUARDANDOPAGAMENTO'}
                      >
                        Aguardando Pagamento
                      </option>
                      <option
                        value="1"
                        selected={pedido.status === 'PAGAMENTOREJEITADO'}
                      >
                        Pagamento Rejeitado
                      </option>
                      <option
                        value="2"
                        selected={pedido.status === 'PAGAMENTOCOMSUCESSO'}
                      >
                        Pagamento com Sucesso
                      </option>
                      <option
                        value="3"
                        selected={pedido.status === 'AGUARDANDORETIRADA'}
                      >
                        Aguardando Retirada
                      </option>
                      <option
                        value="4"
                        selected={pedido.status === 'EMTRANSITO'}
                      >
                        Em Trânsito
                      </option>
                      <option value="5" selected={pedido.status === 'ENTREGUE'}>
                        Entregue
                      </option>
                    </select>
                  </td>
                  <td className="user-data">
                    <Link
                      className="orders-list-details"
                      to={`/pedido/${pedido.id}`}
                    >
                      Detalhes
                    </Link>
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
