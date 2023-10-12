package com.senac.geekOpolis.models;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDto {
     private Long id;
    private String email;
    private String cpf;
    private String nomeCompleto;
    private LocalDate dataNascimento;
    private String genero;
}
