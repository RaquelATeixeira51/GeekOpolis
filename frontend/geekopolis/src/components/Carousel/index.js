/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './slick.css';
import './slick-theme.css';
import './index.css';

function Carousel(props) {
  const { products } = props;

  return (
    <>
      <div className="carousel-container">
        <Slider
          infinite={true}
          speed="500"
          slidesToShow={5}
          slidesToScroll={1}
          arrows={true}
        >
          {products.map((product) => (
            <div className="carousel-slide" key={product.id}>
              <Link to={`/produto/${product.id}`}>
                <div className="inside">
                  <img
                    src={product.imagesPath[0]}
                    className="carousel-image"
                    alt={product.nome}
                  />
                  <div className="descricao">
                    <h2 className="nome">{product.nome}</h2>
                    <h2 className="nome" id="preco">
                      {product.preco.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Carousel;
