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

    public List<ReservaDTO> listarReservas(){
        return reservaMapper.toDto(reservaRepositorio.findAll());
    }
    public ReservaDTO listarReserva(Integer id){
        return reservaMapper.toDto(reservaRepositorio.findById(id).orElse(null));
    }
    public ReservaDTO salvarReserva(ReservaDTO dto){
        Reserva reserva = reservaMapper.toEntity(dto);
        reservaRepositorio.save(reserva);
        return reservaMapper.toDto(reserva);
    }
    public void deletarReserva(Integer id){
        reservaRepositorio.deleteById(id);
    }
}
