/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
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
          <Slider infinite={true} speed='500' slidesToShow={1} slidesToScroll={1} arrows={true}>
              {Array.isArray(products) ? (
                products.map((image, index) => (
                  <div className="carousel-slide">
                    <div className="inside2">
                    <img src={image} alt={`Image ${index}`} className="image-product" />
                  </div>
                 </div>
                ))
              ) : (
                <div>Nenhuma imagem disponível</div>
              )}
            </Slider>
      </div>
    </>
  );
}

export default Carousel2;
