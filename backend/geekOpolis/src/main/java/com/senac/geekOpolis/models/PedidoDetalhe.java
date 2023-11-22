package com.senac.geekOpolis.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDetalhe {
    private List<ProdutoPedidoQtDto> produtos;
    private Double valorFrete;
    private Double total;
    private Endereco endereco;
    private MetodoDePagamento metodoDePagamento;
}
