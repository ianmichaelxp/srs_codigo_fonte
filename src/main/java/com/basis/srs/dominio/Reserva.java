package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="reserva")
@Getter
@Setter
public class Reserva 
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_reserva")
    @SequenceGenerator(name = "seq_reserva", allocationSize = 1, sequenceName = "seq_reserva")
    @Column(name = "id")
    private Integer id;

    @Column(name = "preco_final")
    private Double precoFinal;

    @Column(name = "data_inicio")
    private Timestamp dataInicio;

    @Column(name = "data_fim")
    private Timestamp dataFim;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_sala")
    private Sala sala;
}
