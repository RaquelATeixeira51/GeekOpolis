import * as React from 'react';
import Aside from '../../components/aside';
import './index.css';
import LogoutIcon from '../../assets/img/icons/Editar-icon.png';

export default function ListaUsuarios(){
    return(
        <>
            <Aside />
            <div className='container'>
                <div className='fundo'>
                    <div className='filtro'>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="filtrar nome"
                            className="inserir"
                        />
                        <button type="button" className='botao-Filtro'>
                            <p>Filtrar</p>
                        </button>
                        <div className='adicionar-Usuario'>
                            <h2>Adicionar usuário</h2>
                        </div>
                        <button type="button" className='botao-adicionar'>
                                <p>+</p>
                        </button>
                    </div>
                    <table className='request-table'>
                        <thead className='lista'>
                            <th>Nome</th>
                            <th>e-mail</th>
                            <th>CPF</th>
                            <th>Grupo</th>
                            <th>Status</th>
                            <th>Editar</th>
                        </thead>
                    </table>
                    <tbody className='user-list'>
                        <tr className="coluns">
                            <td className="user-data">Raul souza</td>
                            <td className="user-data">Raul@gmail.com</td>
                            <td className="user-data">123.456.789.01</td>
                            <td className="user-data">estoquista</td>
                             <td className="user-data">
                                <button type='button' className='status'>
                                    Ativo
                                </button>
                            </td>
                            <td className="user-edit">
                                <img src={LogoutIcon} alt="GeekOpolis Logout Icon" id='edit'/>
                            </td>
                        </tr>
                    </tbody>
                </div>
            </div>
        </>
    )
}