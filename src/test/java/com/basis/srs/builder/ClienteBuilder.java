package com.basis.srs.builder;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.repositorio.ClienteRepositorio;
import com.basis.srs.servico.ClienteServicos;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.mapper.ClienteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Collection;

@Component

public class ClienteBuilder extends ConstrutorDeEntidade<Cliente>
{

    @Autowired
    private ClienteServicos clienteServicos;

    @Autowired
    private ClienteMapper clienteMapper;

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    @Override
    public Cliente construirEntidade() throws ParseException
    {
        Cliente cliente = new Cliente();
        cliente.setCpf("12345678910");
        cliente.setDataNasc(LocalDate.now());
        cliente.setEmail("daniel@gmail.com");
        cliente.setEndereco("rua anchieta");
        cliente.setNome("daniel");
        cliente.setRg("1234567");
        cliente.setTelefone("12345678910");
        return cliente;
    }

    @Override
    public Cliente persistir(Cliente entidade)
    {
        ClienteDTO dto = clienteServicos.salvarCliente(clienteMapper.toDto(entidade));
        return clienteMapper.toEntity(dto);
    }

    @Override
    public Collection<Cliente> obterTodos()
    {
       return clienteRepositorio.findAll();
    }

    @Override
    public Cliente obterPorId(Integer id)
    {
        Cliente cliente = clienteRepositorio.findById(id).orElse(null);
        return cliente;
    }

    public void limparBanco()
    {
        clienteRepositorio.deleteAll();
    }

    public Object converterToDto(Cliente cliente)
    {
        return clienteMapper.toDto(cliente);
    }
}
