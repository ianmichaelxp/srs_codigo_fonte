package com.basis.srs.servico;
import com.basis.srs.dominio.Equipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.mapper.EquipamentoMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    public EquipamentoDTO listarEquipamento(@PathVariable(value= "id")Integer id)
    {
        return equipamentoMapper.toDto(equipamentoRepositorio.findById(id).orElse(null));
    }

    public EquipamentoDTO salvarEquipamento(EquipamentoDTO equipamentoDTO){
        Equipamento equipamento = equipamentoMapper.toEntity(equipamentoDTO);
        equipamentoRepositorio.save(equipamento);
        return equipamentoMapper.toDto(equipamento);
    };

    public void removerEquipamento(@PathVariable(value = "id") Integer id)
    {

        equipamentoRepositorio.deleteById(id);
    }
}
