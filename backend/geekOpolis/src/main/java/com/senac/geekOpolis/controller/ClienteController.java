package com.senac.geekOpolis.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.ClienteDto;
import com.senac.geekOpolis.models.ClienteLoginDto;
import com.senac.geekOpolis.models.Endereco;
import com.senac.geekOpolis.repository.ClienteRepository;
import com.senac.geekOpolis.repository.EnderecoRepository;
import com.senac.geekOpolis.service.ClienteService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class ClienteController {
    private final ClienteService clienteService;
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;

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

    @PutMapping("cliente/atualiza/token/{token}")
    public ResponseEntity<String> atualizaCliente(@PathVariable String token, @RequestBody Cliente cliente) {
        Cliente c = clienteService.atualizaCliente(token,cliente);

        if(c != null) {
            clienteRepository.save(c);
            return ResponseEntity.ok("Cliente atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não foi possível atualizar esse cliente");
    }

    @PutMapping("endereco/atualiza/idEndereco/{idEndereco}/token/{token}")
    public ResponseEntity<String> atualizaEndereço(@PathVariable Long idEndereco, @PathVariable String token, @RequestBody Endereco endereco) {
        
        Endereco e = clienteService.atualizaEnderecoPorId(token, idEndereco, endereco);
        if(e != null) {
            enderecoRepository.save(e);
            return ResponseEntity.ok("Endereço atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não foi possível atualizar esse endereço");
    }

    @PostMapping("endereco/adicionaEndereco/token/{token}")
    public ResponseEntity<String> adicionaEndereço(@PathVariable String token, @RequestBody Endereco endereco) {
        Endereco e = clienteService.adicionaNovoEndereco(token, endereco);
        if(e != null) {
             return new ResponseEntity<>("Created", HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Não é possível adicionar este endereço");
        }
    }

    @GetMapping("cliente/buscaClienteByToken/token/{token}")
    public ClienteDto buscaClientePorToken(@PathVariable String token) {
        ClienteDto cliente = clienteService.retornarInformacoesCliente(token);
        return cliente;
    }

    @GetMapping("endereco/buscaEnderecosPorCliente/token/{token}")
    public List<Endereco> buscaEnderecosPorCliente(@PathVariable String token) {
        return clienteService.buscaEnderecosPorCliente(token);
    }

    @GetMapping("endereco/buscaEnderecoClienteEEndereco/token/{token}/idEndereco/{idEndereco}")
    public Endereco buscaEndereco(@PathVariable String token, @PathVariable Long idEndereco) {
        return clienteService.buscaEnderecoPorClienteEId(token, idEndereco);
    }

    @PutMapping("endereco/atualizaPrincipal/idEndereco/{idEndereco}/token/{token}")
    public void atualizaPrincipal(@PathVariable Long idEndereco, @PathVariable String token){
        clienteService.atualizaPrincipal(token, idEndereco);
    }

    @PutMapping("endereco/inativarEndereco/idEndereco/{idEndereco}/token/{token}")
    public void inativarEndereco(@PathVariable Long idEndereco, @PathVariable String token) {
        clienteService.inativarEndereco(idEndereco, token);
    }
}
