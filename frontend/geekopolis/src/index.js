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
import Inicio from './pages/inicio';
import Login from './pages/login';
<<<<<<< HEAD
import ListaUsuarios from './pages/ListaUsuarios';
import Cadastro from './pages/cadastro';
=======
import ListaUsuarios from './pages/listaUsuarios';
>>>>>>> f050a9d00c8217bbffc0198945d6be1cfb49b519

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
    const tokenCheckInterval = setInterval(checkTokenValidity, 10 * 60 * 1000);

    checkTokenValidity();

    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, [navigate]);

  return tokenValid ? element : <Navigate to="/" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path='/listaUsuarios' element={<ProtectedRoute element={<ListaUsuarios />} />}/>
        <Route path="/cadastro" element={<Cadastro />} />
=======
        <Route
          path="/inicio"
          element={<ProtectedRoute element={<Inicio />} />}
        />
        <Route
          path="/listaUsuarios"
          element={<ProtectedRoute element={<ListaUsuarios />} />}
        />
>>>>>>> f050a9d00c8217bbffc0198945d6be1cfb49b519
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
