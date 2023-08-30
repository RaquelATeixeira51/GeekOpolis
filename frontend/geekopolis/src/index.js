import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/assets/css/reset.css'
import CadastroUsuario from './pages/Cadastro Usuario';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Inicio from './pages/Inicio';
import Cadastrar from './pages/Cadastrar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/CadastroUsuario' element={<CadastroUsuario />}/>
        <Route path='/CadastrarAdmin' element={<Cadastrar />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
