package com.basis.srs.servico;

import br.com.basis.sgp.servico.exception.RegraNegocioException;
import com.basis.srs.dominio.Reserva;
import com.basis.srs.dominio.Sala;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.repositorio.SalaEquipamentoRepositorio;
import com.basis.srs.repositorio.SalaRepositorio;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.mapper.SalaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SalaServicos
{
    private final SalaRepositorio salaRepositorio;
    private final SalaEquipamentoRepositorio salaEquipamentoRepositorio;
    private final ReservaRepositorio reservaRepositorio;
    private final SalaMapper salaMapper;

    public List<SalaDTO> listarSalas()
    {
        return salaMapper.toDto(salaRepositorio.findAll());
    }

    public SalaDTO obterPorId(Integer id)
    {
        return salaMapper.toDto(salaRepositorio.findById(id)
                .orElseThrow(()-> new RegraNegocioException("Sala não Encontrada")));
    }

    public SalaDTO salvarSala(SalaDTO salaDTO)
    {
        Sala sala = salaMapper.toEntity(salaDTO);
        List<SalaEquipamento> equipamentos = sala.getEquipamentos();
        sala.setEquipamentos(new ArrayList<>());
        salaRepositorio.save(sala);
        equipamentos.forEach(equipamento ->
        {
           equipamento.setSala(sala);
           equipamento.getSalaEquipamentoPK().setIdSala(sala.getId());
        });
        salaEquipamentoRepositorio.saveAll(equipamentos);
        return salaMapper.toDto(sala);
    }

    public void removerSala(Integer id)
    {
        Sala sala = salaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Sala não encontrada"));
        salaEquipamentoRepositorio.deleteInBatch(sala.getEquipamentos());

        List<Reserva> reservas = reservaRepositorio.findAll();
        reservas.forEach(reserva ->
                {
                    if (reserva.getSala().getId().equals(id))
                    {
                        throw new RegraNegocioException("Não pode remover sala quando há uma reserva cadastrada");
                    }
                });
        obterPorId(id);
        salaRepositorio.deleteById(id);
    }
}
