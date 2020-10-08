package com.basis.srs.servico.dto;
import com.basis.srs.dominio.TipoEquipamento;

import lombok.Getter;
import lombok.Setter;


import javax.validation.constraints.*;

@Getter
@Setter
public class EquipamentoDTO 
{
    private Integer id;

    @NotNull
    @NotBlank
    @Size(min = 0, max = 255)
    private String nome;

    @Min(value = 1)
    @NotNull
    private Integer idTipoEquipamento;

    @NotNull
    @Min(value = 0)
    private Double precoDiario;

    @NotNull
    @Min(value = 0)
    @Max(value = 1)
    private Integer equipamentoObrigatorio;

}
