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
    private SalaEquipamentoPK id;

    @Column(name = "quantidade")
    private Integer quantidade;

    @MapsId("id_sala")
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala")
    private Sala sala;

    @MapsId("id_equipamento")
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_equipamento")
    private Equipamento equipamento;
}
