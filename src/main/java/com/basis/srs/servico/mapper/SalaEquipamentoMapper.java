package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.SalaEquipamento;

import com.basis.srs.servico.dto.SalaEquipamentoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface SalaEquipamentoMapper extends EntityMapper<SalaEquipamentoDTO, SalaEquipamento>
{

    @Mapping(source="salaEquipamentoPK.idSala",target="idSala")
    SalaEquipamentoDTO toEntity(SalaEquipamento salaEquipamento);
}
