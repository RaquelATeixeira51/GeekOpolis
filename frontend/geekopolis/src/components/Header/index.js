import React from 'react';
import './index.css';
import '../../assets/css/reset.css';
import logo from '../../assets/img/GeekOpolisLogo.png'
import Login from '../../pages/login';

function Header(){
    return(
        <div className='header'>
            <img src={logo}/>
            <div className='opcoes'>
                <h3>Inicio</h3>
                <h3>Cadastro</h3>
                <h3>Lista Usuarios</h3>
            </div>
        </div>
    )
}

export default Header;