package com.basis.srs.web.rest;

import com.basis.srs.builder.ClienteBuilder;
import com.basis.srs.builder.ReservaBuilder;
import com.basis.srs.dominio.Cliente;
import com.basis.srs.util.IntTestComum;
import com.basis.srs.util.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@Transactional
public class ClienteRecursoIT extends IntTestComum {
    @Autowired
    private ClienteBuilder clienteBuilder;

    @Autowired
    private ReservaBuilder reservaBuilder;

    @BeforeEach
    public void limparBanco() {
        clienteBuilder.limparBanco();
        reservaBuilder.limparBanco();
    }

    public void testeJaCadastrado(Cliente cliente) throws Exception
    {
        getMockMvc().perform((post("/api/clientes/"))
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(clienteBuilder.converterToDto(cliente))))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void listar() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        getMockMvc().perform(get("/api/clientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id", hasSize(1)));
    }

    @Test
    public void salvar() throws Exception
    {
        Cliente cliente = clienteBuilder.construirEntidade();
        getMockMvc().perform((post("/api/clientes"))
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(clienteBuilder.converterToDto(cliente))))
                .andExpect(status().isCreated());
    }

    @Test
    public void obterPorId() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        getMockMvc().perform((get("/api/clientes/"+cliente.getId())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(cliente.getId()));
    }

    @Test
    public void atualizar() throws Exception
    {
        Cliente cliente = clienteBuilder.construirEntidade();
        getMockMvc().perform(put("/api/clientes")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(clienteBuilder.converterToDto(cliente))))
                .andExpect(status().isOk());
    }

    @Test
    public void deletar() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        getMockMvc().perform(delete("/api/clientes/"+ cliente.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void cpfJaCadastrado() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        cliente.setRg("1231111");
        cliente.setEmail("daniel123@gmail.com");
        testeJaCadastrado(cliente);
    }

    @Test
    public void rgJaCadastrado() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        cliente.setCpf("98781769083");
        cliente.setEmail("daniel123@gmail.com");
        testeJaCadastrado(cliente);
    }

    @Test
    public void emailJaCadastrado() throws Exception
    {
        Cliente cliente = clienteBuilder.construir();
        cliente.setCpf("98781769083");
        cliente.setRg("1231111");
        testeJaCadastrado(cliente);
    }

    @Test
    public void idNaoExistente() throws Exception
    {
        getMockMvc().perform((get("/api/clientes/" + 1)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void clienteComReserva() throws Exception
    {
        reservaBuilder.construir();
        getMockMvc().perform(delete("/api/clientes/"+ reservaBuilder.obterPorId(1)))
                .andExpect(status().isBadRequest());
    }


}
