package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.servico.dto.ClienteDTO;
import org.mapstruct.Mapper;

@Mapper
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente>
{
}
