const cartUtils = {
  initializeCart: () => {
    const initialCart = {
      produtos: [],
      frete: {},
      enderecoId: 0,
      metodoDePagamento: 0,
      total: 0.0,
    };
    localStorage.setItem('carrinho', JSON.stringify(initialCart));
  },

  adicionaProdutoAoCarrinho: (produto) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();

    const { produtos } = cart;

    const produtoExiste = produtos.find(
      (item) => item.produto.id === produto.produto.id
    );

    if (produtoExiste) {
      produtoExiste.quantidade += produto.quantidade;
    } else {
      produtos.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(cart));
  },
  removerProdutoDoCarrinho: (produto) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    const { produtos } = cart;

    const produtoExiste = produtos.find(
      (item) => item.produto.id === produto.produto.id
    );

    if (produtoExiste) {
      if (produtoExiste.quantidade > 1) {
        produtoExiste.quantidade -= 1;
      } else {
        const index = produtos.indexOf(produtoExiste);
        if (index !== -1) {
          produtos.splice(index, 1);
        }
      }

      localStorage.setItem('carrinho', JSON.stringify(cart));
    }
  },
  deletarProdutoDoCarrinho: (produto) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    const { produtos } = cart;

    const produtoExiste = produtos.find(
      (item) => item.produto.id === produto.produto.id
    );

    if (produtoExiste) {
      const index = produtos.indexOf(produtoExiste);
      if (index !== -1) {
        produtos.splice(index, 1);
      }

      localStorage.setItem('carrinho', JSON.stringify(cart));
    }
  },
  adicionarFrete: (frete) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    cart.frete = frete;
    localStorage.setItem('carrinho', JSON.stringify(cart));
  },
  adicionarEnderecoId: (enderecoId) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    cart.enderecoId = enderecoId;
    localStorage.setItem('carrinho', JSON.stringify(cart));
  },
  adicionarMetodoDePagamento: (metodoDePagamento) => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    cart.metodoDePagamento = metodoDePagamento;
    localStorage.setItem('carrinho', JSON.stringify(cart));
  },
  calcularEAtualizarTotal: () => {
    const cart =
      JSON.parse(localStorage.getItem('carrinho')) ||
      cartUtils.initializeCart();
    const { produtos, frete } = cart;

    let total = 0.0;

    produtos.forEach((produto) => {
      const totalProduto =
        Number(produto.produto.preco) * Number(produto.quantidade);
      total += Number(totalProduto);
    });

    total += Number(frete.valor) || 0;

    cart.total = total;
    localStorage.setItem('carrinho', JSON.stringify(cart));
  },
  checkout: async (url) => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));

    if (!cart) {
      throw new Error('O carrinho está vazio.');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    });

    if (!response.ok) {
      throw new Error(
        `Erro na solicitação: ${response.status} - ${response.statusText}`
      );
    }

    const responseData = await response.json();

    cartUtils.initializeCart();

    return responseData;
  },
};

export default cartUtils;
