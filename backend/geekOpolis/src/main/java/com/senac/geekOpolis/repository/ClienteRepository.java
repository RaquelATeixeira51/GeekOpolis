package com.senac.geekOpolis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senac.geekOpolis.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{
    Cliente findByEmail(String email);
    Cliente findByCpf(String cpf);
}
