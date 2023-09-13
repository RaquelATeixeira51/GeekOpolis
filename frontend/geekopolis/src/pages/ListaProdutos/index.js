import React from 'react';
import './index.css';
import Carrinho from '../../assets/img/produtos/carrinho.png';
import avaliacao from '../../assets/img/produtos/avaliacao.png'
import Pix from '../../assets/img/produtos/pix.svg'


function ListaProdutos() {
  return (
    <div className="box">
      <div className="MODAL">
        <div className="overlap">
          <img className="pix" alt="Pix" src={Pix} />
          <p className="text-wrapper">3% OFF à vista no Pix</p>
          <p className="div">6x de R$ 31,65 sem juros</p>
          <div className="text-wrapper-2">R$ 120,00</div>
          <div className="text-wrapper-3">(104 Avaliações)</div>
          <div className="overlap-group">
            <img className="img-super-man" alt="Img super man" src="" />
          </div>
          <div className="funko-pop-super-man">Funko Pop - Super Man</div>
          <div className="text-wrapper-4">X</div>
          <div className="stars">
            <img className="star" alt="Star" src={avaliacao} />
          </div>
          <div className="adicionar-ao">
            <div className="overlap-2">
              <div className="rectangle" />
              <div className="adicionar-ao-2">Adicionar ao Carrinho</div>
              <img className="carrinho-carrinho" alt="Carrinho carrinho" src={Carrinho} />
              <div className="rectangle-2" />
            </div>
          </div>
          <div className="overlap-3">
            <div className="CEP">
              <div className="rectangle-3" />
              <div className="group">
                <div className="overlap-group-3">
                  <div className="rectangle-4" />
                  <div className="text-wrapper-5">Calcular</div>
                </div>
              </div>
            </div>
            <p className="frete-e-prazo-de">
              <span className="span">
                Frete e prazo de entrega
                <br />
                <br />
                CEP
                <br />
              </span>
              <span className="span">
                <br />
                <br />
                <br />
                FRETE GRÁTIS EM TODO BRASIL
                <br />
                Acima de R$ 189,90
              </span>
            </p>
          </div>
          <p className="DESCRI-o-DO-PRODUTO">
            DESCRIÇÃO DO PRODUTO
            <br />
            <br />
            Funko Pop Super Man
            <br />
            Acompanha base de acrílico
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListaProdutos;
