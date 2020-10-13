package com.basis.srs.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.security.Timestamp;


@Getter
@Setter
public class ReservaDTO
{

    private Timestamp dataInicio;
    private Timestamp dataFinal;
    private Double precoFinal;
    private Integer idCliente;
    private Integer idSala;


}