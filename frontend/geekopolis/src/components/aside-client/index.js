/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import './index.css';
import { Link, Navigate } from 'react-router-dom';
import LogoutIcon from '../../assets/img/icons/logout-icon.png';
import UsersIcon from '../../assets/img/icons/users-icon.png';
import ProductsIcon from '../../assets/img/icons/products-icon.png';
import ArrowIcon from '../../assets/img/icons/arrow-icon.png';
import makeToast from '../../shared/toaster';
import Pedidos from '../../assets/img/icons/pedidos.png';

export default function Aside() {
  const [asideOpen, setAsideOpen] = React.useState(false);

  const handleOpenAside = () => {
    setAsideOpen(!asideOpen);
    const aside = document.getElementById('aside');
    if (asideOpen) aside.style.width = '60px';
    else if (!asideOpen) aside.style.width = '200px';
  };

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
            <div className="geekopolis-aside-links aside-client-links">
              <Link to="/cliente">
                <img src={UsersIcon} alt="Editar Usuário" className="large" />
                <p>Editar dados</p>
              </Link>
              <Link to="/editarEndereco">
                <img
                  src={ProductsIcon}
                  alt="Editar endereço"
                  className="medium"
                />
                <p>Editar Endereços</p>
              </Link>
              <Link to="/pedidos">
                <img src={Pedidos} alt="Editar endereço" className="large" />
                <p>Pedidos</p>
              </Link>
            </div>

            {/* <div className="geekopolis-aside-footer">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <p>Sair</p>
                <img src={LogoutIcon} alt="GeekOpolis Login Icon" />
              </button>
            </div> */}
          </>
        ) : (
          <>
            <div className="geekopolis-aside-links">
              <img
                src={UsersIcon}
                alt="GeekOpolis Products Icon"
                className="large"
              />
              <img
                src={ProductsIcon}
                alt="GeekOpolis Products Icon"
                className="medium"
              />
              <img
                src={Pedidos}
                alt="GeekOpolis Products Icon"
                className="large"
              />
            </div>
            {/* <div className="geekopolis-aside-footer border-0 ">
              
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                <img
                  src={LogoutIcon}
                  alt="GeekOpolis Login Icon"
                  className="large"
                />
              </button>
            </div> */}
          </>
        )}
      </aside>
    </>
  );
}
