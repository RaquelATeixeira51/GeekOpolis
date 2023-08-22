package com.senac.geekOpolis.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.models.UsuarioLoginDto;
import com.senac.geekOpolis.models.UsuarioPayloadDto;
import com.senac.geekOpolis.repository.UsuarioRepository;

import lombok.AllArgsConstructor;

//Classe de serviço para metodos auxiliares
@Service
@AllArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String CHAVE_SECRETA = "jwt-geekOpolis-validation";

    // Encripta senha usando bCrypt do spring boot security
    public Usuario encriptSenha(Usuario usuario) {
        String encryptedPassword = bCryptPasswordEncoder.encode(usuario.getSenha());
        usuario.setSenha(encryptedPassword);

        return usuario;
    }

    // Verifica se ja existe um usuário com este email
    public boolean validaEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario != null;
    }

    // Verifica se existe um usuário com este email e depois valida se as senhas
    // batem
    public boolean validaSenha(UsuarioLoginDto usuarioLoginDto) {
        Usuario usuario = usuarioRepository.findByEmail(usuarioLoginDto.getEmail());

        if (usuario != null) {
            return bCryptPasswordEncoder.matches(usuarioLoginDto.getSenha(), usuario.getSenha());
        } else {
            return false;
        }
    }

    // gera um token de duraçao de 10 minutos para o usuario caso o login de certo
    public String gerarToken(UsuarioLoginDto usuarioLoginDto) {
        long agora = System.currentTimeMillis();
        long expiracao = agora + TimeUnit.MINUTES.toMillis(10);

        Usuario usuario = usuarioRepository.findByEmail(usuarioLoginDto.getEmail());

        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .setIssuedAt(new Date(agora))
                .setExpiration(new Date(expiracao))
                .signWith(SignatureAlgorithm.HS256, CHAVE_SECRETA)
                .compact();
    }

    // retorna o usuario atualizado ou nulo se nao existir um usuário com este id
    public Usuario atualizar(Long id, Usuario usuario) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        Usuario u = optionalUsuario.get();

        if (optionalUsuario.isEmpty()) {
            return null;
        }

        if (usuario.getSenha() != null) {
            String encryptedPassword = bCryptPasswordEncoder.encode(usuario.getSenha());
            u.setSenha(encryptedPassword);
        }

        if (usuario.getCpf() != null) {
            u.setCpf(usuario.getCpf());
        }

        if (usuario.getGrupo() != null) {
            u.setGrupo(usuario.getGrupo());
        }

        return u;
    }

    // retorna o usuario ativo ou inativo
    public Usuario atualizaAcesso(Long id) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        Usuario u = optionalUsuario.get();

        if (optionalUsuario.isEmpty()) {
            return null;
        }

        if (u.isAtivo() == true) {
            u.setAtivo(false);
        } else {
            u.setAtivo(true);
        }

        return u;
    }

    // tenta utilizar o token para recuperar o subject e retornar quem está logado e
    // suas infornações, caso seja nulo o tojen é invalido ou está expirado.
    public UsuarioPayloadDto verificarUsuarioPorToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser()
                    .setSigningKey(CHAVE_SECRETA)
                    .parseClaimsJws(token);

            String userEmail = claimsJws.getBody().getSubject();
            Usuario usuario = usuarioRepository.findByEmail(userEmail);

            if (usuario == null) {
                throw new RuntimeException("Token válido, mas usuário não encontrado.");
            }

            UsuarioPayloadDto usuarioPayloadDto = new UsuarioPayloadDto();

            usuarioPayloadDto.setAtivo(usuario.isAtivo());
            usuarioPayloadDto.setCpf(usuario.getCpf());
            usuarioPayloadDto.setEmail(usuario.getEmail());
            usuarioPayloadDto.setGrupo(usuario.getGrupo());
            usuarioPayloadDto.setId(usuario.getId());

            return usuarioPayloadDto;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token expirado.");
        } catch (MalformedJwtException | SignatureException e) {
            throw new RuntimeException("Token inválido.");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao verificar o token.");
        }
    }

    // Lista todos os usuários
    public List<UsuarioPayloadDto> buscaUsuarios() {
        List<Usuario> usuario = usuarioRepository.findAll();
        List<UsuarioPayloadDto> usuarioPayloadDtos = new ArrayList<>();

        for (Usuario u : usuario) {
            usuarioPayloadDtos.add(new UsuarioPayloadDto(u.getId(), u.getEmail(), u.getGrupo(), u.isAtivo(), u.getCpf()));
        }

        return usuarioPayloadDtos;
    }
}
