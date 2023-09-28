import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import Casa from '../../assets/img/icons/casinha.png';
import Bone from '../../assets/img/icons/bone.png';
import Cabide from '../../assets/img/icons/cabide.png';
import Caneca from '../../assets/img/icons/caneca.png';
import Carrinho from '../../assets/img/icons/carrinho.png';
import Sair from '../../assets/img/icons/sair.png';
import LoginIcon from '../../assets/img/icons/login-icon.png';

const hasToken = localStorage.getItem('tokenClient');

function Header() {
  return (
    <div className="header">
      <Link to="/Principal">
        <img className="logo" src={Logo} alt="Logo" />
      </Link>
      <div className="categorias">
        <Link to="/Inicio">
          <img className="casaImg" src={Casa} alt="Home" />
          <p className="Home">Inicio</p>
        </Link>
        <Link to="/Canecas">
          <img className="canecaImg" src={Caneca} alt="Caneca" />
          <p className="Canecas">Canecas</p>
        </Link>
        <Link to="/Roupas">
          <img className="cabideImg" src={Cabide} alt="Cabide" />
          <p className="Roupas">Roupas</p>
        </Link>
        <Link to="/Acessorios">
          <img className="boneImg" src={Bone} alt="Bone" />
          <p className="Acessorios">Acessórios</p>
        </Link>
      </div>
      <div className="login-container">
        <Link to="/Carrinho">
          <img className="Carrinho" src={Carrinho} alt="Carrinho" />
        </Link>
        {hasToken ? (
          <Link to="/">
            <div className="login-content">
              <img className="sairImg" src={Sair} alt="Sair" />
              <p className="Sair">Sair</p>
            </div>
          </Link>
        ) : (
          <Link to="/Login">
            <div className="login-content">
              <img className="loginImg" src={LoginIcon} alt="Login" />
              <p className="Sair">Login</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
export default Header;
