package com.basis.srs.servico;


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

    public SalaDTO salvarSala(SalaDTO salaDTO, Integer id)
    {
        if(id!= null){
            Sala sala = salaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Sala não encontrada"));
            salaEquipamentoRepositorio.deleteAll(sala.getEquipamentos());
        }

        Sala sala = salaMapper.toEntity(salaDTO);
        List<SalaEquipamento> salaEquipamentos = sala.getEquipamentos();
        sala.setEquipamentos(new ArrayList<>());
        salaRepositorio.save(sala);

        salaEquipamentos.forEach(salaEquipamento ->
        {
            salaEquipamento.setSala(sala);
            salaEquipamento.getSalaEquipamentoPK().setIdSala(sala.getId());
        });
        salaEquipamentoRepositorio.saveAll(salaEquipamentos);

        sala.setEquipamentos(salaEquipamentos);
        return salaMapper.toDto(sala);
    }


    public void removerSala(Integer id)
    {
        Sala sala = salaRepositorio.findById(id).orElseThrow(()-> new RegraNegocioException("Sala não encontrada"));
        if(reservaRepositorio.existsBySala(sala)){
            throw new RegraNegocioException("Sala não pode ser removido, pois está reservada");
        }
        salaEquipamentoRepositorio.deleteAll(sala.getEquipamentos());
        salaRepositorio.deleteById(id);
    }

}