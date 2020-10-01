package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table
public class Sala
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    @Column
    private String descricao;
    @ManyToOne
    private TipoSala tipoSala;
    @Column
    private Integer capacidadePessoas;
    @Column
    private Double precoDiario;


}
