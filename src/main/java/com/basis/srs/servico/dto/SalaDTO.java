package com.basis.srs.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class SalaDTO {
    private Integer id;

    private String descricao;

    private Integer capacidadePessoas;

    private Double precoDiario;

    private Integer idTipoSala;

    private List<SalaEquipamentoDTO> equipamentos;

}
