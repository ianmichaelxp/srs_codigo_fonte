package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "reserva")
public class Reserva implements Serializable
{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_reserva")
    @SequenceGenerator(name = "seq_reserva", allocationSize = 1, sequenceName = "seq_reserva")
    @Column(name = "id")
    private Integer id;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "preco_final")
    private Double precoFinal;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name="id_cliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_sala")
    private Sala sala;
}
