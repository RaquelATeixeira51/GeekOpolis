package com.senac.geekOpolis.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoRetorno {
    private String pedidoCode;
    private String dataDoPedido;
    private double total;
    private StatusPedido status;
}
