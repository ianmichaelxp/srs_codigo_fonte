package com.basis.srs.builder;


import com.basis.srs.dominio.*;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.ReservaServicos;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.servico.mapper.ReservaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Component
public class ReservaBuilder extends ConstrutorDeEntidade<Reserva> {

    @Autowired
    private ReservaServicos reservaServicos;
    @Autowired
    private ReservaMapper reservaMapper;
    @Autowired
    private ReservaRepositorio reservaRepositorio;
    @Autowired
    private ClienteBuilder clienteBuilder;
    @Autowired
    private SalaBuilder salaBuilder;
    @Autowired
    private EquipamentoBuilder equipamentoBuilder;


    public void limparBanco(){
        reservaRepositorio.deleteAll();
    }

    @Override
    public Reserva construirEntidade() throws ParseException {
        Reserva reserva = new Reserva();
        reserva.setDataInicio(LocalDate.now().plusDays(1));
        reserva.setDataFim(LocalDate.now().plusDays(90));
        reserva.setPrecoFinal(200.00);

        Cliente cliente = clienteBuilder.construir();
        Sala sala = salaBuilder.construir();

        reserva.setCliente(cliente);
        reserva.setSala(sala);

        Equipamento equipamento = equipamentoBuilder.construir();

        ReservaEquipamento reservaEquipamento = new ReservaEquipamento();
        reservaEquipamento.setEquipamento(equipamento);
        reservaEquipamento.setReserva(reserva);
        reservaEquipamento.setQuantidade(2);

        reserva.setEquipamentos(Collections.singletonList(reservaEquipamento));

        return reserva;
    }

    @Override
    public Reserva persistir(Reserva dto) {
        return reservaMapper.toEntity(reservaServicos.salvarReserva(reservaMapper.toDto(dto),null));
    }


    @Override
    public Collection obterTodos() {
        List<Reserva> reserva = reservaMapper.toEntity(reservaServicos.listarReserva());
        return reserva;
    }

    @Override
    public Reserva obterPorId(Integer id) {

        Reserva reserva = reservaRepositorio.findById(id).orElse(null);
        return reserva;
    }

    public void excluirPorId(Integer id)
    {
        reservaRepositorio.deleteById(id);
    }

    public ReservaDTO converterToDto(Reserva reserva) {

        return reservaMapper.toDto(reserva);
    }



}

