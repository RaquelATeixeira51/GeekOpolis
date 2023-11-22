package com.senac.geekOpolis.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "endereco")
public class Endereco {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnore
    private Cliente cliente;

    @Column
    private boolean principal;

    @Column
    private String cep;
    
    @Column
    private String logradouro;
    
    @Column
    private String numero;
    
    @Column
    private String complemento;
    
    @Column
    private String bairro;
    
    @Column
    private String cidade;
    
    @Column
    private String uf;

    @Column
    private boolean enderecoFaturamento;

    @Column
    private boolean ativo;

    @OneToMany(mappedBy = "enderecoDeEntrega")
    @JsonIgnore
    private List<Pedido> pedidos;
}
