/* eslint-disable no-debugger */
/* eslint-disable react/jsx-boolean-value */
import './index.css';
import * as React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '../../components/Carousel';
import makeToast from '../../shared/toaster';
import Header from '../../components/Header';
import CategoryImages from '../../components/categories';


function LandingPage() {
  const [categories, setCategories] = React.useState([]);
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
              {index === 0 && <CategoryImages />}
            </div>
          ))}
      </div>
    </>
  );
}

export default LandingPage;
