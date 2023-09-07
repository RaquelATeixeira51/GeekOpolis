/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './assets/css/reset.css';
import './assets/css/root.css';
import './assets/css/styles.css';
import Inicio from './pages/Inicio';
import Login from './pages/login';
import ListaUsuarios from './pages/ListaUsuarios';

function ProtectedRoute({ element }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  const expirationTime = new Date(new Date().getTime() + 10 * 60 * 1000);

  if (new Date() > expirationTime) {
    localStorage.removeItem('token');
    return <Navigate to="/" />;
  }

  return element;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
        <Route path="/" element={<Login />} />
        <Route path='/listaUsuarios' element={<ProtectedRoute element={<ListaUsuarios />} />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
