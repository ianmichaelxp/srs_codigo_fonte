package com.basis.srs.servico;
import com.basis.srs.dominio.Sala;
import com.basis.srs.dominio.TipoEquipamento;
import com.basis.srs.servico.exception.RegraNegocioException;
import com.basis.srs.dominio.Equipamento;
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
        List<EquipamentoDTO> equipamentosDTO = equipamentoMapper.toDto(equipamentoRepositorio.findAll());
        return equipamentosDTO;
    }

    public EquipamentoDTO obterPorId(Integer id)
    {
        EquipamentoDTO equipamentoDTO = equipamentoMapper.toDto(equipamentoRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Equipamento não encontrado!")));
        return equipamentoDTO;
    }

    public EquipamentoDTO salvarEquipamento(EquipamentoDTO dto)
    {
        Equipamento equipamento = equipamentoMapper.toEntity(dto);
        if(dto.getId() == null) existeEquipamento(equipamento, dto);
        equipamentoRepositorio.save(equipamento);
        EquipamentoDTO equipamentoDTO = equipamentoMapper.toDto(equipamento);
        return equipamentoDTO;
    }


    public void existeEquipamento(Equipamento equipamentoEntity, EquipamentoDTO equipamentoDTO){

        if(equipamentoRepositorio.existsByNome(equipamentoDTO.getNome()))
        {
            Equipamento equipamento = equipamentoRepositorio.findByNome(equipamentoDTO.getNome());

            if(equipamentoEntity.getPrecoDiario().equals(equipamento.getPrecoDiario()) &&
                    equipamentoEntity.getTipoEquipamento().getId().equals(equipamento.getTipoEquipamento().getId()))
            {
                throw new RegraNegocioException("Este equipamento já existe");
            }
        }
    }

    public void removerEquipamento(Integer id)
    {
        {
            if (salaEquipamentoRepositorio.existsByEquipamentoId(id))
            {
                throw new RegraNegocioException("Esse equipamento é obrigatório e não pode ser excluído!");
            }
        }
        equipamentoRepositorio.deleteById(id);
    }
}
