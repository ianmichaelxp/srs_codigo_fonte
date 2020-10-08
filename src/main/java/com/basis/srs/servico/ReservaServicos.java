package com.basis.srs.servico;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.servico.mapper.ReservaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservaServicos
{
    private final ReservaRepositorio reservaRepositorio;
    private final ReservaMapper reservaMapper;

    public List<ReservaDTO> listarReserva()
    {
        return reservaMapper.toDto(reservaRepositorio.findAll());
    }

    public ReservaDTO obterPorId(Integer id)
    {
        return reservaMapper.toDto(reservaRepositorio.findById(id).orElse(null));
    }

    public ReservaDTO salvarReserva(ReservaDTO reservaDTO)
    {
        Reserva reserva = reservaRepositorio.save(reservaMapper.toEntity(reservaDTO));
        return reservaMapper.toDto(reserva);
    }

    public void removerReserva(Integer id)
    {
        reservaRepositorio.deleteById(id);
    }
}
