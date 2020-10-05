package com.basis.srs.servico.dto;

import com.basis.srs.dominio.SalaEquipamento;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class SalaDTO {
    private Integer id;

    private String descricao;

    private Integer quantidadePessoas;

    private Double precoDiario;

    private Integer idTipoSala;

    private List<SalaEquipamentoDTO> equipamentos;

}
