/* eslint-disable no-debugger */
import * as React from 'react';
import './index.css';
import { Link, Navigate } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import Casa from '../../assets/img/icons/casinha.png';
import Bone from '../../assets/img/icons/bone.png';
import Cabide from '../../assets/img/icons/cabide.png';
import Caneca from '../../assets/img/icons/caneca.png';
import Carrinho from '../../assets/img/icons/carrinho.png';
import Sair from '../../assets/img/icons/sair.png';
import LoginIcon from '../../assets/img/icons/login-icon.png';
import LogoutIcon from '../../assets/img/icons/logout-icon.png';
import makeToast from '../../shared/toaster';

const handleLogout = () => {
  const shouldLogout = window.confirm('Deseja mesmo deslogar?');

  if (shouldLogout) {
    localStorage.removeItem('token-cliente');
    window.location.href = '/';
  }
};

function Header() {
  const [redirect, setRedirect] = React.useState('');
  const [isLogged, setIsLogged] = React.useState(false);
  const hasToken = localStorage.getItem('token-cliente');

  React.useEffect(() => {
    fetch(
      `http://localhost:8080/cliente/buscaClienteByToken/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 500) {
          setIsLogged(false);
        } else {
          setIsLogged(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setRedirect('/');
      });
  }, []);

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <div className="header">
      <Link to={isLogged ? '/Principal' : '/'}>
        <img className="logo" src={Logo} alt="Logo" />
      </Link>
      <div className="categorias">
        <Link to="/">
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
          <>
            <Link to="/cliente">
              <img
                src={LoginIcon}
                alt="Editar Usuário"
                className="landing-page-user-icon"
              />
            </Link>
            <div className="geekopolis-aside-footer border-0 ">
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                <img
                  src={LogoutIcon}
                  alt="GeekOpolis Logout Icon"
                  className="large landing-page-logout-icon"
                />
              </button>
            </div>
          </>
        ) : (
          <Link to="/loginCliente">
            <div className="login-content">
              <img className="sairImg" src={LoginIcon} alt="Sair" />
              <p className="Sair">Login</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
export default Header;
