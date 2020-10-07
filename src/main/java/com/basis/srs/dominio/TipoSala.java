package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "tipo_sala")
public class TipoSala implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_sala")
    @SequenceGenerator(name = "seq_sala", allocationSize = 1, sequenceName = "seq_sala")
    @Column(name = "id")
    private Integer id;

    @Column(name = "descricao")
    private String descricao;
}
