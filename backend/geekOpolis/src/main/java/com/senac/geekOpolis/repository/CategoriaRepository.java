package com.senac.geekOpolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Categoria;


// classe de repositório que extende a do JPA
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Categoria findById(long id);
}
