package com.senac.geekOpolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.geekOpolis.models.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {
    
}
