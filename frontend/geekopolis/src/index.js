/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './assets/css/reset.css';
import './assets/css/root.css';
import './assets/css/styles.css';
import Inicio from './pages/Inicio';
import Login from './pages/login';
import ListaUsuarios from './pages/ListaUsuarios';

function ProtectedRoute({ element }) {
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/token/valid?token=${localStorage.getItem('token')}`);
        const isValid = await response.json();

        if (!isValid) {
          localStorage.removeItem('token');
          setTokenValid(false);

        }
      } catch (error) {
        console.error('Erro ao verificar a validade do token', error);
      }
    };

    checkTokenValidity();

    const tokenCheckInterval = setInterval(checkTokenValidity, 10 * 60 * 1000);

    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);

  if (!tokenValid) {
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
