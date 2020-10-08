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
import java.util.List;


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
    public Cliente construirEntidade() throws ParseException {
        Cliente cliente = new Cliente();
        cliente.setCpf("12345678901");
        cliente.setEmail("matheus@email.com");
        cliente.setRg("1234567");
        cliente.setDataNasc(LocalDate.now());
        cliente.setNome("Matheus");
        cliente.setTelefone("83990909090");
        cliente.setEndereco("DamascoDamasco");
        return cliente;
    }

    public ClienteDTO converterToDTO(Cliente cliente){
        return clienteMapper.toDto(cliente);
    }

    @Override
    protected Cliente persistir(Cliente cliente) {
        ClienteDTO clienteDTO = clienteServicos.salvarCliente(clienteMapper.toDto(cliente));
        return clienteMapper.toEntity(clienteDTO);
    }

    @Override
    protected List<Cliente> obterTodos() {
        List<Cliente> clientes = clienteMapper.toEntity(clienteServicos.listarClientes());
        return clientes;
    }

    @Override
    protected Cliente obterPorId(Integer id) {
        return null;
    }

    public void limparBanco() {
        clienteRepositorio.deleteAll();
    }
}
