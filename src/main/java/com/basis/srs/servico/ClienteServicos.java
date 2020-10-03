package com.basis.srs.servico;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.repositorio.ClienteRepositorio;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.mapper.ClienteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClienteServicos
{
    private final ClienteRepositorio repositorio;
    private final ClienteMapper mapper;

    public List<ClienteDTO> listarClientes()
    {
        return mapper.toDto(repositorio.findAll());
    }

    public ClienteDTO obterPorId(Integer id)
    {
        return mapper.toDto(repositorio.findById(id).orElse(null));
    }

    public Cliente salvarCliente(ClienteDTO cliente)
    {
        return  repositorio.save(mapper.toEntity(cliente));
    }
    
    public void removerCliente(Integer id)
    {
        repositorio.deleteById(id);
    }
}
