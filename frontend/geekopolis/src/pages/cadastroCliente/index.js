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

export default function CadastroCliente() {
  const [step, setStep] = React.useState(1);
  const [nomeCompleto, setNomeCompleto] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [dataNascimento, setDataNascimento] = React.useState(null);
  const [genero, setGenero] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmaSenha, setConfirmaSenha] = React.useState('');
  const [cepFaturamento, setCepFaturamento] = React.useState('');
  const [logradouroFaturamento, setLogradouroFaturamento] = React.useState('');
  const [numeroFatuamento, setNumeroFaturamento] = React.useState('');
  const [bairroFatuamento, setBairroFatuamento] = React.useState('');
  const [complementoFatuamento, setComplementoFatuamento] = React.useState('');
  const [cidadeFatuamento, setCidadeFatuamento] = React.useState('');
  const [estadoFatuamento, setEstadoFatuamento] = React.useState('');
  const [enderecosEntrega, setEnderecosEntrega] = React.useState([]);
  const [mostrarPergunta, setMostrarPergunta] = React.useState(true);
  const [mostrarModalEndereco, setMostrarModalEndereco] = React.useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = React.useState(0);
  const [redirect, setRedirect] = React.useState('');
  const [enderecos, setEnderecos] = React.useState([]);

  const [newAddress, setNewAddress] = React.useState({
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    cidade: '',
    uf: '',
    enderecoFaturamento: false,
    cep: '',
    principal: false,
    ativo: true,
  });

  const enderecoFaturamento = {
    logradouro: logradouroFaturamento,
    numero: numeroFatuamento,
    bairro: bairroFatuamento,
    complemento: complementoFatuamento,
    cidade: cidadeFatuamento,
    uf: estadoFatuamento,
    enderecoFaturamento: true,
    cep: cepFaturamento,
    principal: false,
    ativo: true,
  };

  const abreModal = () => {
    setMostrarModalEndereco(true);
    document.querySelector('.cadastroCliente-tudo').classList.add('modal-open');
  };

  const fechaModal = () => {
    setMostrarModalEndereco(false);
    document
      .querySelector('.cadastroCliente-tudo')
      .classList.remove('modal-open');
  };

  const adicionaEndereco = () => {
    if (enderecosEntrega.length <= 0) {
      const newAddressPrincipal = {
        logradouro: newAddress.logradouro,
        numero: newAddress.numero,
        bairro: newAddress.bairro,
        complemento: newAddress.complemento,
        cidade: newAddress.cidade,
        uf: newAddress.cidade,
        enderecoFaturamento: false,
        cep: newAddress.cep,
        principal: true,
        ativo: true,
      };
      setEnderecosEntrega([...enderecosEntrega, newAddressPrincipal]);
    } else {
      setEnderecosEntrega([...enderecosEntrega, newAddress]);
    }

    setNewAddress({
      logradouro: '',
      numero: '',
      bairro: '',
      complemento: '',
      cidade: '',
      uf: '',
      cep: '',
      enderecoFaturamento: false,
      ativo: true,
    });

    fechaModal();
  };

  const handleCEPChangeFaturamento = (e) => {
    const newCEP = e.target.value;

    fetch(`https://viacep.com.br/ws/${newCEP}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          console.error('CEP não encontrado');
        } else {
          setLogradouroFaturamento(data.logradouro);
          setBairroFatuamento(data.bairro);
          setComplementoFatuamento(data.complemento);
          setCidadeFatuamento(data.localidade);
          setEstadoFatuamento(data.uf);
        }
      })
      .catch((error) => {
        makeToast('error', 'Cep inválido!');
      });

    setCepFaturamento(newCEP);
  };

  const validateNomeCompleto = (nome) => {
    const palavras = nome.split(' ');
    if (
      palavras.length >= 2 &&
      palavras.every((palavra) => palavra.length >= 2)
    ) {
      return true;
    }
    return false;
  };

  const nextStep = () => {
    if (step === 1) {
      if (!validateNomeCompleto(nomeCompleto)) {
        makeToast('error', 'Digite seu nome completo');
        return;
      }

      if (!validateCPF(cpf)) {
        makeToast('error', 'CPF inválido!');
        return;
      }

      if (senha !== confirmaSenha) {
        makeToast('error', 'Senhas não são iguais!');
        return;
      }
    }

    if (step === 2) {
      if (cepFaturamento === '') {
        makeToast('error', 'Digite um cep!');
        return;
      }

      if (numeroFatuamento === '') {
        makeToast('error', 'Digite um número!');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    if (!validateNomeCompleto(nomeCompleto)) {
      makeToast('error', 'Digite seu nome completo!');
      return;
    }

    if (!validateCPF(cpf)) {
      makeToast('error', 'CPF inválido!');
      return;
    }

    if (senha !== confirmaSenha) {
      makeToast('error', 'Senhas não são iguais!');
      return;
    }

    const updatedEnderecos = [...enderecos, enderecoFaturamento];

    const enderecosEntregaData = enderecosEntrega.map((enderecoEntrega) => ({
      logradouro: enderecoEntrega.logradouro,
      numero: enderecoEntrega.numero,
      bairro: enderecoEntrega.bairro,
      complemento: enderecoEntrega.complemento,
      cidade: enderecoEntrega.cidade,
      uf: enderecoEntrega.uf,
      cep: enderecoEntrega.cep,
      enderecoFaturamento: false,
      principal: enderecoEntrega.principal,
      ativo: true,
    }));

    const updatedEnderecosComEntrega = [
      ...updatedEnderecos,
      ...enderecosEntregaData,
    ];

    fetch(`http://localhost:8080/cliente/incluiCliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nomeCompleto: nomeCompleto,
        email: email,
        senha: senha,
        genero: genero,
        cpf: cpf,
        dataNascimento: dataNascimento,
        enderecos: updatedEnderecosComEntrega,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          setRedirect('/loginCliente');
          return response.json();
        }

        makeToast('error', response.message);
        return null;
      })
      .catch((error) => {
        console.log(error.message);
        setRedirect('/loginCliente');
      });
    event.preventDefault();
  };

  const copyFaturamentoToEntrega = () => {
    if (cepFaturamento === '') {
      makeToast('error', 'Digite um CEP antes de copiar.');
      return;
    }

    const novoEnderecoEntrega = {
      logradouro: logradouroFaturamento,
      numero: numeroFatuamento,
      bairro: bairroFatuamento,
      complemento: complementoFatuamento,
      cidade: cidadeFatuamento,
      uf: estadoFatuamento,
      enderecoFaturamento: false,
      cep: cepFaturamento,
      principal: true,
      ativo: true,
    };
    setEnderecosEntrega([...enderecosEntrega, novoEnderecoEntrega]);
  };

  const handleSimClick = () => {
    setMostrarPergunta(false);
    copyFaturamentoToEntrega();
  };

  const handleNaoClick = () => {
    setMostrarPergunta(false);
    abreModal();
  };

  const fetchCEPDataForModal = (newCEP) => {
    fetch(`https://viacep.com.br/ws/${newCEP}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          console.error('CEP não encontrado');
        } else {
          setNewAddress((prevAddress) => ({
            ...prevAddress,
            logradouro: data.logradouro,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.localidade,
            uf: data.uf,
          }));
        }
      })
      .catch((error) => {
        makeToast('error', 'Cep inválido!');
      });
  };

  const handleEnderecoPrincipalChange = (index) => {
    const updatedEnderecosEntrega = enderecosEntrega.map((endereco, i) => {
      if (i === index) {
        return {
          ...endereco,
          principal: true,
        };
      }
      return {
        ...endereco,
        principal: false,
      };
    });

    setEnderecosEntrega(updatedEnderecosEntrega);
    setEnderecoSelecionado(index);
  };

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <div className="cadastroCliente-tudo">
        <div className="quadrado-centralizado">
          {step === 1 && (
            <>
              <h2>Informações principais</h2>

              <p>Nome completo</p>
              <input
                type="text"
                className="cadastroCliente-input"
                placeholder="Jonh Doe"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
              />

              <p>CPF</p>
              <input
                type="text"
                className="cadastroCliente-input"
                placeholder="Digite apenas números"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <p>Data de nascimeto</p>
              <DatePicker
                selected={dataNascimento}
                onChange={(date) => setDataNascimento(date)}
                dateFormat="yyyy-MM-dd"
                className="cadastroCliente-input"
                placeholderText="Selecione a data"
                isClearable
              />

              <p>Gênero</p>
              <select
                className="cadastroCliente-input"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Selecione o gênero</option>
                <option value="FEMININO">FEMININO</option>
                <option value="MASCULINO">MASCULINO</option>
              </select>

              <p>Email</p>
              <input
                type="email"
                className="cadastroCliente-input"
                placeholder="JonhDoe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <p>Senha</p>
              <input
                type="password"
                className="cadastroCliente-input"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <p>Confirme a senha</p>
              <input
                type="password"
                className="cadastroCliente-input"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </>
          )}
          {step === 2 && (
            <>
              <h2>Endereço de faturamento</h2>
              <div className="campo-faturamento">
                <div className="campo">
                  <p>CEP</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Digite apenas números"
                    value={cepFaturamento}
                    onChange={(e) => setCepFaturamento(e.target.value)}
                    onBlur={handleCEPChangeFaturamento}
                  />
                </div>

                <div className="campo">
                  <p>Logradouro</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Rua dos bobos"
                    value={logradouroFaturamento}
                    onChange={(e) => setLogradouroFaturamento(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Número</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="0"
                    value={numeroFatuamento}
                    onChange={(e) => setNumeroFaturamento(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Bairro</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="jd das flores"
                    value={bairroFatuamento}
                    onChange={(e) => setBairroFatuamento(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Complemento</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="casa 1"
                    value={complementoFatuamento}
                    onChange={(e) => setComplementoFatuamento(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Cidade</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Sao Paulo"
                    value={cidadeFatuamento}
                    onChange={(e) => setCidadeFatuamento(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Estado</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="SP"
                    value={estadoFatuamento}
                    onChange={(e) => setEstadoFatuamento(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          {step === 3 && mostrarPergunta ? (
            <div>
              <h2>Endereço de entrega</h2>
              <p>Deseja utilizar o mesmo Endereço de faturamento?</p>
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={handleSimClick}
              >
                Sim
              </button>
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={handleNaoClick}
              >
                Não
              </button>
            </div>
          ) : step === 3 ? (
            <div>
              <h2>Endereços</h2>
              {enderecosEntrega.map((endereco, index) => (
                <div
                  key={index}
                  className={`endereco-card ${
                    index === enderecoSelecionado
                      ? 'endereco-card-selected'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    id={`endereco-${index}`}
                    name="enderecoEntrega"
                    value={`endereco-${index}`}
                    onChange={() => handleEnderecoPrincipalChange(index)}
                    checked={index === enderecoSelecionado}
                  />
                  <label htmlFor={`endereco-${index}`}>
                    Endereço Principal
                  </label>
                  <p>Logradouro: {endereco.logradouro}</p>
                  <p>Número: {endereco.numero}</p>
                  <p>Bairro: {endereco.bairro}</p>
                  <p>Complemento: {endereco.complemento}</p>
                  <p>Cidade: {endereco.cidade}</p>
                  <p>Estado: {endereco.uf}</p>
                </div>
              ))}
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={abreModal}
              >
                Adicionar novo endereço
              </button>
            </div>
          ) : null}
          {mostrarModalEndereco && (
            <div className="address-modal">
              <h2>Novo Endereço</h2>
              <div className="campo-faturamento">
                <div className="campo">
                  <p>CEP</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Digite apenas números"
                    value={newAddress.cep}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, cep: e.target.value })
                    }
                    onBlur={(e) => fetchCEPDataForModal(e.target.value)}
                  />
                </div>

                <div className="campo">
                  <p>Logradouro</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Rua dos bobos"
                    value={newAddress.logradouro}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        logradouro: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="campo">
                  <p>Número</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="0"
                    value={newAddress.numero}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, numero: e.target.value })
                    }
                  />
                </div>

                <div className="campo">
                  <p>Bairro</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="jd das flores"
                    value={newAddress.bairro}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, bairro: e.target.value })
                    }
                  />
                </div>

                <div className="campo">
                  <p>Complemento</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="casa 1"
                    value={newAddress.complemento}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        complemento: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="campo">
                  <p>Cidade</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="Sao Paulo"
                    value={newAddress.cidade}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, cidade: e.target.value })
                    }
                  />
                </div>

                <div className="campo">
                  <p>Estado</p>
                  <input
                    type="text"
                    className="cadastroCliente-input"
                    placeholder="SP"
                    value={newAddress.uf}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, uf: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={adicionaEndereco}
              >
                Adicionar
              </button>
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={fechaModal}
              >
                Cancelar
              </button>
            </div>
          )}
          <div className="button-container">
            {step > 1 && (
              <button
                type="button"
                className="cadastroCliente-button"
                onClick={prevStep}
              >
                Voltar
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="cadastroCliente-button"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                className="cadastroCliente-button"
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
