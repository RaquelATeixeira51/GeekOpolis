import * as React from 'react';
import cartUtils from "../../methods";
import makeToast from '../../shared/toaster';

export default function Carrinho() {

    const checkoutURL = 'http://localhost:8080/pedido/criaPedido/token/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXF1ZWx0ZWl4ZWlyYTUwN0BnbWFpbC5jb20iLCJpYXQiOjE2OTg5NTY4MTgsImV4cCI6MTY5OTgyMDgxOH0.QsU_1jnSHJ7wm_QOSgvROEdYDCLRSprzAiBGBQuB73Q';

    const produto = {
        produto: {
            nome: "short do naruto",
            preco: 67.8,
            img: "teste.com",
            id: 1
        },
        quantidade: 5
    }

    const frete = {
        tipo: 0,
        valor: 12.6
    }


    const checkout = () => {
        cartUtils.adicionaProdutoAoCarrinho(produto);
        cartUtils.adicionarFrete(frete);
        cartUtils.adicionarEnderecoId(1);
        cartUtils.adicionarMetodoDePagamento(0);
        cartUtils.calcularEAtualizarTotal();
    
        cartUtils.checkout(checkoutURL)
            .then((response) => {
                cartUtils.initializeCart();
                makeToast('success', response);
            })
            .catch((error) => {
                cartUtils.initializeCart();
                makeToast('error', error);
            });
    }

    return(
        <div>
            <button type="button" onClick={checkout}>checkout</button>
        </div>
    );
}