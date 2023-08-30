import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import Cadastrar from './pages/Cadastrar';
import Header from './components/Header';
import '../src/assets/css/reset.css'
import Inicio from './pages/Inicio';
import CadastroUsuario from './pages/Cadastro Usuario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CadastroUsuario />
  </React.StrictMode>
);
