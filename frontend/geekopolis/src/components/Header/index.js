import React from 'react';
import './index.css';
import '../../assets/css/reset.css';
import logo from '../../assets/img/GeekOpolisLogo.png'
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className='header'>
            <img src={logo}/>
            <div className='opcoes'>
                <h3><Link to='/' className='Elementos'>Inicio</Link></h3>
                <h3><Link to='/CadastroUsuario' className='Elementos'>Cadastro</Link></h3>
                <h3><Link to='/CadastrarAdmin' className='Elementos'>CadastroAdmin</Link></h3>
            </div>
        </div>
    )
}

export default Header;