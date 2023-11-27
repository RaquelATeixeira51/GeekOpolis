/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import CutLogo from '../../assets/img/logo/GeekOpolisLogo-cutted.png';
import LogoutIcon from '../../assets/img/icons/logout-icon.png';
import UsersIcon from '../../assets/img/icons/users-icon.png';
import ProductsIcon from '../../assets/img/icons/products-icon.png';
import PedidosIcon from '../../assets/img/icons/lista-de-controle.png';
import LoginIcon from '../../assets/img/icons/login-icon.png';
import ArrowIcon from '../../assets/img/icons/arrow-icon.png';
import makeToast from '../../shared/toaster';

export default function Aside() {
  const [userRole, setUserRole] = React.useState('');
  const [asideOpen, setAsideOpen] = React.useState(false);

  const handleOpenAside = () => {
    setAsideOpen(!asideOpen);
    const aside = document.getElementById('aside');
    if (asideOpen) aside.style.width = '60px';
    else if (!asideOpen) aside.style.width = '200px';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserRole('NÃO LOGADO');
      return;
    }

    const response = await fetch(
      `http://localhost:8080/usuario/informacoes?jwtToken=${token}`
    );
    const data = await response.json();
    if (!data.id) {
      makeToast('error', 'Erro ao autenticar usuário');
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    setUserRole(data.grupo);
  };

  React.useEffect(() => {
    handleToken();
  }, []);

  if (userRole === 'ADMIN') {
    return (
      <>
        <aside className="aside" id="aside">
          <div>
            <button
              type="button"
              className="open-aside-button"
              onClick={handleOpenAside}
            >
              <img
                src={ArrowIcon}
                alt="GeekOpolis Products Icon"
                className={asideOpen ? 'left' : 'right'}
              />
            </button>
          </div>
          {asideOpen ? (
            <>
              <div className="geekopolis-aside-home-link">
                <Link to="/inicio">
                  <img
                    className="geekopolis-aside-logo"
                    src={Logo}
                    alt="GeekOpolis Logo"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-links">
                <Link to="/listaProdutos">
                  <img src={ProductsIcon} alt="GeekOpolis Products Icon" />
                  <p>Produtos</p>
                </Link>
                <Link to="/listaUsuarios">
                  <img src={UsersIcon} alt="GeekOpolis Users Icon" />
                  <p>Usuários</p>
                </Link>
                <Link to="/listaPedido">
                  <img
                    src={PedidosIcon}
                    alt="GeekOpolis Users Icon"
                    className="large"
                  />
                  <p>Pedidos</p>
                </Link>
              </div>
              <div className="geekopolis-aside-footer">
                <button type="button" onClick={handleLogout}>
                  <p>Logout</p>
                  <img src={LogoutIcon} alt="GeekOpolis Logout Icon" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="geekopolis-aside-home-link">
                <Link to="/inicio">
                  <img
                    className="geekopolis-aside-logo"
                    src={CutLogo}
                    alt="GeekOpolis Logo"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-links">
                <Link to="/listaProdutos">
                  <img
                    src={ProductsIcon}
                    alt="GeekOpolis Products Icon"
                    className="large"
                  />
                </Link>
                <Link to="/listaUsuarios">
                  <img
                    src={UsersIcon}
                    alt="GeekOpolis Users Icon"
                    className="large"
                  />
                </Link>
                <Link to="/listaPedido">
                  <img
                    src={PedidosIcon}
                    alt="GeekOpolis Users Icon"
                    className="large"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-footer border-0 ">
                <button type="button" onClick={handleLogout}>
                  <img
                    src={LogoutIcon}
                    alt="GeekOpolis Logout Icon"
                    className="large"
                  />
                </button>
              </div>
            </>
          )}
        </aside>
      </>
    );
  }

  if (userRole === 'ESTOQUISTA') {
    return (
      <>
        <aside className="aside" id="aside">
          <div>
            <button
              type="button"
              className="open-aside-button"
              onClick={handleOpenAside}
            >
              <img
                src={ArrowIcon}
                alt="GeekOpolis Products Icon"
                className={asideOpen ? 'left' : 'right'}
              />
            </button>
          </div>
          {asideOpen ? (
            <>
              <div className="geekopolis-aside-home-link">
                <Link to="/inicio">
                  <img
                    className="geekopolis-aside-logo"
                    src={Logo}
                    alt="GeekOpolis Logo"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-links">
                <Link to="/listaProdutos">
                  <img src={ProductsIcon} alt="GeekOpolis Products Icon" />
                  <p>Produtos</p>
                </Link>
                <Link to="/listaPedido">
                  <img
                    src={PedidosIcon}
                    alt="GeekOpolis Users Icon"
                    className="large"
                  />
                  <p>Pedidos</p>
                </Link>
              </div>
              <div className="geekopolis-aside-footer">
                <button type="button" onClick={handleLogout}>
                  <p>Logout</p>
                  <img src={LogoutIcon} alt="GeekOpolis Logout Icon" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="geekopolis-aside-home-link">
                <Link to="/inicio">
                  <img
                    className="geekopolis-aside-logo"
                    src={CutLogo}
                    alt="GeekOpolis Logo"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-links">
                <Link to="/listaProdutos">
                  <img
                    src={ProductsIcon}
                    alt="GeekOpolis Products Icon"
                    className="large"
                  />
                </Link>
                <Link to="/listaPedido">
                  <img
                    src={PedidosIcon}
                    alt="GeekOpolis Users Icon"
                    className="large"
                  />
                </Link>
              </div>
              <div className="geekopolis-aside-footer border-0 ">
                <button type="button" onClick={handleLogout}>
                  <img
                    src={LogoutIcon}
                    alt="GeekOpolis Logout Icon"
                    className="large"
                  />
                </button>
              </div>
            </>
          )}
        </aside>
      </>
    );
  }

  return (
    <>
      <aside className="aside" id="aside">
        <div>
          <button
            type="button"
            className="open-aside-button"
            onClick={handleOpenAside}
          >
            <img
              src={ArrowIcon}
              alt="GeekOpolis Products Icon"
              className={asideOpen ? 'left' : 'right'}
            />
          </button>
        </div>
        {asideOpen ? (
          <>
            <div className="geekopolis-aside-home-link">
              <Link to="/inicio">
                <img
                  className="geekopolis-aside-logo"
                  src={Logo}
                  alt="GeekOpolis Logo"
                />
              </Link>
            </div>
            <div className="geekopolis-aside-links" />
            <div className="geekopolis-aside-footer">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <p>Login</p>
                <img src={LoginIcon} alt="GeekOpolis Login Icon" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="geekopolis-aside-home-link">
              <Link to="/inicio">
                <img
                  className="geekopolis-aside-logo"
                  src={CutLogo}
                  alt="GeekOpolis Logo"
                />
              </Link>
            </div>
            <div className="geekopolis-aside-links" />
            <div className="geekopolis-aside-footer border-0 ">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <img
                  src={LoginIcon}
                  alt="GeekOpolis Login Icon"
                  className="large"
                />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
