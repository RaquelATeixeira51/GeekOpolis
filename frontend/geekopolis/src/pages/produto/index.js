/* eslint-disable no-debugger */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import './index.css';
import { Navigate, useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import makeToast from '../../shared/toaster';
import Carousel2 from '../../components/Carousel2';
import Header from '../../components/Header';

export default function Produto() {
  const { id } = useParams();
  const [redirect, setRedirect] = React.useState('');
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    fetch(`http://localhost:8080/produto/listaProduto/${id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao encontrar o produto.');
        setRedirect('/landing-page');
        return null;
      })
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          makeToast('error', 'Erro ao encontrar o produto.');
          setRedirect('/landing-page');
        }
      })
      .catch((err) => {
        makeToast('error', err);
        setRedirect('/landing-page');
      });
  }, []);

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <div className="product-col">
        <div className="limitar">
          <div className="carousel">
            <Carousel2 products={product.imagesPath} />
          </div>
        </div>
        <div className="infos-product">
          <div className="product-col-02">
            <h2>{product.nome}</h2>
            <div className="classi">
              <ReactStars
                count={5}
                size={40}
                half={true}
                edit={false}
                value={product.avaliacao}
                color2="#fdd835"
              />
            </div>
            <p className="valor-produto">
              R$ {Number(product.preco).toFixed(2)}
            </p>
          </div>
          <div className="product-col-01-desc">
            <h2>DESCRIÇÃO DO PRODUTO</h2>
            <p>{product.descricao}</p>
          </div>
        </div>
      </div>
    </>
  );
}
