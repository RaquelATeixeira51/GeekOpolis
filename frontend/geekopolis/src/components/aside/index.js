/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import LogoutIcon from '../../assets/img/icons/logout-icon.png';
import ListUsersIcon from '../../assets/img/icons/list-users-icon.png';
import ListProductsIcon from '../../assets/img/icons/list-products-icon.png';

export default function Aside() {
  const handleLogout = () => {
    sessionStorage.removeItem('TOKEN');
    window.location.href = '/';
  };

  return (
    <>
      <aside className="aside">
        <div className="geekopolis-aside-home-link">
          <Link to="/">
            <img
              className="geekopolis-aside-logo"
              src={Logo}
              alt="GeekOpolis Logo"
            />
          </Link>
        </div>
        <div className="geekopolis-aside-links">
          <Link to="/produtos">
            <img src={ListProductsIcon} alt="GeekOpolis List Products Icon" />
            <p>Listar Produtos</p>
          </Link>
          <Link to="/usuarios">
            <img src={ListUsersIcon} alt="GeekOpolis List Users Icon" />
            <p>Listar Usuarios</p>
          </Link>
        </div>
        <div className="geekopolis-aside-footer">
          <button type="button" onClick={handleLogout}>
            <p>Logout</p>
            <img src={LogoutIcon} alt="GeekOpolis Logout Icon" />
          </button>
        </div>
      </aside>
    </>
  );
}
