package com.basis.srs.servico;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.dominio.Reserva;
import com.basis.srs.repositorio.ClienteRepositorio;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.servico.dto.ClienteDTO;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.servico.excecao.RegraNegocioException;
import com.basis.srs.servico.mapper.ClienteMapper;
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
    private final Cliente cliente;
    //private final ClienteRepositorio clienteRepositorio;
    private final ReservaMapper reservaMapper;


    public List<ReservaDTO> listarReserva()
    {

        return reservaMapper.toDto(reservaRepositorio.findAll());
    }

    public ReservaDTO obterPorId(Integer id)
    {
        return reservaMapper.toDto(reservaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Reserva não foi encontrada")));
    }

    public ReservaDTO salvarReserva(ReservaDTO reservaDTO) {
       //List<Cliente> clientes = clienteRepositorio.findAll();
        List<Reserva> reservas = reservaRepositorio.findAll();
        reservas.forEach(reserva ->
        {
            if (reserva.getSala().equals(reservaDTO.getIdSala()) && reserva.getDataInicio().equals(reservaDTO.getDataFim()))
            {
                throw new RegraNegocioException("Sala já reservada");
            }
            if (cliente.getId().equals(null)){
                throw new RegraNegocioException("Sala não pode ser cadastrada sem um cliente");
        }
        });


        Reserva reserva = reservaRepositorio.save(reservaMapper.toEntity(reservaDTO));
        return reservaMapper.toDto(reserva);
    }

    public void removerReserva(Integer id)
      {
          List<Reserva> reservas = reservaRepositorio.findAll();
          reservas.forEach(reserva ->
          {
              if (reserva.getId().equals(null))
              {
                  throw new RegraNegocioException("Reserva não existe");
              }
          });

        reservaRepositorio.deleteById(id);
    }
}
