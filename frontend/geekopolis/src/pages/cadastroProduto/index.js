import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Aside from '../../components/aside';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import './index.css';
import LogoutIcon from '../../assets/img/icons/edit-icon.png';
import makeToast from '../../shared/toaster';

export default function CadastroProduto() {

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    const nomeRef = React.createRef();
    

    useEffect(() => {
        fetch(
          `http://localhost:8080/categoria/listaCategorias`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            makeToast('error', 'Erro ao carregar, tente novamente');
            return null;
          })
          .then((data) => {
            setCategorias(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    return (
        <>
            <Aside />
            <div className="login-form">
            <img
            src={Logo}
            className="geekopolis-login-logo"
            alt="Geekopolis logo"
            />
            <div className="input-container">
            <p>Nome do Produto</p>
            <input
                type="email"
                id="email"
                ref={nomeRef}
                className="rounded-input"
            />
             <div className="input-container">
            <p>Categoria</p>
            <select
                name="categoria"
                className="rounded-select"
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
            >
                 {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                </option>
                ))}
            </select>
            </div>
            </div>
            </div>
        </>
    )
}