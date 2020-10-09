package com.basis.srs.servico;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.repositorio.SalaEquipamentoRepositorio;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.mapper.EquipamentoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EquipamentoServicos
{
    private final EquipamentoRepositorio equipamentoRepositorio;

    private final EquipamentoMapper equipamentoMapper;

    private final SalaEquipamentoRepositorio salaEquipamentoRepositorio;

    public List<EquipamentoDTO> listarEquipamentos()
    {
        return equipamentoMapper.toDto(equipamentoRepositorio.findAll());
    }

    public EquipamentoDTO obterPorId(Integer id)
    {
        return equipamentoMapper.toDto(equipamentoRepositorio.findById(id).orElse(null));
    }

    public EquipamentoDTO salvarEquipamento(EquipamentoDTO equipamentoDTO)
    {
        Equipamento equipamento = equipamentoMapper.toEntity(equipamentoDTO);
        equipamentoRepositorio.save(equipamento);
        return equipamentoMapper.toDto(equipamento);
    };

    public void removerEquipamento(Integer id)
    {
        equipamentoRepositorio.deleteById(id);
    }
}
