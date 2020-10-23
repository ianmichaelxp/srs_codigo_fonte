package com.basis.srs.web.rest;

import com.basis.srs.builder.EquipamentoBuilder;
import com.basis.srs.builder.SalaBuilder;
import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.Sala;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.dominio.TipoEquipamento;
import com.basis.srs.util.IntTestComum;
import com.basis.srs.util.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@Transactional
public class EquipamentoRecursoIT extends IntTestComum {

    @Autowired
    private EquipamentoBuilder equipamentoBuilder;

    @Autowired
    private SalaBuilder salaBuilder;

    @BeforeEach
    public void restaurarBanco()
    {
        equipamentoBuilder.limparBanco();
    }

    @Test
    public void listar() throws Exception{
        equipamentoBuilder.construir();
        getMockMvc().perform(get("/api/equipamentos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].id", hasSize(1)));
    }

    @Test
    public void salvar() throws Exception{
        Equipamento equipamento = equipamentoBuilder.construirEntidade();
        getMockMvc().perform(post("/api/equipamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(
                    equipamentoBuilder.converterToDto(equipamento))
            ))
                .andExpect(status().isCreated());
    }

    @Test
    public void salvarEquipamentoJaCadastrado() throws Exception {

        Equipamento equipamento = equipamentoBuilder.construirEntidade();
        getMockMvc().perform(post("/api/equipamentos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(
                        equipamentoBuilder.converterToDto(equipamento))
                ));
        getMockMvc().perform(post("/api/equipamentos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(
                        equipamentoBuilder.converterToDto(equipamento))
                ))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void buscarTodos() throws Exception{
        Equipamento equipamento = equipamentoBuilder.construir();
        getMockMvc().perform(get("/api/equipamentos/" + equipamento.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(equipamento.getId()));
    }

    @Test
    public void buscarPorId() throws Exception {
        Equipamento equipamento = equipamentoBuilder.construir();

        getMockMvc().perform(get("/api/equipamentos/"+equipamento.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(equipamento.getId()));
    }

    @Test
    public void buscarPorIdInvalido() throws Exception {
        getMockMvc().perform(get("/api/equipamentos/33321"))
                .andExpect(status().isBadRequest());
    }



    @Test
    public void editar() throws Exception{
        Equipamento equipamento = equipamentoBuilder.construir();

        getMockMvc().perform(put("/api/equipamentos")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(equipamentoBuilder.converterToDto(equipamento))
                ))
                .andExpect(status().isOk());
    }

    @Test
    public void deletarEquipamento() throws Exception{
        Equipamento equipamento = equipamentoBuilder.construir();
        getMockMvc().perform(delete("/api/equipamentos/" + equipamento.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void deletarEquipamentoObrigatorio() throws Exception {
        Sala sala = salaBuilder.construir();
        SalaEquipamento salaEquipamento = sala.getEquipamentos().get(0);
        getMockMvc().perform(delete("/api/equipamentos/"+salaEquipamento.getEquipamento().getId()))
                .andExpect(status().isBadRequest());
    }

}
