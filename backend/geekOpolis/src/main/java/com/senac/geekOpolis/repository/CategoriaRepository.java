package com.senac.geekOpolis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Categoria;
import com.senac.geekOpolis.models.CategoriaDto;


// classe de repositório que extende a do JPA
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findById(long id);

    @Query("SELECT c FROM Categoria c JOIN FETCH c.produtos p WHERE p.status <> false ORDER BY p.createdDate DESC")
    List<Categoria> findAllCategoriasWithFilteredProducts();

    @Query("SELECT new com.senac.geekOpolis.models.CategoriaDto(c.id, c.nome) FROM Categoria c")
    List<CategoriaDto> findAllCategoriesWithoutProducts();
}
