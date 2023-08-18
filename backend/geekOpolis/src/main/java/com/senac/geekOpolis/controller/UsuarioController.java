package com.senac.geekOpolis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.repository.UsuarioRepository;
import com.senac.geekOpolis.service.UsuarioService;

import lombok.AllArgsConstructor;

// Controller da classe usuário
@AllArgsConstructor
@RestController
@RequestMapping("usuario/")
public class UsuarioController {

    private final UsuarioService userService;
    private final UsuarioRepository userRepository;

    @PostMapping("incluiAcesso")
    public ResponseEntity<String> registraUsuario(@RequestBody Usuario usuario) {
        // verifica se o email ja existe antes de criar
        if(!userService.validaEmail(usuario.getEmail())) {
            // encripta a senha antes de salvar no banco
            userService.encriptSenha(usuario);
            userRepository.save(usuario);
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este email já existe");
        }
    }
}
