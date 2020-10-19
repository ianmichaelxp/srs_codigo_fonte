package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "sala")
public class Sala implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "seq_sala")
    @SequenceGenerator(name="seq_sala",allocationSize = 1, sequenceName = "seq_sala")
    @Column(name = "id")
    private Integer id;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_sala")
    private TipoSala tipoSala;

    @Column(name = "capacidade_pessoas")
    private Integer capacidadePessoas;

    @Column(name = "preco_diario")
    private Double precoDiario;

    @OneToMany(mappedBy = "sala")
    private List<SalaEquipamento> equipamentos;

}
