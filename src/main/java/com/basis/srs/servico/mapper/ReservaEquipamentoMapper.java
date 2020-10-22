package com.basis.srs.servico.mapper;


import com.basis.srs.dominio.ReservaEquipamento;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.servico.dto.ReservaEquipamentoDTO;
import com.basis.srs.servico.dto.SalaEquipamentoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface ReservaEquipamentoMapper extends EntityMapper<ReservaEquipamentoDTO, ReservaEquipamento>{

    @Override
    @Mapping(source="idReserva",target= "reserva.id")
    @Mapping(source="idEquipamento",target= "equipamento.id")
    @Mapping(source="idReserva",target= "reservaEquipamentoPK.idReserva")
    @Mapping(source="idEquipamento",target= "reservaEquipamentoPK.idEquipamento")
    ReservaEquipamento toEntity(ReservaEquipamentoDTO dto);

    @Override
    @Mapping(target="idReserva",source= "reserva.id")
    @Mapping(target="idEquipamento",source= "equipamento.id")
    ReservaEquipamentoDTO toDto(ReservaEquipamento reservaEquipamento);
}
