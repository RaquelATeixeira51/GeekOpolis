package com.senac.geekOpolis.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senac.geekOpolis.models.PedidoDto;
import com.senac.geekOpolis.service.PedidoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class PedidoController {
    private final PedidoService pedidoService;

    @PostMapping("pedido/criaPedido/token/{token}")
    public String incluiPedido(@PathVariable String token, @RequestBody PedidoDto pedidoDto){
        return pedidoService.incluiPedido(token, pedidoDto);
    }
}
