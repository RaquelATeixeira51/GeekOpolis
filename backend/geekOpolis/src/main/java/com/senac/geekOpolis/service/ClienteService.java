package com.senac.geekOpolis.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Cliente;
import com.senac.geekOpolis.models.ClienteDto;
import com.senac.geekOpolis.models.ClienteLoginDto;
import com.senac.geekOpolis.models.Endereco;
import com.senac.geekOpolis.repository.ClienteRepository;
import com.senac.geekOpolis.repository.EnderecoRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
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
        long expiracao = agora + TimeUnit.DAYS.toMillis(10);

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

    public Cliente atualizaCliente(String token, Cliente cliente) {

        Cliente clienteToken = verificarUsuarioPorToken(token);
        Optional<Cliente> clienteById = clienteRepository.findById(clienteToken.getId());
        Cliente c = clienteById.get();

        if(!clienteToken.getEmail().equals(cliente.getEmail())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você não pode alterar este cliente");
        }

        if(clienteById.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este cliente não existe");
        } 

        if(cliente.getDataNascimento() != null) {
            c.setDataNascimento(cliente.getDataNascimento());
        }
        
        if(cliente.getGenero() != null) {
            c.setGenero(cliente.getGenero());
        }
      
        if(cliente.getNomeCompleto() != null) {
            c.setNomeCompleto(cliente.getNomeCompleto());
        }
        
        if (cliente.getSenha() != null) {
            String encryptedPassword = bCryptPasswordEncoder.encode(cliente.getSenha());
            c.setSenha(encryptedPassword);
        }
        return c;
    }

    public Endereco atualizaEnderecoPorId(String token, Long idEndereco, Endereco novoEndereco) {
        Cliente clienteToken = verificarUsuarioPorToken(token);
        Optional<Cliente> clienteOptional = clienteRepository.findById(clienteToken.getId());

        if (clienteOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }

        Cliente cliente = clienteOptional.get();

        if (!clienteToken.getEmail().equals(cliente.getEmail())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você não pode alterar o endereço deste cliente");
        }

        Optional<Endereco> enderecoOptional = enderecoRepository.findById(idEndereco);

        if (enderecoOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Endereço não encontrado");
        }

        Endereco endereco = enderecoOptional.get();


        if (endereco.isEnderecoFaturamento()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Endereço de faturamento");
        }

 
        if (novoEndereco.getLogradouro() != null) {
            endereco.setLogradouro(novoEndereco.getLogradouro());
        }
        if (novoEndereco.getCidade() != null) {
            endereco.setCidade(novoEndereco.getCidade());
        }
        if (novoEndereco.getUf() != null) {
            endereco.setUf(novoEndereco.getUf());
        }
        if (novoEndereco.getCep() != null) {
            endereco.setCep(novoEndereco.getCep());
        }

        if(novoEndereco.getNumero() != null) {
            endereco.setNumero(novoEndereco.getNumero());
        }

        if(novoEndereco.getBairro() != null) {
            endereco.setBairro(novoEndereco.getBairro());
        }

        if(novoEndereco.getComplemento() != null) {
            endereco.setComplemento(novoEndereco.getComplemento());
        } 

        endereco.setCliente(cliente);
        enderecoRepository.save(endereco);

        return endereco;
    }

    public Endereco adicionaNovoEndereco(String token, Endereco novoEndereco) {
        Cliente clienteToken = verificarUsuarioPorToken(token);
        Optional<Cliente> clienteOptional = clienteRepository.findById(clienteToken.getId());

        if (clienteOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
        }

        Cliente cliente = clienteOptional.get();

        if (!clienteToken.getEmail().equals(cliente.getEmail())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Você não pode alterar o endereço deste cliente");
        }

        novoEndereco.setCliente(cliente);
        return enderecoRepository.save(novoEndereco);
    }

    public Cliente verificarUsuarioPorToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(CHAVE_SECRETA)
                    .parseClaimsJws(token);

            String userEmail = claimsJws.getBody().getSubject();
            Cliente cliente = clienteRepository.findByEmail(userEmail);

            if (cliente == null) {
                throw new RuntimeException("Token válido, mas usuário não encontrado.");
            }
            
            return cliente;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado.");
        } catch (MalformedJwtException | SignatureException e) {
            throw new RuntimeException("Token inválido.");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao verificar o token.");
        }
    }

    public ClienteDto retornarInformacoesCliente(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(CHAVE_SECRETA)
                    .parseClaimsJws(token);

            String userEmail = claimsJws.getBody().getSubject();
            Cliente cliente = clienteRepository.findByEmail(userEmail);
            ClienteDto clienteDto = new ClienteDto();

            if (cliente == null) {
                throw new RuntimeException("Token válido, mas usuário não encontrado.");
            }

            clienteDto.setCpf(cliente.getCpf());
            clienteDto.setDataNascimento(cliente.getDataNascimento());
            clienteDto.setEmail(cliente.getEmail());
            clienteDto.setGenero(cliente.getGenero());
            clienteDto.setId(cliente.getId());
            clienteDto.setNomeCompleto(cliente.getNomeCompleto());
            
            return clienteDto;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado.");
        } catch (MalformedJwtException | SignatureException e) {
            throw new RuntimeException("Token inválido.");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao verificar o token.");
        }
    
    }

    public List<Endereco> buscaEnderecosPorCliente(String token) {
        Cliente clienteToken = verificarUsuarioPorToken(token);
        return enderecoRepository.findAllByClienteId(clienteToken.getId());
    }

    public Endereco buscaEnderecoPorClienteEId(String token, Long enderecoId) {
        Cliente clienteToken = verificarUsuarioPorToken(token);
        Optional<Endereco> endeOptional = enderecoRepository.findEnderecoByEnderecoIdAndClienteId(enderecoId, clienteToken.getId());

        Endereco endereco = endeOptional.get();
        return endereco;
    }

    public void atualizaPrincipal(String token, Long enderecoId) {
        List<Endereco> enderecos = buscaEnderecosPorCliente(token);

        for (Endereco endereco : enderecos) {
            if(endereco.getId() == enderecoId && endereco.isEnderecoFaturamento() == false) {
                endereco.setPrincipal(true);
            } else {
                endereco.setPrincipal(false);
            }

            enderecoRepository.save(endereco);
        }
    }

    public void inativarEndereco(Long enderecoId, String token) {
        List<Endereco> enderecos = buscaEnderecosPorCliente(token);

        for (Endereco endereco : enderecos) {
            if(endereco.getId() == enderecoId) {
                endereco.setAtivo(false);;
            }
            
            enderecoRepository.save(endereco);
        }
    }
}
