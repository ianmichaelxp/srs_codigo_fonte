package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "equipamento")
public class Equipamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_equipamento") //sequence aqui
    @SequenceGenerator(name = "seq_equipamento", allocationSize = 1, sequenceName = "seq_equipamento")
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_equipamento")
    private TipoEquipamento tipoEquipamento;

    @Column(name="preco_diario")
    private Double precoDiario;

    @Column(name="equipamento_obrigatorio")
    private Integer equipamentoObrigatorio;

}