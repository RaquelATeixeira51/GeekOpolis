/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';

export default function Footer() {
  return (
    <div className="footer-fundo">
      <div className="footer-content">
        <img
          className="footer-geekopolis-aside-logo"
          src={Logo}
          alt="GeekOpolis Logo"
        />
        <div className="footer-Mia">
          <h3>HOMOSAPIENS SA - CNPJ 25.561.105/0001-40</h3>
          <h3>
            Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP,
            04696-000
          </h3>
        </div>
        <Link to="/LoginBackOffice" className="footer-employee-link">
          <p>Sou um funcionário</p>
        </Link>
      </div>
    </div>
  );
}
