import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Header from './pages/Header';
import Cadastro from './pages/Cadastro'
import Usuario from './pages/CadastroUser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Usuario />
  </React.StrictMode>
);

