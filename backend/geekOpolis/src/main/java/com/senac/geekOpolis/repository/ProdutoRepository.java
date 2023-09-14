package com.senac.geekOpolis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.senac.geekOpolis.models.Produto;
import com.senac.geekOpolis.models.Usuario;
import com.senac.geekOpolis.models.UsuarioPayloadDto;

// classe de repositório que extende a do JPA
@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    @Query("SELECT new com.senac.geekOpolis.models.Produto(u.id, u.nome, u.email, u.grupo, u.ativo, u.cpf) FROM Usuario u" +
       " WHERE (LOWER(u.nome) LIKE LOWER(concat('%', :nomeFiltro, '%')))")
    Produto findAll(String name);

    List<Produto> buscaProdutos(@Param("nomeFiltro") String nomeFiltro);

    @Query("SELECT new com.senac.geekOpolis.models.Produto(u.id, u.nome, u.email, u.grupo, u.ativo, u.cpf) FROM Usuario u" +
           " WHERE (u.id = :id)")
    Produto findById(long id);

}
