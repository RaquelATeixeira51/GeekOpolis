/* eslint-disable no-debugger */
import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import makeToast from '../../shared/toaster';
import Aside from '../../components/aside-client';

export default function Pedidos() {
  const [pedidos, setPedidos] = React.useState([]);

  React.useEffect(() => {
    fetch(
      `http://localhost:8080/pedido/retornaPedidos/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'GET',
      }
    )
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

  return (
    <>
      <Aside />
      <Header />
      <div className="pedidosCliente-tudo">
        <div className="pedidos-quadrado-centralizado">
          <h2>Pedidos</h2>
          <div className="pedido-list">
            {pedidos.map((pedido) => (
              <div key={pedido.codigo} className="pedido-card">
                <div>
                  <strong>Código:</strong> {pedido.pedidoCode}
                </div>
                <div>
                  <strong>Data:</strong> {pedido.dataDoPedido}
                </div>
                <div>
                  <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                </div>
                <div>
                  <strong>Status:</strong> {pedido.status}
                </div>
                <Link to={`/pedido/${pedido.id}`}>Detalhes</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
