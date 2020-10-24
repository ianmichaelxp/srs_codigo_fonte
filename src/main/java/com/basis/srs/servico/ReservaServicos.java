package com.basis.srs.servico;

import com.basis.srs.dominio.*;
import com.basis.srs.repositorio.*;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.servico.excecao.RegraNegocioException;
import com.basis.srs.servico.mapper.ClienteMapper;
import com.basis.srs.servico.mapper.ReservaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservaServicos {
    private final ReservaRepositorio reservaRepositorio;

    private final ClienteRepositorio clienteRepositorio;
    private final ReservaEquipamentoRepositorio reservaEquipamentoRepositorio;
    private final SalaRepositorio salaRepositorio;
    private final ReservaMapper reservaMapper;


    public List<ReservaDTO> listarReserva() {

        return reservaMapper.toDto(reservaRepositorio.findAll());
    }

    public ReservaDTO obterPorId(Integer id) {
        return reservaMapper.toDto(reservaRepositorio.findById(id).orElseThrow(() -> new RegraNegocioException("Reserva não foi encontrada")));
    }

    public ReservaDTO salvarReserva(ReservaDTO reservaDTO) {

        {
            if (!clienteRepositorio.existsById(reservaDTO.getIdCliente())) {
                throw new RegraNegocioException("Cadastro não pode ser cadastrada sem um cliente");
            }
            if (!salaRepositorio.existsById(reservaDTO.getIdSala())) {
                throw new RegraNegocioException("Cadastro não pode ser feito sem uma sala");
            }

            Reserva reserva = reservaMapper.toEntity(reservaDTO);
            List<ReservaEquipamento> reservaEquipamentos = reserva.getEquipamentos();
            reserva.setEquipamentos(new ArrayList<>());
            reservaRepositorio.save(reserva);
            reservaEquipamentos.forEach( reservaEquipamento ->
            {
                reservaEquipamento.setReserva(reserva);
                reservaEquipamento.getReservaEquipamentoPK().setIdReserva(reserva.getId());

            });

            reservaEquipamentoRepositorio.saveAll(reservaEquipamentos);
            return reservaMapper.toDto(reserva);

        }

    }
        public void removerReserva(Integer id)
    {
        Reserva reserva = reservaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException(" não encontrada"));
        reservaEquipamentoRepositorio.deleteAll(reserva.getEquipamentos());

        reservaRepositorio.deleteById(id);
    }


}

