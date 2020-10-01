package com.basis.srs.servico;

import com.basis.srs.dominio.Sala;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalaDTO
{
    private String descricao;
    private Integer quantidadePessoas;
    private Double precoDiario;



}
