package com.senac.geekOpolis.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.models.UsuarioLoginDto;
import com.senac.geekOpolis.repository.UsuarioRepository;

import lombok.AllArgsConstructor;


//Classe de serviço para metodos auxiliares
@Service
@AllArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private static final String CHAVE_SECRETA = "jwt-geekOpolis-validation";

    //Encripta senha usando bCrypt do spring boot security
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

    // Verifica se existe um usuário com este email e depois valida se as senhas batem
    public boolean validaSenha(UsuarioLoginDto usuarioLoginDto) {
        Usuario usuario = usuarioRepository.findByEmail(usuarioLoginDto.getEmail());
    
        if (usuario != null) {
            return bCryptPasswordEncoder.matches(usuarioLoginDto.getSenha(), usuario.getSenha());
        } else {
            return false;
        }
    }

    // gera um token de duraçao de 5 minutos para o usuario caso o login de certo
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

        if(optionalUsuario.isEmpty()) {
            return null;
        }

        if (usuario.getSenha() != null) {
            String encryptedPassword = bCryptPasswordEncoder.encode(usuario.getSenha());
            u.setSenha(encryptedPassword);
        }
        
        if(usuario.getCpf() != null) {
            u.setCpf(usuario.getCpf());
        }
        
        if(usuario.getGrupo() != null) {
            u.setGrupo(usuario.getGrupo());
        }
        
        return u;
    }
}
