import * as React from 'react';
import { Link } from 'react-router-dom';
import cartUtils from '../../methods';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import './styles.css';
import getDistanceFromLatLonInKm from '../../utils/getDistance';

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
    cartUtils.adicionaProdutoAoCarrinho(produto);
    cartUtils.adicionarFrete(frete);
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

  const calcularFrete = () => {
    if (!cepRef.current.value) {
      makeToast('error', 'Digite um CEP válido');
      return;
    }
    if (valorFrete && cep === cepRef.current.value) {
      makeToast('error', 'Frete já calculado');
      return;
    }

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&address=${cepRef.current.value}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry.location;
        setTotal(
          !valorFrete || cep !== cepRef.current.value
            ? Number(getDistanceFromLatLonInKm(lat, lng) * 1.5) +
                Number(totalProdutos.replace(',', '.'))
            : total
        );
        setCep(cepRef.current.value);
        setValorFrete(Number(getDistanceFromLatLonInKm(lat, lng) * 1.5));
      })
      .catch(() => {
        makeToast('error', 'Erro ao buscar endereços');
      });
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
          setEndereco(data.find((e) => e.principal === true));
          calcularFrete();
        }
      })
      .catch(() => {
        makeToast('error', 'Erro ao buscar endereços');
      });
  }, []);

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

            <div className="cart-address">
              <h2>CEP:</h2>
              <div className="cart-address-info">
                <input
                  type="text"
                  id="email"
                  ref={cepRef}
                  className="cart-rounded-input"
                  value={endereco?.cep ? endereco?.cep : null}
                />
                <button
                  type="button"
                  className="cart-address-change"
                  onClick={calcularFrete}
                >
                  Calcular Frete
                </button>
              </div>
            </div>

            <h2 className="cart-total">Total: R$ {total}</h2>
            <Link to="/checkout">
              <button type="button" onClick={checkout} className="cart-address-change">
                checkout
              </button>
            </Link>
            
          </div>
        </main>
      </div>
    </>
  );
}
