package com.basis.srs.servico.dto;


import com.basis.srs.dominio.TipoSala;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SalaDTO {
    private Integer id;

    private String descricao;

    private Integer quantidadePessoas;

    private Double precoDiario;

    private TipoSala tipoSala;

}
