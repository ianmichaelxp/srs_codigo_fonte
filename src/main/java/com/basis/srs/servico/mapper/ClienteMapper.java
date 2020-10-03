package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.servico.dto.ClienteDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClienteMapper
{
    ClienteMapper INSTANCE = Mappers.getMapper( ClienteMapper.class );
    Cliente toEntity(ClienteDTO dto);
    List<Cliente> toEntity(List<ClienteDTO> dtos);
    ClienteDTO toDTO(Cliente cliente);
    List<ClienteDTO> toDTO(List<Cliente> clientes);

}
