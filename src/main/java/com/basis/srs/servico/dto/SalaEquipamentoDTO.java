package com.basis.srs.servico.dto;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.Sala;
import com.basis.srs.dominio.SalaEquipamentoPK;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SalaEquipamentoDTO
{
    private Integer idSala;

    private Integer idEquipamento;

    private Integer quantidade;
}
