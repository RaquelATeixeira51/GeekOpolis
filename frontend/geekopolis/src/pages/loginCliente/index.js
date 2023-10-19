/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-debugger */
import * as React from 'react';
import './index.css';
import { Navigate, Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import makeToast from '../../shared/toaster';


export default function loginCliente() {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [redirect, setRedirect] = React.useState('');

  const handleloginCliente = () => {
    fetch(`http://localhost:8080/cliente/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailRef.current.value,
        senha: passwordRef.current.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        makeToast('error', 'Erro ao logar, tente novamente');
        return null;
      })
      .then((data) => {
        if (data) {
          localStorage.setItem('token-cliente', data);
          setRedirect('/Principal');
        } else {
          makeToast('error', 'Erro ao logar, tente novamente');
        }
      })
      .catch((err) => {
        makeToast('error', err);
      });
  };
  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <div className="loginCliente-form">
        <img
          src={Logo}
          className="geekopolis-loginCliente-logo"
          alt="Geekopolis logo"
        />
        <div className="loginCliente-input-container">
          <p className="login-p">Email</p>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="loginCliente-rounded-input"
          />
        </div>
        <div className="loginCliente-input-container">
          <p className="loginCliente-p">Senha</p>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="loginCliente-rounded-input"
          />
          <span>Esqueceu a senha?</span>
        </div>
        <div className="loginCliente-entrar-button">
          <button type="button" onClick={handleloginCliente}>
            <p className="loginCliente-p">Entrar</p>
          </button>
        </div>
        <div className="loginCliente-cadastrar-button">
          <Link to="/cadastroCliente">
            <button type="button">
              <p className="loginCliente-cadastrar-p">Cadastre-se</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
