package com.basis.srs.servico.dto;

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
    @Size(max=255)
    private String nome;

    @NotNull
    @Min(1)
    @Max(3)
    private Integer idTipoEquipamento;

    @NotNull
    @Positive
    private Double precoDiario;

}
