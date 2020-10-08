package com.basis.srs.builder;

import com.basis.srs.dominio.*;
import com.basis.srs.repositorio.SalaRepositorio;
import com.basis.srs.servico.SalaServicos;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.dto.SalaEquipamentoDTO;
import com.basis.srs.servico.mapper.SalaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Collections;
import java.util.List;

@Component
public class SalaBuilder extends ConstrutorDeEntidade<Sala>{

    @Autowired
    private SalaRepositorio salaRepositorio;

    @Autowired
    private SalaMapper salaMapper;

    @Autowired
    private SalaServicos salaServicos;

    @Autowired
    private EquipamentoBuilder equipamentoBuilder;

    public SalaDTO converterToDTO(Sala sala){
        return salaMapper.toDto(sala);
    }

    @Override
    public Sala construirEntidade() throws ParseException
    {
        Equipamento equipamento = equipamentoBuilder.construir();
        Sala sala = new Sala();
        TipoSala tipoSala = new TipoSala();
        tipoSala.setId(1);
        tipoSala.setDescricao("aaaa");
        SalaEquipamento salaEquipamento = new SalaEquipamento();

        sala.setCapacidadePessoas(10);
        sala.setDescricao("Sala de auditorio");
        sala.setPrecoDiario(90.0);
        sala.setTipoSala(tipoSala);
        salaEquipamento.setEquipamento(equipamento);
        salaEquipamento.setSala(sala);
        salaEquipamento.setQuantidade(2);
        sala.setEquipamentos(Collections.singletonList(salaEquipamento));

        return sala;
    }

    public void limparBanco(){
        salaRepositorio.deleteAll();
    }

    @Override
    public Sala persistir(Sala sala)
    {
        SalaDTO dto = salaServicos.salvarSala(salaMapper.toDto(sala));
        return salaMapper.toEntity(dto);
    }

    @Override
    public List<Sala> obterTodos() {
        List<Sala> salas = salaMapper.toEntity(salaServicos.listarSalas());
        return salas;
    }

    @Override
    public Sala obterPorId(Integer id) {
        return salaMapper.toEntity(salaServicos.obterPorId(id));
    }
}
