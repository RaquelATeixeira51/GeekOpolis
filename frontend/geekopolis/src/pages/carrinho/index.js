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
        console.log(data);
        const { lat, lng } = data.results[0].geometry.location;
        setEndereco({
          ...endereco,
          cep: cepRef.current.value,
          logradouro: data.results[0].address_components[1].long_name,
          cidade: data.results[0].address_components[3].long_name,
          uf: data.results[0].address_components[4].short_name,
        });
        setTotal(
          !valorFrete || cep !== cepRef.current.value
            ? Number(getDistanceFromLatLonInKm(lat, lng) * 1.5) +
                Number(totalProdutos.replace(',', '.'))
            : total
        );
        setCep(cepRef.current.value);
        setValorFrete(Number(getDistanceFromLatLonInKm(lat, lng) * 1.5));
      })
      .catch((err) => {
        console.log(err);
        makeToast('error', 'Erro ao calcular frete');
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
          const endereco = data.find((e) => e.principal === true);
          setEndereco(endereco);
          handleFirstFreight(endereco.cep, cart.total);
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
              <h2>CEP: {endereco?.cep}</h2>
              <h2>Logradouro: {endereco?.logradouro}</h2>
              <h2>Cidade: {endereco?.cidade}</h2>
              <h2>UF: {endereco?.uf}</h2>
              <h2>Numero: {endereco?.numero}</h2>
              <h2>Complemento: {endereco?.complemento}</h2>

              <div className="cart-address-change">
                <Link to="/editarEndereco">Alterar Endereço de entrega</Link>
              </div>
            </div>

            <h3 className="cart-subtotal cart-total">
              Subtotal: R$ {totalProdutos}{' '}
            </h3>
            <h3 className="cart-subtotal cart-total">
              Frete: R${' '}
              {valorFrete?.toLocaleString('pt-BR', { currency: 'BRL' })}{' '}
            </h3>
            <h2 className="cart-total">
              Total: R$ {total?.toLocaleString('pt-BR', { currency: 'BRL' })}
            </h2>
            <Link to="/checkout">
              <button
                type="button"
                onClick={checkout}
                className="cart-address-change"
              >
                Checkout
              </button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
