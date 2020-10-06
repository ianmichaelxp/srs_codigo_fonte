package com.basis.srs.servico.dto;
import com.basis.srs.dominio.TipoEquipamento;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EquipamentoDTO 
{
    private Integer id;
    private String nome;
    private Integer idTipoEquipamento;
    private Double precoDiario;
    private Integer equipamentoObrigatorio;
    //private List<EquipamentoDTO> equipamentos;
}
