/* eslint-disable no-debugger */
/* eslint-disable react/jsx-boolean-value */
import './index.css';
import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imag from '../../assets/img/produtos/img-super-man.jpg';
import xavier from '../../assets/img/produtos/xavier.jfif';
import imag2 from '../../assets/img/produtos/funko1.jfif';
import imag3 from '../../assets/img/produtos/funko2.jfif';
import imag4 from '../../assets/img/produtos/funko3.jfif';
import Carousel from '../../components/Carousel';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import CategoryImages from '../../components/categories';


function LandingPage() {
  const [categories, setCategories] = React.useState([]);
  // http://localhost:8080/categoria/listaCategoria/1
  React.useEffect(() => {
    fetch(`http://localhost:8080/categoria/listaCategorias`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setCategories(data);
        }
      })
      .catch((err) => {
        makeToast('error', err);
      });
  }, []);
  return (
    <>
      <div className="tudo">
        <Header />
        {categories &&
          categories.map((category, index) => (
            <div key={category.id}>
              <h3 className="categoria">{category.nome}</h3>
              <div className="carousel">
                <Carousel products={category.produtos} />
              </div>
              {index === 0 && <CategoryImages />} {/* Renderize CategoryImages apenas abaixo da primeira categoria */}
            </div>
          ))}
        {/* <h3 className="categoria">Categoria</h3>
        <div className="carousel">
          <Carousel />
        </div>
        <h3 className="categoria">Categoria</h3>
        <div className="carousel">
          <Carousel />
        </div>
        <h3 className="categoria">Categoria</h3>
        <div className="carousel">
          <Carousel />
        </div> */}
      </div>
    </>
  );
}

export default LandingPage;
