package com.senac.geekOpolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senac.geekOpolis.models.Produto;

// classe de repositório que extende a do JPA
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
}
