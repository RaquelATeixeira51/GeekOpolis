package com.senac.geekOpolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Categoria;


// classe de repositório que extende a do JPA
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findById(long id);

    @Query("SELECT c FROM Categoria c JOIN FETCH c.produtos p " +
           "WHERE p.createdDate = (SELECT MAX(p2.createdDate) FROM Produto p2 WHERE p2.categoria = c AND p2.status = true) " +
           "AND p.status = true")
    List<Categoria> findCategoriasComProdutosRecentes();
}
