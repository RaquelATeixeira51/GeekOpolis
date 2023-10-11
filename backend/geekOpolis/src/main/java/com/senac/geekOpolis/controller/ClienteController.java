package com.senac.geekOpolis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.ClienteLoginDto;
import com.senac.geekOpolis.service.ClienteService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class ClienteController {
    private final ClienteService clienteService;

    @PostMapping("cliente/incluiCliente")
    public ResponseEntity<String> incluiCliente(@RequestBody Cliente cliente) {
        Boolean criado = clienteService.salvaCliente(cliente);
        if(criado) {
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível criar um cliente");
        }
    }
     @PostMapping("cliente/login")
    public ResponseEntity<String> login(@RequestBody ClienteLoginDto clienteLoginDto) {
        return clienteService.login(clienteLoginDto);
    }
}
