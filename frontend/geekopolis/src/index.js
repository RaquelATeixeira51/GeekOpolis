import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import Cadastrar from './pages/Cadastrar';
import Header from './components/Header';
import '../src/assets/css/reset.css'
import Inicio from './pages/Inicio';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Inicio />
  </React.StrictMode>
);
