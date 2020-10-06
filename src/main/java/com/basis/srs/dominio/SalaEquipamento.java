package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name ="sala_equipamento")
public class SalaEquipamento implements Serializable
{
    @EmbeddedId
    private SalaEquipamentoPK salaEquipamentoPK;

    @MapsId("idSala")
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala")
    private Sala sala;

    @MapsId("idEquipamento")
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name="id_equipamento")
    private Equipamento equipamento;

    @Column(name = "quantidade")
    private Integer quantidade;

}
