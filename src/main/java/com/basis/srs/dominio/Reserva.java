package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.security.Timestamp;

@Getter
@Setter
@Entity
@Table
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int cliente_id;

//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    private Integer sala_id;


    private Timestamp dataInicio;
    private Timestamp dataFim;
    private Double precoFinal;

    public Reserva(Timestamp dataInicio, Timestamp dataFim, Double precoFinal) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.precoFinal = precoFinal;
    }

    /*@OneToOne
    private Cliente cliente;
    @OneToMany
    private Sala sala;*/


}
