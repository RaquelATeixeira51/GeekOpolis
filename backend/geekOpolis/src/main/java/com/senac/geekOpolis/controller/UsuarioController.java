package com.senac.geekOpolis.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.models.UsuarioLoginDto;
import com.senac.geekOpolis.models.UsuarioPayloadDto;
import com.senac.geekOpolis.repository.UsuarioRepository;
import com.senac.geekOpolis.service.UsuarioService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Este email ja existe");
        }
    }


    // endpoint de login recebe email e senha e retorne um token ou unauthorized
    @PostMapping("login")
    public ResponseEntity<String> login(@RequestBody UsuarioLoginDto usuarioLoginDto) {
        // verica se a senha é valida antes de retornar o token
        if(userService.validaSenha(usuarioLoginDto)) {
            Usuario usuario = userRepository.findByEmail(usuarioLoginDto.getEmail());
            if(usuario.isAtivo()){
                return ResponseEntity.ok(userService.gerarToken(usuarioLoginDto));
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario está desativado");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario nao existe ou email ou senha errados");
        }
    }

    // endpoint para atualizar usuario
    @PutMapping("atualizaUsuario/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Usuario usuario, @RequestParam String token) {
        Usuario u = userService.atualizar(id, usuario, token);

        if(u != null) {
            userRepository.save(u);
            return ResponseEntity.ok("Usuario atualizado");
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Nao é possível atualizar o próprio usuário.");
    }

    // endpoint para atualizar acesso de usuario
    @PutMapping("atualizaAcessoUsuario/{id}")
    public ResponseEntity<String> atualizaAcesso(@PathVariable Long id) {
        Usuario u = userService.atualizaAcesso(id);

        if(u != null) {
            userRepository.save(u);
            return ResponseEntity.ok("Acesso atualizado");
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao foi possivel encontrar este usuario");
    }

    // endpoint para buscar acesso de todos os usuarios
    @GetMapping("buscaUsuarios")
    public List<UsuarioPayloadDto> buscaUsuario(@RequestParam(required = false) String nomeFiltro) {
        List<UsuarioPayloadDto> u = userService.buscaUsuarios(nomeFiltro);

        if(u != null) {
            return u;
        }else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nao foi possivel encontrar nenhum usuário");
        }
    }

    // endpoint para trazer as informacoes de quem está logado e autenticado
    @GetMapping("informacoes")
    public UsuarioPayloadDto informations(@RequestParam String jwtToken) {
        return userService.verificarUsuarioPorToken(jwtToken);
    }    
}
