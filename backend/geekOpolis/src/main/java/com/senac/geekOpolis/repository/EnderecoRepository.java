package com.senac.geekOpolis.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.senac.geekOpolis.models.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId AND e.enderecoFaturamento = false AND e.ativo = true")
    List<Endereco> findAllByClienteId(@Param("clienteId") Long clienteId);

    @Query("SELECT e FROM Endereco e WHERE e.id = :enderecoId AND e.cliente.id = :clienteId AND e.enderecoFaturamento = false AND e.ativo = true")
    Optional<Endereco> findEnderecoByEnderecoIdAndClienteId(
        @Param("enderecoId") Long enderecoId, 
        @Param("clienteId") Long clienteId
    );
}
