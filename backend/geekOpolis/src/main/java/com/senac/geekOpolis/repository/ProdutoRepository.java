package com.senac.geekOpolis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Produto;

// classe de repositório que extende a do JPA
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT p FROM Produto p WHERE " +
    "(:nomeFiltro IS NULL OR LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))) " +
    "ORDER BY p.createdDate DESC")
    List<Produto> buscarProdutos(@Param("nomeFiltro") String nomeFiltro);
    
    @Query("SELECT COUNT(p) FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))")
    long contarProdutos(@Param("nomeFiltro") String nomeFiltro);


    @Query(value = "SELECT p.id, p.nome, p.avaliacao, p.descricao, p.preco, p.qtd_estoque, p.status, c.id AS categoria_id " +
       "FROM produto p " +
       "LEFT JOIN categoria c ON p.categoria_id = c.id " +
       "WHERE p.id = :id", nativeQuery = true)
    Produto findById(long id);
}
