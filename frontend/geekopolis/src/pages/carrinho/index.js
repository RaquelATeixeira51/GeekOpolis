/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-const-assign */
import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import cartUtils from '../../methods';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import './styles.css';
import getDistanceFromLatLonInKm from '../../utils/getDistance';
import login from '../loginCliente';

export default function Carrinho() {
  const cepRef = React.createRef();
  const checkoutURL = `http://localhost:8080/pedido/criaPedido/token/${localStorage.getItem(
    'token-cliente'
  )}`;
  const [carrinho, setCarrinho] = React.useState({});
  const [endereco, setEndereco] = React.useState({});
  const [total, setTotal] = React.useState(0.0);
  const [valorFrete, setValorFrete] = React.useState(null);
  const [cep, setCep] = React.useState(null);
  const [totalProdutos, setTotalProdutos] = React.useState(null);
  const [redirect, setRedirect] = React.useState('');
  const [freightType, setFreightType] = React.useState(0);
  const [chk, setChk] = React.useState(0);

  const produto = {
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
    if (chk === 1) {
      cartUtils.adicionarFrete({
        tipo: freightType,
        valor: valorFrete,
      });
      cartUtils.adicionarEnderecoId(endereco.id);
      cartUtils.adicionarMetodoDePagamento(0);
      cartUtils.calcularEAtualizarTotal();
      window.location.href = '/checkout';
    } else {
      window.location.href = '/loginCliente';
    }
  };

  const handleFirstFreight = (cepParam, totalProdutos) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&address=${cepParam}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;
        setFreightType(0);
        setTotal(
          !valorFrete || cep !== cepParam
            ? Number(getDistanceFromLatLonInKm(lat, lng) * 1.5) +
                Number(totalProdutos)
            : total
        );
        setCep(cepParam);
        setValorFrete(Number(getDistanceFromLatLonInKm(lat, lng) * 1.5));
      })
      .catch(() => {
        makeToast('error', 'Erro ao calcular frete');
      });
  };

  const calcularFrete = (cepParam, freightType, type) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&address=${cepParam}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;
        setEndereco({
          ...endereco,
          logradouro: data.results[0].address_components[1].long_name,
          cidade: data.results[0].address_components[3].long_name,
          uf: data.results[0].address_components[4].short_name,
        });

        setTotal(
          Number(getDistanceFromLatLonInKm(lat, lng) * freightType) +
            Number(totalProdutos.replace('.', '').replace(',', '.'))
        );
        setFreightType(type);
        setValorFrete(
          Number(getDistanceFromLatLonInKm(lat, lng) * freightType)
        );
      })
      .catch(() => {
        makeToast('error', 'Erro ao calcular frete');
      });
  };

  const handleFreight = (freight, type) => {
    calcularFrete(cep, Number(freight), Number(type));
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
    setTotalProdutos(cart.total.toLocaleString('pt-BR', { currency: 'BRL' }));

    const isLogado = localStorage.getItem('token-cliente');

    if (isLogado) {
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
          if (data.length > 0) {
            const endereco = data.find((e) => e.principal === true);
            cartUtils.adicionarEnderecoId(endereco.id);
            setEndereco(endereco);
            handleFirstFreight(endereco.cep, cart.total);
            setChk(1);
            setCep(endereco.cep);
          }
        })
        .catch(() => {
          setChk(0);
          makeToast('error', 'Erro ao buscar endereços');
        });
    }
  }, []);

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <div className="cart-container">
        <main>
          <div className="cart">
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
            <div className="carrinho-cep-input">
              <input
                placeholder="CEP"
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>
            {cep ? (
              <>
                <div className="cart-freight">
                  <h2>Escolha o formato de frete:</h2>
                  <div className="cart-freight-input">
                    <input
                      type="radio"
                      name="entregadora"
                      value="1.8"
                      defaultChecked
                      onChange={() => handleFreight(1.5, 0)}
                    />
                    <span>SEDEX (3 a 6 dias úteis)</span>
                  </div>
                  <div className="cart-freight-input">
                    <input
                      type="radio"
                      value="2.4"
                      name="entregadora"
                      onChange={() => handleFreight(2, 1)}
                    />
                    <span>PAC (3 a 5 dias úteis)</span>
                  </div>
                  <div className="cart-freight-input">
                    <input
                      type="radio"
                      value="2.8"
                      name="entregadora"
                      onChange={() => handleFreight(2.1, 2)}
                    />
                    <span>MINI ENVIOS (2 a 6 dias úteis)</span>
                  </div>
                </div>

                <h3 className="cart-subtotal cart-total">
                  Subtotal: R$ {totalProdutos}{' '}
                </h3>
                <h3 className="cart-subtotal cart-total">
                  Frete: R${' '}
                  {valorFrete?.toLocaleString('pt-BR', { currency: 'BRL' })}{' '}
                </h3>
              </>
            ) : (
              <div className="none" />
            )}

            <h2 className="cart-total">
              Total: R$ {total?.toLocaleString('pt-BR', { currency: 'BRL' })}
            </h2>

            <button
              type="button"
              onClick={checkout}
              className="cart-address-change"
            >
              Checkout
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
