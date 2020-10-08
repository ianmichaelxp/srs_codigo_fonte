package com.basis.srs.servico;

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

        return salaMapper.toDto(salaRepositorio.findById(id).orElse(null));
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
        salaRepositorio.deleteById(id);
    }
}
