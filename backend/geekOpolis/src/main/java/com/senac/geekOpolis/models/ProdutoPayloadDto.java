package com.senac.geekOpolis.models;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoPayloadDto {
    private String nome;
    private double avaliacao;
    private String descricao;
    private double preco;
    private int qtdEstoque;
    private List<String> imagesPath;
    private Long categoriaId;
    private boolean status;
}
