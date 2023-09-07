package com.senac.geekOpolis.service;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.senac.geekOpolis.models.Categoria;
import com.senac.geekOpolis.models.Produto;
import com.senac.geekOpolis.models.ProdutoPayloadDto;
import com.senac.geekOpolis.repository.CategoriaRepository;

import lombok.AllArgsConstructor;

//Classe de serviço para metodos auxiliares
@AllArgsConstructor
@Service
public class ProdutoCategoriaService {
   
    private final CategoriaRepository categoriaRepository;

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

}
