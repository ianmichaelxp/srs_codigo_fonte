package com.basis.srs.servico;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.dominio.Reserva;
import com.basis.srs.repositorio.ClienteRepositorio;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.mapper.ClienteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClienteServicos
{
    private final ClienteRepositorio clienteRepositorio;
    private final ClienteMapper clienteMapper;
    private final ReservaRepositorio reservaRepositorio;

    public List<ClienteDTO> listarClientes()
    {
        return clienteMapper.toDto(clienteRepositorio.findAll());
    }

    public ClienteDTO obterPorId(Integer id)
    {
        return clienteMapper.toDto(clienteRepositorio.findById(id).orElse(null));
    }

    public ClienteDTO salvarCliente(ClienteDTO clienteDTO)
    {
        Cliente cliente = clienteRepositorio.save(clienteMapper.toEntity(clienteDTO));
        return clienteMapper.toDto(cliente);
    }
    
    public void removerCliente(Integer id)
    {
        List<Reserva> reservas = reservaRepositorio.findAll();
        reservas.forEach(reserva ->
        {
            if (reserva.getCliente().getId().equals(id))
            {
                reservaRepositorio.delete(reserva);
            }
        });
        clienteRepositorio.deleteById(id);
    }
}
