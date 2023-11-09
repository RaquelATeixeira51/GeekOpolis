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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useState } from 'react';
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [tipoPag, setTipoPag] = useState("Cred");
 
  
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
    }};
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

  const checkout = () => {
    cartUtils.adicionarEnderecoId(1);
    cartUtils.adicionarMetodoDePagamento(0);
    cartUtils.calcularEAtualizarTotal();

    cartUtils
      .checkout(checkoutURL)
      .then((response) => {
        cartUtils.initializeCart();
        makeToast('success', response);
        setIsModalOpen2(true); 
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
    location.reload();
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
                        src={product.produto.img}
                        alt={product.produto.nome}
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
                        <button className='modal-botoes' onClick={openModal}>
                          Adicionar novo endereço
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className='cart-baixo'>
      <select name="Options" id="Pagamento" value={tipoPag} onChange={(e) => setTipoPag(e.target.value)}>
        <option value="Cred">Cartão de Crédito</option>
        <option value="Bole">Boleto</option>
        <option value="PIX">PIX</option>
      </select>

      {tipoPag === "Cred" && (
        
        <div>
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
      )}

      {tipoPag === "Bole" && (
        <p className='Mensagem-conferencia'>O boleto será gerado após finalizar</p>
      )}

      {tipoPag === "PIX" && (
        <p className='Mensagem-conferencia'>O Pix será gerado após finalizar</p>
      )}
    </div>
        </div>
        <div className='cart-total-conf'>
            <h2>Frete: R$ {total}</h2>
            <h2>Total: R$ {total}</h2>
            <button  className="cart-address-buttom" type="button" onClick={checkout}>
                Finalizar
            </button>
        </div>
        </div>
      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal2}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
          <h1 className='conf-modal'>
            Pedido finalizado!
          </h1>
          <h2 className='conf-modal'>
            Agradecemos a preferência.
          </h2>
      </Modal>

      <Modal isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay">
          <EditarEndereco/>
      </Modal>
    </>
  );
}
