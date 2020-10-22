package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name ="reserva_equipamento")
public class ReservaEquipamento implements Serializable {

    @EmbeddedId
    private ReservaEquipamentoPK reservaEquipamentoPK;

    @MapsId("idReserva")
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Reserva")
    private Reserva reserva;

    @MapsId("idEquipamento")
    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.LAZY)
    @JoinColumn(name="id_equipamento")
    private Equipamento equipamento;

    @Column(name = "quantidade")
    private Integer quantidade;



}
