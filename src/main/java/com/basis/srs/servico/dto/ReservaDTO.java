package com.basis.srs.servico.dto;

import com.basis.srs.dominio.Equipamento;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Future;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ReservaDTO
{
    private Integer id;
    @NotNull
    @FutureOrPresent
    private LocalDate dataInicio;
    @Future
    private LocalDate dataFim;
    @NotNull
    private Double precoFinal;
//aqui
    @NotNull
    private List<ReservaEquipamentoDTO> equipamentos;

    private Integer idCliente;

    private Integer idSala;

}
