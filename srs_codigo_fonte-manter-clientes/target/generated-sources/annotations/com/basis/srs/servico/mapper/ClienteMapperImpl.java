package com.basis.srs.servico.mapper;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.servico.dto.ClienteDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2020-10-03T20:19:28-0300",
    comments = "version: 1.3.1.Final, compiler: javac, environment: Java 1.8.0_265 (Private Build)"
)
@Component
public class ClienteMapperImpl implements ClienteMapper {

    @Override
    public Cliente toEntity(ClienteDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Cliente cliente = new Cliente();
        cliente.setNome( dto.getNome() );
        cliente.setEndereco( dto.getEndereco() );
        cliente.setDataNasc( dto.getDataNasc() );
        cliente.setTelefone( dto.getTelefone() );
        cliente.setRg( dto.getRg() );
        cliente.setCpf( dto.getCpf() );
        cliente.setEmail( dto.getEmail() );

        return cliente;
    }

    @Override
    public ClienteDTO toDto(Cliente entity) {
        if ( entity == null ) {
            return null;
        }

        ClienteDTO clienteDTO = new ClienteDTO();

        clienteDTO.setNome( entity.getNome() );
        clienteDTO.setEndereco( entity.getEndereco() );
        clienteDTO.setDataNasc( entity.getDataNasc() );
        clienteDTO.setTelefone( entity.getTelefone() );
        clienteDTO.setRg( entity.getRg() );
        clienteDTO.setCpf( entity.getCpf() );
        clienteDTO.setEmail( entity.getEmail() );

        return clienteDTO;
    }

    @Override
    public List<Cliente> toEntity(List<ClienteDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Cliente> list = new ArrayList<Cliente>( dtoList.size() );
        for ( ClienteDTO clienteDTO : dtoList ) {
            list.add( toEntity( clienteDTO ) );
        }

        return list;
    }

    @Override
    public List<ClienteDTO> toDto(List<Cliente> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<ClienteDTO> list = new ArrayList<ClienteDTO>( entityList.size() );
        for ( Cliente cliente : entityList ) {
            list.add( toDto( cliente ) );
        }

        return list;
    }
}
