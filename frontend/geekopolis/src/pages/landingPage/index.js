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

  const [body, setBody] = React.useState({
    nome: '',
    avaliacao: 0,
    descricao: '',
    preco: 0,
    qtdEstoque: 0,
    imagesPath: [imag, xavier, imag2, imag3, imag4],
    categoriaId: 0,
    status: false,
  });
  return (
    <>
      <div className="tudo">
        <Header />
        {categories &&
          categories.map((category) => (
            <>
              <h3 className="categoria">{category.nome}</h3>
              <div className="carousel">
                <Carousel products={category.produtos} />
              </div>
            </>
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
