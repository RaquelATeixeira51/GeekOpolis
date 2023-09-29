/* eslint-disable no-debugger */
import * as React from 'react';
import './index.css';
import { Navigate } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import makeToast from '../../shared/toaster';

export default function Login() {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [redirect, setRedirect] = React.useState('');

  const handleLogin = () => {
    fetch(`http://localhost:8080/usuario/login`, {
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
          localStorage.setItem('token', data);
          setRedirect('/inicio');
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
      <div className="login-form">
        <img
          src={Logo}
          className="geekopolis-login-logo"
          alt="Geekopolis logo"
        />
        <div className="login-input-container">
          <p className="login-p">Email</p>
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="login-rounded-input"
          />
        </div>
        <div className="login-input-container">
          <p className="login-p">Senha</p>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            className="login-rounded-input"
          />
          <span>Esqueceu a senha?</span>
        </div>
        <div className="login-entrar-button">
          <button type="button" onClick={handleLogin}>
            <p className="login-p">Entrar</p>
          </button>
        </div>
      </div>
    </>
  );
}
