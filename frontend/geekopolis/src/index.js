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
import ListaUsuarios from './pages/ListaUsuarios';
import CadastroProduto from './pages/cadastroProduto';
import Cadastro from './pages/cadastro';
import ListaProdutos from './pages/ListaProdutos';
import Inicio from './pages/Inicio';
import Produto from './pages/produto';
import LandingPage from './pages/landingPage';
import CadastroCliente from './pages/cadastroCliente';
import LoginCliente from './pages/loginCliente';
import Cliente from './pages/editarCliente';
import EditarEndereco from './pages/editarEndereco';
import InicioCliente from './pages/InicioCliente';
import Carrinho from './pages/carrinho';
import Checkout from './pages/conferencia';
import Pedidos from './pages/pedidos';
import Detalhe from './pages/detalhePedido';
import ListaPedido from './pages/listaPedido';

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

function ProtectedRouteCliente({ element }) {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('token-cliente');
    if (!token) {
      setTokenValid(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/token/valid?token=${localStorage.getItem(
          'token-cliente'
        )}`
      );
      const isValid = await response.json();

      if (!isValid) {
        localStorage.removeItem('token-cliente');
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
      localStorage.removeItem('token-cliente');
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
        <Route path="/" element={<LandingPage/>} />
        <Route path="/editarEndereco" element={<ProtectedRouteCliente element={<EditarEndereco/>} />} />
        <Route path="/LoginBackOffice" element={<Login/>} />
        <Route path="/produto/:id" element={<Produto/>} />
        <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
        <Route path="/listaUsuarios" element={<ProtectedRoute element={<ListaUsuarios />} />} />
        <Route path="/cadastroProduto" element={<ProtectedRoute element={<CadastroProduto />} />} />
        <Route path="/cadastro" element={<ProtectedRoute element={<Cadastro/>} />} />
        <Route path="/ListaProdutos" element={<ProtectedRoute element={<ListaProdutos/>} />} />
        <Route path='/cadastroCliente' element={<CadastroCliente />} />
        <Route path='/cliente' element={<ProtectedRouteCliente element={<Cliente />} />} />
        <Route path='/loginCliente' element={<LoginCliente/>}/>
        <Route path='/principal' element={<InicioCliente/>}/>
        <Route path='/carrinho' element={<Carrinho />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/pedidos' element={<ProtectedRouteCliente element={<Pedidos />} />} />
        <Route path="/pedido/:id" element={<Detalhe />} />
        <Route path='/listaPedido' element={<ListaPedido/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
