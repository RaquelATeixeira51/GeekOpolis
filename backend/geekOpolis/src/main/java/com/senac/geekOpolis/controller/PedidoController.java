package com.senac.geekOpolis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> incluiPedido(@PathVariable String token, @RequestBody PedidoDto pedidoDto){
        String code = pedidoService.incluiPedido(token, pedidoDto);
        if(code != null) {
            return new ResponseEntity<>(code, HttpStatus.CREATED);
        }
        return new ResponseEntity<String>("Nâo foi possível criar o pedido", HttpStatus.BAD_REQUEST);
    }
}
