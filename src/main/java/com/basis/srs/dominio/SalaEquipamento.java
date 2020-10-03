package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;
import sun.nio.fs.GnomeFileTypeDetector;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name ="sala_equipamento")
public class SalaEquipamento
{
    @EmbeddedId
    private SalaEquipamentoPK id;

    @Column(name = "quantidade")
    private Integer quantidade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala")
    private Sala sala;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_equipamento")
    private Object equipamento;
}
