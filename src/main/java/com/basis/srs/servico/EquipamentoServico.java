package com.basis.srs.servico;
import com.basis.srs.dominio.Equipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.mapper.EquipamentoMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EquipamentoServico
{
    private final EquipamentoRepositorio equipamentoRepositorio;
    private final EquipamentoMapper equipamentoMapper;

    public List<EquipamentoDTO> listarEquipamentos()
    {
        return equipamentoMapper.toDto(equipamentoRepositorio.findAll());
    }

    public EquipamentoDTO listarEquipamento(Integer id)
    {
        return equipamentoMapper.toDto(equipamentoRepositorio.findById(id).orElse(null));
    }

    public EquipamentoDTO salvarEquipamento(EquipamentoDTO dto){
        Equipamento equipamento = equipamentoMapper.toEntity(dto);
        equipamentoRepositorio.save(equipamento);
        return equipamentoMapper.toDto(equipamento);
    }

    public void removerEquipamento(Integer id)
    {
        equipamentoRepositorio.deleteById(id);
    }
}