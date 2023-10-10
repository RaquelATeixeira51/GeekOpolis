package com.senac.geekOpolis.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.Endereco;
import com.senac.geekOpolis.repository.ClienteRepository;
import com.senac.geekOpolis.repository.EnderecoRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ClienteService {
    
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public boolean salvaCliente(Cliente cliente) {
        if(clienteRepository.findByEmail(cliente.getEmail()) != null) {
            return false;
        }
    
        if(clienteRepository.findByCpf(cliente.getCpf()) != null) {
            return false;
        }
    
        String senha = encriptSenha(cliente);
        cliente.setSenha(senha);
    
        for (Endereco e : cliente.getEnderecos()) {
            e.setCliente(cliente);
        }
    
        clienteRepository.save(cliente);
    
        return true;
    }

    public String encriptSenha(Cliente cliente) {
        String encryptedPassword = bCryptPasswordEncoder.encode(cliente.getSenha());
        cliente.setSenha(encryptedPassword);

        return cliente.getSenha();
    }
}
