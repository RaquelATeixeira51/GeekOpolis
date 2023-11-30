/* eslint-disable no-debugger */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import makeToast from '../../shared/toaster';
import './index.css';
import Aside from '../../components/aside-client';
import Header from '../../components/Header';

export default function Detalhe() {
  const { id } = useParams();

  const [detalhePedido, setDetalhePedido] = useState({
    produtos: [],
    valorFrete: 0,
    total: 0,
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
    metodoDePagamento: '',
  });

  useEffect(() => {
    fetch(`http://localhost:8080/pedido/retornaPedido/id/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar pedido, tente novamente');
        return null;
      })
      .then((data) => {
        setDetalhePedido(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Aside />
      <div className="detelhe-container">
        <h1>Detalhes do Pedido</h1>
        <p>Endereço de Entrega:</p>
        <div className="produtos-lista">
          <div className="produto-card">
            <div className="produto-info">
              <p>{detalhePedido.endereco.logradouro}</p>
              <p>{detalhePedido.endereco.numero}</p>
              <p>{detalhePedido.endereco.bairro}</p>
              <p>{detalhePedido.endereco.cidade}</p>
              <p>{detalhePedido.endereco.uf}</p>
              <p>{detalhePedido.endereco.cep}</p>
            </div>
          </div>
        </div>
        <p>Método de Pagamento: {detalhePedido.metodoDePagamento}</p>

        <div className="produtos-lista">
          {detalhePedido.produtos.map((produto, index) => (
            <div key={index} className="produto-card">
              <img src={produto.produto.img} alt={produto.produto.nome} />
              <div className="produto-info">
                <h3>{produto.produto.nome}</h3>
                <p>Quantidade: {produto.quantidade}</p>
                <p>Preço: R$ {produto.produto.preco}</p>
              </div>
            </div>
          ))}
        </div>

        <p>Valor do Frete: R$ {detalhePedido.valorFrete.toFixed(2)}</p>
        <p>Valor Total: R$ {detalhePedido.total.toFixed(2)}</p>
      </div>
    </>
  );
}
