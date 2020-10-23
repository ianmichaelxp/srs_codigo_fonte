package com.basis.srs.web.rest;


import com.basis.srs.builder.ReservaBuilder;
import com.basis.srs.dominio.Reserva;

import com.basis.srs.util.IntTestComum;
import com.basis.srs.util.TestUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringRunner.class)
@Transactional
public class ReservaRecursoIT extends IntTestComum {



    @Autowired
    private ReservaBuilder reservaBuilder;

    @BeforeEach
    public void limparBanco() throws Exception {
        reservaBuilder.limparBanco();

    }


    @Test
    public void listar() throws Exception {
        reservaBuilder.construir();
        getMockMvc().perform(get("/api/reservas"))
                .andExpect(status().isOk());



    }


    @Test
    public void salvar() throws Exception{
        Reserva reserva = reservaBuilder.construirEntidade();
        getMockMvc().perform(post("/api/reservas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(
                        reservaBuilder.converterToDto(reserva))))
                .andExpect(status().isCreated());

    }

    @Test
    public void buscar() throws Exception{
        Reserva reserva = (Reserva) reservaBuilder.construir();
        getMockMvc().perform(get("/api/reservas/" + reserva.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(reserva.getId()));

    }

    @Test
    public void editar() throws Exception{
        Reserva reserva = reservaBuilder.construir();

        getMockMvc().perform(put("/api/reservas")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(reservaBuilder.converterToDto(reserva))
                ))
                .andExpect(status().isOk());


    }

    @Test
    public void deletar() throws Exception{
        Reserva reserva = reservaBuilder.construir();
        getMockMvc().perform(delete("/api/reservas/" + reserva.getId()))
                .andExpect(status().isOk());
    }

}



