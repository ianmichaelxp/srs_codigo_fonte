package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.servico.dto.ClienteDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClienteMapperComp implements ClienteMapper
{
    @Override
    public Cliente toEntity(ClienteDTO dto) {
        return null;
    }

    @Override
    public ClienteDTO toDto(Cliente entity) {
        return null;
    }

    @Override
    public List<Cliente> toEntity(List<ClienteDTO> dtoList) {
        return null;
    }

    @Override
    public List<ClienteDTO> toDto(List<Cliente> entityList) {

        return null;
    }
}
