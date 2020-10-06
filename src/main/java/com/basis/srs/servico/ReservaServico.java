package com.basis.srs.servico;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.mapper.ReservaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class ReservaServico {


    private final ReservaRepositorio repositorio;
    private final ReservaMapper mapper;

    public List<ReservaDTO> listarReservas()
    {
        return mapper.toDto(repositorio.findAll());
    }

    public ReservaDTO obterPorId(Integer id)
    {
        return mapper.toDto(repositorio.findById(id).orElse(null));
    }

    public Reserva salvarReserva(ReservaDTO Reserva)
    {
        return  repositorio.save(mapper.toEntity(Reserva));
    }

    public void removerReserva(Integer id)
    {
        repositorio.deleteById(id);
    }

}


