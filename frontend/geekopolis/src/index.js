/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './assets/css/reset.css';
import './assets/css/root.css';
import './assets/css/styles.css';
import Login from './pages/login';
import ListaUsuarios from './pages/listaUsuarios';
import CadastroProduto from './pages/cadastroProduto';
import Cadastro from './pages/cadastro';
<<<<<<< HEAD
import ListaProdutos from './pages/ListaProdutos';

=======
import Inicio from './pages/inicio';
>>>>>>> 6013115a34c4217a2afad578408702a64d0d74be

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTokenValid(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/token/valid?token=${localStorage.getItem(
          'token'
        )}`
      );
      const isValid = await response.json();

      if (!isValid) {
        localStorage.removeItem('token');
        setTokenValid(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao verificar a validade do token', error);
    }
  };

  useEffect(() => {
    const tokenCheckInterval = setInterval(checkTokenValidity, 60 * 1000);

    checkTokenValidity();

    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [navigate]);

  useEffect(() => {
    if (!tokenValid) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [tokenValid, navigate]);

  return tokenValid ? element : <Navigate to="/" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route
          path="/inicio"
          element={<ProtectedRoute element={<Inicio />} />}
        />
        <Route
          path="/listaUsuarios"
          element={<ProtectedRoute element={<ListaUsuarios />} />}
        />
        <Route
          path="/cadastroProduto"
          element={<ProtectedRoute element={<CadastroProduto />} />}
        />
<<<<<<< HEAD
        <Route path="/cadastro" element={<ProtectedRoute element={<Cadastro/>} />} />
        <Route path="/ListaProdutos" element={<ProtectedRoute element={<ListaProdutos/>} />} />
=======
        <Route
          path="/cadastro"
          element={<ProtectedRoute element={<Cadastro />} />}
        />
>>>>>>> 6013115a34c4217a2afad578408702a64d0d74be
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
