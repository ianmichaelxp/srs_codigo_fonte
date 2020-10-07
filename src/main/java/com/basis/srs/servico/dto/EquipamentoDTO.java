package com.basis.srs.servico.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipamentoDTO 
{
    private Integer id;

    private String nome;

    private Integer idTipoEquipamento;

    private Double precoDiario;

    private Integer equipamentoObrigatorio;
}
