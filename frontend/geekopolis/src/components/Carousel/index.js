/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';
import './index.css';
import imag from '../../assets/img/produtos/img-super-man.jpg';
import xavier from '../../assets/img/produtos/xavier.jfif';
import imag2 from '../../assets/img/produtos/funko1.jfif';
import imag3 from '../../assets/img/produtos/funko2.jfif';
import imag4 from '../../assets/img/produtos/funko4.png';
import imag5 from '../../assets/img/produtos/funko3.jfif';

function Carousel(props) {
  const { products } = props;
  const [body, setBody] = React.useState({
    nome: '',
    avaliacao: 0,
    descricao: '',
    preco: 0,
    qtdEstoque: 0,
    imagesPath: [imag4, imag, xavier, imag2, imag3, imag5],
    categoriaId: 0,
    status: false,
  });

  /* return (
        <>
          <div className="carousel-container">
            <Slider
              infinite={true}
              speed="500"
              slidesToShow={5}
              slidesToScroll={1}
              arrows={true}
            >
              {Array.isArray(body.imagesPath) ? (
                body.imagesPath.map((image) => (
                  <div className="carousel-slide">
                    <div className="inside">
                      <img src={image} className="carousel-image" alt="a" />
                      <div className="descricao">
                        <h2 className="nome">Nome produto</h2>
                        <h2 className="nome" id="preco">
                          R$ 300,00
                        </h2>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>Nenhuma imagem disponível</div>
              )}
            </Slider>
          </div>
        </>
      ); */
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
              <div className="carousel-slide">
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
              </div>
            ))}
          </Slider>
      </div>
    </>
  );
}

export default Carousel;
