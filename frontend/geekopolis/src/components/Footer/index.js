/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import CutLogo from '../../assets/img/logo/GeekOpolisLogo-cutted.png';
import LogoutIcon from '../../assets/img/icons/logout-icon.png';
import UsersIcon from '../../assets/img/icons/users-icon.png';
import ProductsIcon from '../../assets/img/icons/products-icon.png';
import LoginIcon from '../../assets/img/icons/login-icon.png';
import ArrowIcon from '../../assets/img/icons/arrow-icon.png';
import makeToast from '../../shared/toaster';

export default function Footer() {
    return(
        <div className='fundo'>
             <img
                className="geekopolis-aside-logo"
                src={Logo}
                alt="GeekOpolis Logo"
            />
            <div className='Mia'>
                <h2>
                    HOMOSAPIENS SA - CNPJ 25.561.105/0001-40
                </h2>
                <h3>
                    Av. Eng. Eusébio Stevaux, 823 - Santo Amaro, São Paulo - SP, 04696-000
                </h3>
            </div>
            

            


        </div>

    )

}