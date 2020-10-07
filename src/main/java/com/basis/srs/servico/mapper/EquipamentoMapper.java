package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.servico.dto.EquipamentoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface EquipamentoMapper extends EntityMapper<EquipamentoDTO, Equipamento>
{
    @Override
    @Mapping(source = "idTipoEquipamento", target = "tipoEquipamento.id")
    Equipamento toEntity(EquipamentoDTO dto);

    @Override
    @Mapping(source = "tipoEquipamento.id", target = "idTipoEquipamento")
    EquipamentoDTO toDto(Equipamento entity);
}
