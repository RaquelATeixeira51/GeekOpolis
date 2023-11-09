/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import cartUtils from '../../methods';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import './index.css';
import EditarEndereco from '../editarEndereco';


export default function Carrinho() {
  const checkoutURL = `http://localhost:8080/pedido/criaPedido/token/${localStorage.getItem(
    'token-cliente'
  )}`;
  const [carrinho, setCarrinho] = React.useState({});
  const [endereco, setEndereco] = React.useState({});
  const [total, setTotal] = React.useState(0.0);
  
  const [body, setBody] = React.useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const produtos = {
    produto: {
      nome: 'short do naruto',
      preco: 67.8,
      img: 'teste.com',
      id: 1,
    },
    quantidade: 5,
  };
  const frete = {
    tipo: 0,
    valor: 12.6,
  };

  const addProduct = (product) => {
    cartUtils.adicionaProdutoAoCarrinho({
      produto: product.produto,
      quantidade: 1,
    });
    window.location.reload();
  };
  const removeProduct = (product) => {
    cartUtils.removerProdutoDoCarrinho({
      produto: product.produto,
      quantidade: 1,
    });
    window.location.reload();
  };
  const deleteProduct = (product) => {
    cartUtils.deletarProdutoDoCarrinho({
      produto: product.produto,
      quantidade: 1,
    });
    window.location.reload();
  };

  const checkout = () => {
    cartUtils.adicionarEnderecoId(1);
    cartUtils.adicionarMetodoDePagamento(0);
    cartUtils.calcularEAtualizarTotal();

    cartUtils
      .checkout(checkoutURL)
      .then((response) => {
        cartUtils.initializeCart();
        makeToast('success', response);
      })
      .catch((error) => {
        cartUtils.initializeCart();
        makeToast('error', error);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      setBody(endereco);
    }
  }, [isModalOpen, endereco]);


  React.useEffect(() => {
    let cart = localStorage.getItem('carrinho');

    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = cartUtils.initializeCart();
      window.location.reload();
      return;
    }

    cartUtils.calcularEAtualizarTotal();
    setCarrinho(cart);
    setTotal(cart.total.toLocaleString('pt-BR', { currency: 'BRL' }));

    fetch(
      `http://localhost:8080/endereco/buscaEnderecosPorCliente/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0)
          setEndereco(data.find((e) => e.principal === true));
      })
      .catch(() => {
        makeToast('error', 'Erro ao buscar endereços');
      });
  }, []);

  return (
    <>
      <Header />
      <div className="cart-container-conf">
        <div className='cart-produto'>
        <div className="cart-items">
              {carrinho?.produtos?.map((product) => (
                <div className="cart-item">
                  <Link
                    to={`/produto/${product.produto.id}`}
                    className="cart-item"
                  >
                    <div className="cart-item-image">
                      <img
                        src={produtos.produto.img}
                        alt={produtos.produto.nome}
                      />
                    </div>
                    <div className="cart-item-info">
                      <h2 className="cart-item-name">{product.produto.nome}</h2>
                      <div className="cart-item-quantity">
                        <h3>
                          Preço/Und: R${' '}
                          {Number(product.produto.preco).toLocaleString(
                            'pt-BR',
                            { currency: 'BRL' }
                          )}
                        </h3>
                        <h3>
                          Subtotal: R${' '}
                          {(
                            Number(product.quantidade) *
                            Number(product.produto.preco)
                          ).toLocaleString('pt-BR', { currency: 'BRL' })}
                        </h3>
                      </div>
                    </div>
                  </Link>
                  <div className="cart-item-actions">
                    <div className="cart-item-actions-row">
                      <h3>Quantidade:</h3>
                      <button
                        type="button"
                        onClick={() => removeProduct(product)}
                      >
                        -
                      </button>
                      <h3>{product.quantidade}</h3>
                      <button type="button" onClick={() => addProduct(product)}>
                        +
                      </button>
                    </div>
                    <div className="cart-item-actions-row">
                      <button
                        type="button"
                        className="cart-item-actions-delete"
                        onClick={() => deleteProduct(product)}
                      >
                        Remover do carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
        </div>
        <div className='cart-conteiner-meio'>
            <div className='cart-cima'>
                <div className="cart-address">
                <h2>Endereço de entrega:</h2>
                <div className="cart-address-info">
                    <h3>
                    {endereco?.logradouro}, {endereco?.numero}
                    </h3>
                    <h3>
                    {endereco?.bairro}, {endereco?.cidade}
                    </h3>
                    <h3>{endereco?.cep}</h3>
                    <div className="cart-address-change">
                      <div>
                        <button className='modal-botoes' onClick={isModalOpen}>Adicionar novo endereço</button>
                        <Modal open={openModal} 
                        onClose={closeModal}
                        className="modal-content"
                        overlayClassName="modal-overlay">
                            <Router>
                              <Routes>
                                <Route path="/editarEndereco" component={EditarEndereco} />
                                <Route>
                                <button onClick={isModalOpen}>
                                <Link to="/editarEndereco">Adicionar novo endereço</Link>
                                </button>
                                </Route>
                              </Routes>
                            </Router>
                        </Modal>
                      </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='cart-baixo'>
              <select name="Options" id="Pagamento">
                <option value="Cred">Cartão de Crédito</option>
                <option value="Bole">Boleto</option>
                <option value="PIX">PIX</option>
              </select>
              
              <div className="cadastrogeral-input">
                <p>Nome Completo</p>
                <input
                  type="text"
                  className="cadastrogrande-input"
                  placeholder="Joel Miller"

                />
              </div>

              <div className="cadastrogeral-input">
                <p>Nº Cartão</p>
                <input
                  type="text"
                  className="cadastro-input"
                  placeholder="**** **** **** ****"

                />
              </div>
              
              <div className='cadastrofinal-input'>
                <div className="cadastrogeral-input">
                  <p>Validade</p>
                  <input
                    type="text"
                    className="cadastropequeno-input"
                    placeholder="**/**"

                  />
                </div>
                <div className="cadastrogeral-input">
                  <p>CV</p>
                  <input
                    type="text"
                    className="cadastropequeno-input"
                    placeholder="***"

                  />
                </div>
              </div>
                 
            </div>
        </div>
        <div className='cart-total-conf'>
            <h2>Total: R$ {total}</h2>
            <button  className="cart-address-buttom" type="button" onClick={checkout}>
                Finalizar
            </button>
        </div>
        </div>
    </>
  );
}