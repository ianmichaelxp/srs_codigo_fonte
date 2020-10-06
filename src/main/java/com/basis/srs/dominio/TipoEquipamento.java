package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "tipo_equipamento")
public class TipoEquipamento implements Serializable 
{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_equipamento")
    @SequenceGenerator(name = "seq_equipamento", allocationSize = 1, sequenceName = "seq_equipamento")
    private Integer id;

    @Column(name = "descricao")
    private String descricao;
}