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
public class PedidoDto {
    private List<ProdutoPedidoQtDto> produtos;
    private Long enderecoId;
    private FreteDto frete;
    private MetodoDePagamento metodoDePagamento;
    private double total;
}
