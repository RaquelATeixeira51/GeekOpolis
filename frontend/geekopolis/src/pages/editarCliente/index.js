/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-debugger */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { validate as validateCPF } from 'gerador-validador-cpf';
import { Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../../components/Header';
import './index.css';
import makeToast from '../../shared/toaster';
import Aside from '../../components/aside-client';

export default function Cliente() {
  const [nomeCompleto, setNomeCompleto] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmeSenha, setConfirmeSenha] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState(null);
  const [genero, setGenero] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [redirect, setRedirect] = React.useState('');

  React.useEffect(() => {
    fetch(
      `http://localhost:8080/cliente/buscaClienteByToken/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 500) {
          makeToast('error', 'Token expirado');
          setRedirect('/loginCliente');
        }
        setNomeCompleto(response.nomeCompleto);
        setCpf(response.cpf);
        setDataNascimento(new Date(response.dataNascimento));
        setGenero(response.genero);
        setEmail(response.email);
      })
      .catch((error) => {
        console.log(error.message);
        setRedirect('/cliente');
      });
  }, []);

  const validateNomeCompleto = (nome) => {
    const palavras = nome.split(' ');
    if (
      palavras.length >= 2 &&
      palavras.every((palavra) => palavra.length >= 3)
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    if (!validateNomeCompleto(nomeCompleto)) {
      makeToast('error', 'Digite um nome válido!');
      return;
    }

    if (!validateCPF(cpf)) {
      makeToast('error', 'CPF inválido!');
      return;
    }

    if (senha && senha !== confirmeSenha) {
      makeToast('error', 'Senhas diferentes!');
      return;
    }

    fetch(
      `http://localhost:8080/cliente/atualiza/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          nomeCompleto: nomeCompleto,
          genero: genero,
          dataNascimento: dataNascimento,
          senha: senha || null,
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          window.location.reload();
          return response.json();
        }

        makeToast('error', response.message);
        return null;
      })
      .catch((error) => {
        console.log(error.message);
        window.location.reload();
      });
    event.preventDefault();
  };

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Aside />
      <Header />
      <div className="editarCliente-tudo">
        <div className="editarCliente-quadrado-centralizado">
          <h2>Meu perfil</h2>

          <div className="editarCliente-row">
            <div>
              <p>Email:</p>
              <p>{email}</p>
            </div>
            <div>
              <p>CPF:</p>
              <p>{cpf}</p>
            </div>
          </div>

          <p>Nome completo:</p>
          <input
            type="text"
            className="editarCliente-input"
            placeholder="Jonh Doe"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
          />

          <p>Data de nascimeto:</p>
          <DatePicker
            selected={dataNascimento}
            onChange={(date) => setDataNascimento(date)}
            dateFormat="yyyy-MM-dd"
            className="editarCliente-input"
            placeholderText="Selecione a data"
            isClearable
          />

          <p>Gênero:</p>
          <select
            className="editarCliente-input"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="">Selecione o gênero</option>
            <option value="FEMININO">FEMININO</option>
            <option value="MASCULINO">MASCULINO</option>
          </select>

          <div>
            <p>Senha:</p>
            <input
              type="password"
              className="editarCliente-input"
              placeholder="******"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <p>Confirme a Senha:</p>
            <input
              type="password"
              className="editarCliente-input"
              placeholder="******"
              value={confirmeSenha}
              onChange={(e) => setConfirmeSenha(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            className="editarCliente-button"
            onClick={handleSubmit}
          >
            Editar
          </button>
        </div>
      </div>
    </>
  );
}
