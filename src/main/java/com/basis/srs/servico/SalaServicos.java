package com.basis.srs.servico;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.servico.dto.SalaEquipamentoDTO;
import com.basis.srs.dominio.Sala;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.repositorio.ReservaRepositorio;
import com.basis.srs.repositorio.SalaEquipamentoRepositorio;
import com.basis.srs.repositorio.SalaRepositorio;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.excecao.RegraNegocioException;
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
    private final EquipamentoRepositorio equipamentoRepositorio;

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
        if (salaDTO.getId() != null) {
           verificarAtualização(salaDTO);
        }
        Sala sala = salaMapper.toEntity(salaDTO);
        List<SalaEquipamento> salaEquipamentos = sala.getEquipamentos();
        sala.setEquipamentos(new ArrayList<>());
        salaRepositorio.save(sala);
        if (salaEquipamentos != null)
        {
            salaEquipamentos.forEach(salaEquipamento ->
            {
                salaEquipamento.setSala(sala);
                salaEquipamento.getSalaEquipamentoPK().setIdSala(sala.getId());
            });
            salaEquipamentoRepositorio.saveAll(salaEquipamentos);
        }
        sala.setEquipamentos(salaEquipamentos);
        return salaMapper.toDto(sala);
    }

    public void removerSala(Integer id)
    {
        Sala sala = salaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Sala não encontrada"));
        salaEquipamentoRepositorio.deleteInBatch(sala.getEquipamentos());
        if(reservaRepositorio.existsBySala(sala)){
            throw new RegraNegocioException("Sala não pode ser removido, pois está reservada");
        }
        salaRepositorio.deleteById(id);
    }
    private void verificarAtualização(SalaDTO salaDTO){
        Sala sala = salaRepositorio.findById(salaMapper.toEntity(salaDTO).getId()).orElse(null);
        List<SalaEquipamentoDTO> salaEquipamentosDTO = salaDTO.getEquipamentos();
        List<SalaEquipamento> salaEquipamentos = sala.getEquipamentos();

            salaEquipamentos.forEach(salaEquipamento ->
        {
            Equipamento equipamento = equipamentoRepositorio.findById(salaEquipamento.getEquipamento().getId()).orElse(null);
            if (salaEquipamentoRepositorio.existsByEquipamento(equipamento))
            {
                salaEquipamentosDTO.forEach(salaEquipamentoDTO ->
                {
                    if(salaEquipamentoDTO.getIdEquipamento() == equipamento.getId())
                    {
                        if(salaEquipamentoDTO.getQuantidade() == 0)
                        {
                            throw new RegraNegocioException("A sala deve possuir este equipamento!");
                        }
                    }
                });
            }
        });
    }
}