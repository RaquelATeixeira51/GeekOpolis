import React from 'react';
import { Link } from 'react-router-dom';
import Bone from '../../assets/img/icons/bone.png';
import Cabide from '../../assets/img/icons/cabide.png';
import Caneca from '../../assets/img/icons/caneca.png';
import './index.css';

function CategoryImages() {
  return (
    <div className="category-images">
    <Link to="Canecas">
      <div className="image-container">
        <img
          src={Caneca}
          alt="Categoria 1"
        />
      </div>
      </Link>
      <Link to="Roupas">
      <div className="image-container">
        <img
          src={Cabide}
          alt="Categoria 2"
        />
      </div>
      </Link>
      <Link to="Acessorios">
      <div className="image-container">
        <img
          src={Bone}
          alt="Categoria 3"
        />
      </div>
      </Link>
    </div>
  );
};

export default CategoryImages;