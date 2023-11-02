package com.senac.geekOpolis.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoPedidoQtDto {
    private ProdutoPedidoDto produto;
    private int quantidade;
}
