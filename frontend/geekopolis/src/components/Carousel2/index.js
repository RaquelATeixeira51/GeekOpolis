/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

function Carousel2(props) {
  const { products } = props;

  return (
    <>
      <div className="carousel-container">
          <Slider
            infinite={true}
            speed="500"
            slidesToShow={1}
            slidesToScroll={1}
            arrows={true}
          >
            {products.map((product) => (
              <div className="carousel-slide">
                <div className="inside2">
                  <img
                    src={product.imagesPath[0]}
                    className="image-product"
                    alt={product.nome}
                  />
                </div>
              </div>
            ))}
          </Slider>
      </div>
    </>
  );
}

export default Carousel2;
