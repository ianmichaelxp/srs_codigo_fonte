package com.basis.srs.servico;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.dominio.Reserva;
import com.basis.srs.repositorio.ClienteRepositorio;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.excecao.RegraNegocioException;
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
        return clienteMapper.toDto(clienteRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Usuário não encontrado")));
    }

    public ClienteDTO salvarCliente(ClienteDTO clienteDTO)
    {
        if(clienteDTO.getId()==null)
        {
            if (clienteRepositorio.existsByCpf(clienteDTO.getCpf()))
                throw new RegraNegocioException("Cpf já cadastrado");
            if (clienteRepositorio.existsByRg(clienteDTO.getRg()))
                throw new RegraNegocioException("Rg já cadastrado");
            if (clienteRepositorio.existsByEmail(clienteDTO.getEmail()))
                throw new RegraNegocioException("Email já cadastrado");
        }else{
            Cliente cliente = clienteRepositorio.findById(clienteDTO.getId()).orElseThrow(() -> new RegraNegocioException("não encontrado"));
            if (clienteRepositorio.existsByCpf(clienteDTO.getCpf()) && !cliente.getCpf().equals(clienteDTO.getCpf()))
                throw new RegraNegocioException("Cpf já cadastrado");
            if (clienteRepositorio.existsByRg(clienteDTO.getRg()) && !cliente.getRg().equals(clienteDTO.getRg()))
                throw new RegraNegocioException("Rg já cadastrado");
            if (clienteRepositorio.existsByEmail(clienteDTO.getEmail()) && !cliente.getEmail().equals(clienteDTO.getEmail()))
                throw new RegraNegocioException("Email já cadastrado");
        }
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
                throw new RegraNegocioException("Reserva existente no nome do Cliente");
            }
        });
        obterPorId(id);
        clienteRepositorio.deleteById(id);
    }
}