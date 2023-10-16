/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Header from '../../components/Header';
import './index.css';
import Footer from '../../components/Footer';


export default function EditarEndereco() {

    const [endereco, setEndereco] = useState({
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEndereco((prevEndereco) => ({
          ...prevEndereco,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do endereço:', endereco);
      };
      
  return (
    <>
        <Header/>
        <div className='tudo-endereco'>
            <div className='fundo-endereco'>
                <div className='tabela-endereco'>
                    <div className='botoes-endereco'>
                        <button  type='button' className='botao-endereco'>
                            <p>cadastrar</p>
                        </button>
                        <button  type='button' className='botao-endereco'>
                            <p>endereco1</p>
                        </button>
                    </div>
                </div> 
                <div className='dados-endereco'>
                    <h2 className='h2-endereco'>Cadastro de Endereço</h2>
                    <form onSubmit={handleSubmit} className='form-endereco'>
                        <label htmlFor="cep" className='label-endereco'>CEP</label>
                        <input
                        type="text"
                        id="cep"
                        name="cep"
                        value={endereco.cep}
                        onChange={handleChange}
                        required
                        className='input-endereco'
                        />

                        <label htmlFor="rua" className='label-endereco'>Nome da Rua</label>
                        <input
                        type="text"
                        id="rua"
                        name="rua"
                        value={endereco.rua}
                        onChange={handleChange}
                        required
                        className='input-endereco'
                        />
                        <div className='numero-endereco'>
                            <div className='inout-group'>
                            <label htmlFor="numero" className='label2-endereco'>Número</label>
                            <input
                            type="text"
                            id="numero"
                            name="numero"
                            value={endereco.numero}
                            onChange={handleChange}
                            required
                            className='input2-endereco'
                            />
                            </div>
                            <div className='inout-group'>
                            <label htmlFor="complemento" className='label2-endereco'>Complemento</label>
                            <input
                            type="text"
                            id="complemento"
                            name="complemento"
                            value={endereco.complemento}
                            onChange={handleChange}
                            className='input2-endereco'
                            />
                            </div>
                        </div>

                        <label htmlFor="bairro" className='label-endereco'>Bairro</label>
                        <input
                        type="text"
                        id="bairro"
                        name="bairro"
                        value={endereco.bairro}
                        onChange={handleChange}
                        required
                        className='input-endereco'
                        />

                        <label htmlFor="cidade" className='label-endereco'>Cidade</label>
                        <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={endereco.cidade}
                        onChange={handleChange}
                        required
                        className='input-endereco'
                        />

                        <label htmlFor="estado" className='label-endereco'>Estado</label>
                        <input
                        type="text"
                        id="estado"
                        name="estado"
                        value={endereco.estado}
                        onChange={handleChange}
                        required
                        className='input-endereco'  
                        />
                        <button type="submit" className="botao-adicionar" id='botao-endereco'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}
