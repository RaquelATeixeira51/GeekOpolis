package com.senac.geekOpolis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Produto;
import com.senac.geekOpolis.models.ProdutoDto;

// classe de repositório que extende a do JPA
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT p FROM Produto p WHERE " +
    "(:nomeFiltro IS NULL OR LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))) " +
    "ORDER BY p.createdDate DESC")
    List<Produto> buscarProdutos(@Param("nomeFiltro") String nomeFiltro);
    
    @Query("SELECT COUNT(p) FROM Produto p WHERE LOWER(p.nome) LIKE LOWER(concat('%', :nomeFiltro, '%'))")
    long contarProdutos(@Param("nomeFiltro") String nomeFiltro);


    @Query("SELECT new com.senac.geekOpolis.models.Produto(u.id, u.nome ,u.avaliacao ,u.descricao ,u.preco ,u.qtdEstoque ,u.status) FROM Produto u" +
           " WHERE (u.id = :id)")
    Produto findById(long id);

}
