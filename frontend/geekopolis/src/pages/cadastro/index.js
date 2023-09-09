import './index.css'
import * as React from 'react';
import { Navigate } from "react-router-dom";
import Aside from '../../components/aside';

function Cadastro(){
    return(
        <>
            <Aside />
            <div className="cadastro-form">
                <div className='Inputs'>
                    <div className="input-container">
                        <p>Email</p>
                        <input
                            type="email"
                            id="email"
                            className="rounded-input"
                        />
                    </div>
                    <div className="input-container">
                        <p>Senha</p>
                        <input
                            type="password"
                            id="password"
                            className="rounded-input"
                        />
                    </div>
                    <div className="input-container">
                        <p>Confirmar senha</p>
                        <input
                            type="password"
                            id="password"
                            className="rounded-input"
                        />
                    </div>
                    <div className="input-container">
                        <p>Nome</p>
                        <input
                            type="name"
                            id="name"
                            className="rounded-input"
                        />
                    </div>
                    <form>
                    <div className="grupo-container">
                        <div>
                            <p>Cpf</p>
                            <input
                                type='number'
                                id="cpf"
                                className="cpf-input"
                            />
                        </div>
                        <div>
                        <p>Grupo</p>
                        <select name="grupo" className="select">
                            <option value="">---</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="ESTOQUISTA">ESTOQUISTA</option>
                        </select>
                        </div>
                    </div>
                    </form>
                    <div className='entrar-button'>
                        <button type="button">
                            <p>Entrar</p>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastro;