package com.senac.geekOpolis.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.senac.geekOpolis.models.Categoria;
import com.senac.geekOpolis.models.UsuarioPayloadDto;
import com.senac.geekOpolis.repository.CategoriaRepository;
import com.senac.geekOpolis.repository.ProdutoRepository;
import com.senac.geekOpolis.service.ProdutoCategoriaService;
import com.senac.geekOpolis.service.UsuarioService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/")
public class ProdutoCategoriaController {
    private final ProdutoRepository produtoRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProdutoCategoriaService produtoCategoriaService;
    private final UsuarioService usuarioService;

    @PostMapping("/categoria/incluiCategoria")
    public ResponseEntity<String> incluiCategoria(@RequestBody Categoria categoria, @RequestParam String token) {
        UsuarioPayloadDto u = usuarioService.verificarUsuarioPorToken(token);
        if(u.getGrupo().equals("ADMIN")) {
            categoriaRepository.save(categoria);
            return new ResponseEntity<>("Created", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Apenas administradores podem criar categorias", HttpStatus.UNAUTHORIZED);
        }
    }
}
