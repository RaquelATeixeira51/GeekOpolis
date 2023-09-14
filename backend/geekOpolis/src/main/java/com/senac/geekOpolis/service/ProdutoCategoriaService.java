package com.senac.geekOpolis.service;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.senac.geekOpolis.models.Categoria;
import com.senac.geekOpolis.models.Produto;
import com.senac.geekOpolis.models.ProdutoDto;
import com.senac.geekOpolis.models.ProdutoPayloadDto;
import com.senac.geekOpolis.models.UsuarioPayloadDto;
import com.senac.geekOpolis.repository.CategoriaRepository;
import com.senac.geekOpolis.repository.ProdutoRepository;

import lombok.AllArgsConstructor;

//Classe de serviço para metodos auxiliares
@AllArgsConstructor
@Service
public class ProdutoCategoriaService {
   
    private final CategoriaRepository categoriaRepository;
    private final UsuarioService usuarioService;
    private final ProdutoRepository produtoRepository;

    public Produto saveProduto (ProdutoPayloadDto produtoPayloadDto) {
        Produto produto = new Produto();
        produto.setNome(produtoPayloadDto.getNome());
        produto.setAvaliacao(produtoPayloadDto.getAvaliacao());
        produto.setDescricao(produtoPayloadDto.getDescricao());
        produto.setPreco(produtoPayloadDto.getPreco());
        produto.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
        produto.setImagesPath(produtoPayloadDto.getImagesPath());
        produto.setStatus(produtoPayloadDto.isStatus());

        String name =  produtoPayloadDto.getNome().replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

        String code = "CP" + name;

        produto.setCode(code);

        Optional<Categoria> categoria = categoriaRepository.findById(produtoPayloadDto.getCategoriaId());

        Categoria c = categoria.get();
        produto.setCategoria(c);

        return produto;
    }

    public Produto atualizaAcesso(String token, Long id) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            Optional<Produto> produto = produtoRepository.findById(id);
            Produto p = produto.get();
            if(p.isStatus() == true) {
                p.setStatus(false);
            } else {
                p.setStatus(true);
            }
            return p;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Somente admnistradores podem mudar o status");
        }
    } 

    public Produto atualizaProduto(String token, Long id, ProdutoPayloadDto produtoPayloadDto) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);
        Optional<Produto> produto = produtoRepository.findById(id);
        Produto p = produto.get();

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            p.setAvaliacao(produtoPayloadDto.getAvaliacao());
            p.setDescricao(produtoPayloadDto.getDescricao());
            p.setImagesPath(produtoPayloadDto.getImagesPath());
            p.setNome(produtoPayloadDto.getNome());
            p.setPreco(produtoPayloadDto.getPreco());
            p.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
            p.setStatus(produtoPayloadDto.isStatus());

            String name = p.getNome().replaceAll("[^a-zA-Z0-9]", "").toUpperCase();

            String code = "CP" + name;

            p.setCode(code);

            Optional<Categoria> categoria = categoriaRepository.findById(produtoPayloadDto.getCategoriaId());

            Categoria c = categoria.get();
            p.setCategoria(c);
        } else if (usuarioPayloadDto.getGrupo().equals("ESTOQUISTA")) {
            p.setQtdEstoque(produtoPayloadDto.getQtdEstoque());
        }

        return p;
    }

    // Lista todos os usuários
    public ProdutoDto buscaProdutos(String nomeFiltro) {
        List<Produto> produtos;
        long qtdTotal;

        if (nomeFiltro != null && !nomeFiltro.isEmpty()) {
            produtos = produtoRepository.buscarProdutos(nomeFiltro);
            qtdTotal = produtoRepository.contarProdutos(nomeFiltro);
        } else {
            produtos = produtoRepository.findAll();
            qtdTotal = produtoRepository.count();
        }
        
        return new ProdutoDto(produtos, qtdTotal);
    }

    // Retorna um único usuário por id
    public Produto buscaProduto(String token, long id) {
        UsuarioPayloadDto usuarioPayloadDto = usuarioService.verificarUsuarioPorToken(token);

        if(usuarioPayloadDto.getGrupo().equals("ADMIN")) {
            return produtoRepository.findById(id);
        }

        return null;
    }
}
