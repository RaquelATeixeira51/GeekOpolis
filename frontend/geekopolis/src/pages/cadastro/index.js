import './index.css';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { validate as validateCPF } from 'gerador-validador-cpf';
import Aside from '../../components/aside';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import makeToast from '../../shared/toaster';

function Cadastro() {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordConfirmationRef = React.createRef();
  const nameRef = React.createRef();
  const cpfRef = React.createRef();
  const groupRef = React.createRef();

  const [redirect, setRedirect] = React.useState('');

  const handleRegister = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      makeToast('error', 'Você não está logado');
      return;
    }
    if (emailRef.current.value === '') {
      makeToast('error', 'Email não pode ser vazio');
      return;
    }
    if (nameRef.current.value === '') {
      makeToast('error', 'Nome não pode ser vazio');
      return;
    }
    if (cpfRef.current.value === '') {
      makeToast('error', 'CPF não pode ser vazio');
      return;
    }
    if (emailRef.current.value === '') {
      makeToast('error', 'Email não pode ser vazio');
      return;
    }

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      makeToast('error', 'As senhas não coincidem');
      return;
    }
    if (!validateCPF(cpfRef.current.value)) {
      makeToast('error', 'CPF inválido!');
      return;
    }

    fetch(`http://localhost:8080/usuario/incluiAcesso?token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: nameRef.current.value,
        email: emailRef.current.value,
        senha: passwordRef.current.value,
        grupo: groupRef.current.value,
        cpf: cpfRef.current.value,
        ativo: true,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          setRedirect('/listaUsuarios');
          return response.json();
        }

        makeToast('error', response.message);
        return null;
      })
      .catch((error) => {
        console.log(error.message);
        setRedirect('/listaUsuarios');
      });
  };

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Aside />
      <div className="cadastro-form">
        <img
          src={Logo}
          className="geekopolis-login-logo"
          alt="Geekopolis logo"
        />
        <div className="Inputs">
          <div className="input-container">
            <p>Email</p>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="rounded-input"
            />
          </div>
          <div className="input-container">
            <p>Senha</p>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="rounded-input"
            />
          </div>
          <div className="input-container">
            <p>Confirmar senha</p>
            <input
              type="password"
              id="passwordConfirmation"
              ref={passwordConfirmationRef}
              className="rounded-input"
            />
          </div>
          <div className="input-container">
            <p>Nome</p>
            <input
              type="name"
              id="name"
              ref={nameRef}
              className="rounded-input"
            />
          </div>
          <form>
            <div className="grupo-container">
              <div>
                <p>CPF</p>
                <input
                  type="number"
                  id="cpf"
                  className="cpf-input"
                  ref={cpfRef}
                />
              </div>
              <div>
                <p>Grupo</p>
                <select name="grupo" className="select" ref={groupRef}>
                  <option value="">---</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="ESTOQUISTA">ESTOQUISTA</option>
                </select>
              </div>
            </div>
          </form>
          <div className="entrar-button">
            <button type="button" onClick={handleRegister}>
              <p>Cadastrar</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
