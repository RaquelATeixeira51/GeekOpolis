import * as React from 'react';
import './index.css';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import Casa from '../../assets/img/icons/casinha.png';
import Bone from '../../assets/img/icons/bone.png';
import Cabide from '../../assets/img/icons/cabide.png'; 
import Caneca from '../../assets/img/icons/caneca.png'; 
import Carrinho from '../../assets/img/icons/carrinho.png'; 
import Sair from '../../assets/img/icons/sair.png'; 

function Header() {

  return (
    <div className="header">
        <img className='logo' src={Logo} alt="Logo"/>
        <div className='categorias'>
            <img className='casaImg' src={Casa} alt='Home'/>
            <p className='Home'>Inicio</p>
            <img className='canecaImg' src={Caneca} alt='Caneca'/>
            <p className='Canecas'>Canecas</p>
            <img className='cabideImg' src={Cabide} alt='Cabide'/>
            <p className='Roupas'>Roupas</p>
            <img className='boneImg' src={Bone} alt='Bone'/>
            <p className='Acessorios'>Acessórios</p>
        </div>
        <img className='Carrinho' src={Carrinho} alt='Carrinho'/>
        <p className='Sair'>Sair</p>
        <img className='sairImg' src={Sair} alt='Sair'/>
    </div>
  );  
};
export default Header;