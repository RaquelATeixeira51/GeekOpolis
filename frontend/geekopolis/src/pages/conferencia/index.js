/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import cartUtils from '../../methods';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import './index.css';
import EditarEndereco2 from '../../components/Endereco';

export default function Carrinho() {
  const checkoutURL = `http://localhost:8080/pedido/criaPedido/token/${localStorage.getItem(
    'token-cliente'
  )}`;
  const [carrinho, setCarrinho] = React.useState({});
  const [endereco, setEndereco] = React.useState({});
  const [total, setTotal] = React.useState(0.0);
  const [enderecoId, setEnderecoId] = React.useState(0);
  const [frete, setFrete] = React.useState(0.0);
  const [body, setBody] = React.useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [tipoPag, setTipoPag] = useState(1);

  const [creditCard, setCreditCard] = useState({
    nomeCompleto: '',
    numCartao: '',
    validade: '',
    cvv: '',
  });

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const tokenCliente = localStorage.getItem('token-cliente');

  //   if (!tokenCliente) {
  //     navigate('/loginCliente');
  //   } else {
  //     (!isValid)
  //       localStorage.removeItem('token');
  //       setTokenValid(false);
  //       navigate('/');
  //     console.log('Token válido. Continue com o checkout.');
  //   }
  // }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreditCard({
      ...creditCard,
      [name]: value,
    });
  };

  const isFormValid = () =>
    creditCard.nomeCompleto.trim() !== '' &&
    creditCard.numCartao.trim() !== '' &&
    creditCard.validade.trim() !== '' &&
    creditCard.cvv.trim() !== '';

  function ProtectedRouteCliente({ element }) {
    const navigate = useNavigate();
    const [tokenValid, setTokenValid] = useState(true);

    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token-cliente');
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/token/valid?token=${localStorage.getItem(
            'token-cliente'
          )}`
        );
        const isValid = await response.json();

        if (!isValid) {
          localStorage.removeItem('token-cliente');
          setTokenValid(false);
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao verificar a validade do token', error);
      }
    };
  }
  const produtos = {
    produto: {
      nome: 'short do naruto',
      preco: 67.8,
      img: 'teste.com',
      id: 1,
    },
    quantidade: 5,
  };

  const handleSelectChange = (e) => {
    setTipoPag(e.target.value); // Atualiza o valor selecionado quando a opção é alterada
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
    if (tipoPag === 1 && !isFormValid()) {
      makeToast('error', 'Preencha todos os campos do cartão de crédito.');
      return;
    }
    cartUtils.adicionarEnderecoId(enderecoId);
    cartUtils.adicionarMetodoDePagamento(tipoPag);
    cartUtils.calcularEAtualizarTotal();

    const cart = JSON.parse(localStorage.getItem('carrinho'));

    fetch(
      `http://localhost:8080/pedido/criaPedido/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      }
    )
      .then((response) => {
        if (response.ok) {
          cartUtils.initializeCart();
          setIsModalOpen2(true);
          setTimeout(() => {
            window.location.href = '/pedidos';
          }, 1000);
        }
        makeToast('error', error);
        return null;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = '/carrinho';
  };

  const closeModal2 = () => {
    setIsModalOpen(false);
  };

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
    setEnderecoId(cart.enderecoId);
    setTotal(cart.total.toLocaleString('pt-BR', { currency: 'BRL' }));
    setFrete(
      cart.frete.valor
        ? cart.frete.valor.toLocaleString('pt-BR', { currency: 'BRL' })
        : 0
    );

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
        <div className="cart-produto">
          <div className="cart-items conf-items">
            {carrinho?.produtos?.map((product) => (
              <div className="cart-item conf-item">
                <Link
                  to={`/produto/${product.produto.id}`}
                  className="cart-item conf-item-intern"
                >
                  <div className="cart-item-image conf-item-image">
                    <img src={product.produto.img} alt={product.produto.nome} />
                  </div>
                  <div className="cart-item-info">
                    <h2 className="cart-item-name conf-item-name">
                      {product.produto.nome}
                    </h2>
                    <div className="cart-item-quantity conf-item-quantity">
                      <h3>Quantidade: {product.quantidade}</h3>
                      <h3>
                        Preço/Und: R${' '}
                        {Number(product.produto.preco).toLocaleString('pt-BR', {
                          currency: 'BRL',
                        })}
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
                  <div className="cart-item-actions-row conf-item-actions-row">
                    <button
                      title="Remover uma unidade do produto"
                      type="button"
                      onClick={() => removeProduct(product)}
                    >
                      -
                    </button>
                    <button
                      title="Adicionar uma unidade do produto"
                      type="button"
                      onClick={() => addProduct(product)}
                    >
                      +
                    </button>
                    <button
                      title="Remover produto"
                      type="button"
                      onClick={() => deleteProduct(product)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-conteiner-meio">
          <div className="cart-cima">
            <div className="cart-address">
              <h2>Endereço de entrega:</h2>
              <br />
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
                    <button className="modal-botoes" onClick={openModal}>
                      Selecionar outro endereço
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-baixo">
            <select
              name="Options"
              id="Pagamento"
              value={tipoPag}
              onChange={(e) => setTipoPag(Number(e.target.value))}
            >
              <option value="1">Cartão de Crédito</option>
              <option value="0">Boleto</option>
            </select>

            {tipoPag === 1 && (
              <div>
                <div className="cadastrogeral-input">
                  <p>Nome Completo</p>
                  <input
                    name="nomeCompleto"
                    value={creditCard.nomeCompleto}
                    onChange={handleInputChange}
                    type="text"
                    className="cadastrogrande-input"
                    placeholder="Joel Miller"
                  />
                </div>

                <div className="cadastrogeral-input">
                  <p>Nº Cartão</p>
                  <input
                    name="numCartao"
                    value={creditCard.numCartao}
                    onChange={handleInputChange}
                    type="text"
                    className="cadastro-input"
                    placeholder="**** **** **** ****"
                    maxLength={16}
                    disabled={!creditCard.nomeCompleto}
                  />
                </div>

                <div className="cadastrofinal-input">
                  <div className="cadastrogeral-input">
                    <p>Validade</p>
                    <input
                      name="validade"
                      value={creditCard.validade}
                      onChange={handleInputChange}
                      type="text"
                      className="cadastropequeno-input"
                      placeholder="**/**"
                      maxLength={5}
                      disabled={!creditCard.numCartao}
                    />
                  </div>
                  <div className="cadastrogeral-input">
                    <p>CVV</p>
                    <input
                      name="cvv"
                      value={creditCard.cvv}
                      onChange={handleInputChange}
                      type="text"
                      className="cadastropequeno-input"
                      placeholder="***"
                      maxLength={3}
                      disabled={!creditCard.validade}
                    />
                  </div>
                </div>
              </div>
            )}

            {tipoPag === 0 && (
              <p className="Mensagem-conferencia">
                O boleto será gerado após finalizar
              </p>
            )}
          </div>
        </div>
        <div className="cart-total-conf">
          <h2>Frete: R$ {frete}</h2>
          <h2>Total: R$ {total}</h2>
          <button
            className="cart-address-buttom"
            type="button"
            onClick={checkout}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal2}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h1 className="conf-modal">Pedido finalizado!</h1>
        <h2 className="conf-modal">Agradecemos a preferência.</h2>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <EditarEndereco2 />
      </Modal>
    </>
  );
}
