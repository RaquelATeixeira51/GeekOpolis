package com.senac.geekOpolis.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioPayloadDto {
    private long id;
    private String nome;
    private String email;
    private String grupo;
    private boolean ativo;
    private String cpf;
}
