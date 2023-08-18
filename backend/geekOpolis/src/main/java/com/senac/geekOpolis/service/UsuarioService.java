package com.senac.geekOpolis.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.repository.UsuarioRepository;

import lombok.AllArgsConstructor;


//Classe de serviço para metodos auxiliares
@Service
@AllArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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
}
