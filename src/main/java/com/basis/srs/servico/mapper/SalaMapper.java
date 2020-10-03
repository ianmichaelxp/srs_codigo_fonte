package com.basis.srs.servico.mapper;

import org.mapstruct.Mapper;

import java.util.List;


@Mapper(componentModel = "spring" )
public interface SalaMapper<SalaDTO,Sala>
{

    Sala toEntity(SalaDTO salaDTO);
    SalaDTO toDTO(Sala sala);

    List<Sala> toEntity(List<SalaDTO> dtoList);
    List<SalaDTO> toDTO(List<Sala> salaList);

}
