package com.basis.srs.servico.dto;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ReservaDTO {

    private Integer id;

    private Double precoFinal;

    private Timestamp dataInicio;

    private Timestamp dataFim;

    private Integer idCliente;

    private Integer idSala;

}
