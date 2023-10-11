package com.senac.geekOpolis.service;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.ClienteLoginDto;
import com.senac.geekOpolis.models.Endereco;
import com.senac.geekOpolis.repository.ClienteRepository;
import com.senac.geekOpolis.repository.EnderecoRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ClienteService {
    
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private static final String CHAVE_SECRETA = "jwt-geekOpolis-validation";

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

     public boolean validaLogin(ClienteLoginDto clienteLoginDto) {
        Cliente cliente = clienteRepository.findByEmail(clienteLoginDto.getEmail());

        if (cliente != null) {
            return bCryptPasswordEncoder.matches(clienteLoginDto.getSenha(), cliente.getSenha());
        } else {
            return false;
        }
    }

     public String gerarToken(ClienteLoginDto clienteLoginDto) {
        long agora = System.currentTimeMillis();
        long expiracao = agora + TimeUnit.MINUTES.toMillis(10);

        Cliente cliente = clienteRepository.findByEmail(clienteLoginDto.getEmail());

        return Jwts.builder()
                .setSubject(cliente.getEmail())
                .setIssuedAt(new Date(agora))
                .setExpiration(new Date(expiracao))
                .signWith(SignatureAlgorithm.HS256, CHAVE_SECRETA)
                .compact();
    }

    public ResponseEntity<String> login(ClienteLoginDto clienteLoginDto) {
        
        if(validaLogin(clienteLoginDto)) {
            return ResponseEntity.ok(gerarToken(clienteLoginDto));
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Cliente nao existe ou email ou senha errados");
        }
    }
}
