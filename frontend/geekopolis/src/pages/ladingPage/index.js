/* eslint-disable react/jsx-boolean-value */
import './index.css'
import * as React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imag from '../../assets/img/produtos/img-super-man.jpg';
import xavier from '../../assets/img/produtos/xavier.jfif';
import imag2 from '../../assets/img/produtos/funko1.jfif';
import imag3 from '../../assets/img/produtos/funko2.jfif';
import imag4 from '../../assets/img/produtos/funko3.jfif';
import Carousel from '../../components/Carousel';



function LadingPage () {
    const [body, setBody] = React.useState({
        nome: '',
        avaliacao: 0,
        descricao: '',
        preco: 0, 
        qtdEstoque: 0, 
        imagesPath: [
            imag,
            xavier,
            imag2,
            imag3,
            imag4
        ],
        categoriaId: 0,
        status: false,
      });
    return(
        <>
            <div className='tudo'>
                <h3 className='categoria'>Categoria</h3>
                <div className='carousel'>
                    <Carousel/>
                </div>
                <h3 className='categoria'>Categoria</h3>
                <div className='carousel'>
                    <Carousel/>
                </div>
                <h3 className='categoria'>Categoria</h3>
                <div className='carousel'>
                    <Carousel/>
                </div>
            </div>
        </>
    )
}

export default LadingPage;