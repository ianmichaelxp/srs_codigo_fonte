package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.servico.dto.ClienteDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClienteMapper extends EntityMapper<ClienteDTO,Cliente>
{
    ClienteMapper INSTANCE = Mappers.getMapper( ClienteMapper.class );

}
