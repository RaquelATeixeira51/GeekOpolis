/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import './index.css';
import makeToast from '../../shared/toaster';
import lixeiraIcon from '../../assets/img/icons/lixeira-de-reciclagem.png';
import Aside from '../../components/aside-client';

export default function EditarEndereco() {
  const [enderecos, setEnderecos] = useState([]);

  const [novoEndereco, setNovoEndereco] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    fetch(
      `http://localhost:8080/endereco/adicionaEndereco/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoEndereco),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.ok) {
          makeToast('success', 'Endereço cadastrado!');
          setNovoEndereco({
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
          return response.text();
        }
        makeToast('error', response.message);
        return null;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCEP = (e) => {
    const newCEP = e.target.value;

    fetch(`https://viacep.com.br/ws/${newCEP}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          console.error('CEP não encontrado');
        } else {
          setNovoEndereco({
            ...novoEndereco,
            logradouro: data.logradouro,
            bairro: data.bairro,
            complemento: data.complemento,
            cidade: data.localidade,
            uf: data.uf,
            cep: newCEP,
          });
        }
      })
      .catch((error) => {
        makeToast('error', 'Cep inválido!');
      });
  };

  useEffect(() => {
    fetch(
      `http://localhost:8080/endereco/buscaEnderecosPorCliente/token/${localStorage.getItem(
        'token-cliente'
      )}`,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Nâo há endereços cadastrados');
        return null;
      })
      .then((data) => {
        if (data) {
          setEnderecos(data);
        } else {
          makeToast('error', 'Nâo há endereços cadastrados');
        }
      })
      .catch((err) => {
        makeToast('error', err);
      });
  }, []);

  const editaPrincipal = (address) => {
    fetch(
      `http://localhost:8080/endereco/atualizaPrincipal/idEndereco/${
        address.id
      }/token/${localStorage.getItem('token-cliente')}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
  };

  const inativaEndereco = (address) => {
    fetch(
      `http://localhost:8080/endereco/inativarEndereco/idEndereco/${
        address.id
      }/token/${localStorage.getItem('token-cliente')}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
  };

  return (
    <>
      <Aside />
      <Header />
      <div className="tudo-endereco">
        <div className="fundo-endereco">
          <div className="tabela-endereco">
            <div className="botoes-endereco">
              {enderecos.map((address, index) => (
                <button type="button" className="botao-endereco" key={index}>
                  <div className="botoes-label">
                    <input
                      type="radio"
                      id={`endereco-${index}`}
                      name="enderecoEntrega"
                      value={`endereco-${index}`}
                      onChange={() => editaPrincipal(address)}
                      checked={address.principal}
                    />
                    <label htmlFor={`endereco-${index}`}>
                      Endereço Principal
                    </label>
                  </div>
                  <p>{address.logradouro}</p>
                  <div className="onClickImg">
                    <img
                      src={lixeiraIcon}
                      alt="Excluir"
                      className="lixeira-icon"
                      onClick={() => inativaEndereco(address)}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="dados-endereco">
            <h2 className="h2-endereco">Cadastro de Endereço</h2>
            <form className="form-endereco">
              <label htmlFor="cep" className="label-endereco">
                CEP
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={novoEndereco.cep}
                onChange={handleChange}
                onBlur={handleCEP}
                required
                className="input-endereco"
              />

              <label htmlFor="rua" className="label-endereco">
                Nome da Rua
              </label>
              <input
                type="text"
                id="rua"
                name="rua"
                value={novoEndereco.logradouro}
                onChange={handleChange}
                required
                className="input-endereco"
              />
              <div className="numero-endereco">
                <div className="inout-group">
                  <label htmlFor="numero" className="label2-endereco">
                    Número
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={novoEndereco.numero}
                    onChange={handleChange}
                    required
                    className="input2-endereco"
                  />
                </div>
                <div className="inout-group">
                  <label htmlFor="complemento" className="label2-endereco">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={novoEndereco.complemento}
                    onChange={handleChange}
                    className="input2-endereco"
                  />
                </div>
              </div>

              <label htmlFor="bairro" className="label-endereco">
                Bairro
              </label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={novoEndereco.bairro}
                onChange={handleChange}
                required
                className="input-endereco"
              />

              <label htmlFor="cidade" className="label-endereco">
                Cidade
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={novoEndereco.cidade}
                onChange={handleChange}
                required
                className="input-endereco"
              />

              <label htmlFor="estado" className="label-endereco">
                Estado
              </label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={novoEndereco.uf}
                onChange={handleChange}
                required
                className="input-endereco"
              />
              <button
                type="submit"
                className="botao-adicionar"
                id="botao-endereco"
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
