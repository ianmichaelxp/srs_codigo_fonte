package com.basis.srs.builder;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.TipoEquipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.servico.EquipamentoServicos;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.mapper.EquipamentoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.List;

@Component
public class EquipamentoBuilder extends ConstrutorDeEntidade<Equipamento> {

    @Autowired
    private EquipamentoRepositorio equipamentoRepositorio;

    @Autowired
    private EquipamentoServicos equipamentoServico;

    @Autowired
    private EquipamentoMapper equipamentoMapper;

    @Override
    public Equipamento construirEntidade() throws ParseException
    {
        Equipamento equipamento = new Equipamento();
        TipoEquipamento tipoEquipamento = new TipoEquipamento();

        tipoEquipamento.setId(1);
        equipamento.setNome("Notebook");
        equipamento.setTipoEquipamento(tipoEquipamento);
        equipamento.setPrecoDiario(50.00);
        equipamento.setEquipamentoObrigatorio(1);

        return equipamento;
    }

    @Override
    protected Equipamento persistir(Equipamento equipamento)
    {
        return equipamentoMapper.toEntity((equipamentoServico.salvarEquipamento(equipamentoMapper.toDto(equipamento))));
    }

    @Override
    public List<Equipamento> obterTodos()
    {
        List<Equipamento> equipamentos = equipamentoMapper.toEntity(equipamentoServico.listarEquipamentos());
        return equipamentos;
    }

    @Override
    protected Equipamento obterPorId(Integer id)
    {
        return equipamentoMapper.toEntity(equipamentoServico.obterPorId(id));
    }

    public EquipamentoDTO converterToDto(Equipamento equipamento) {
        return equipamentoMapper.toDto(equipamento);
    }

    public void limparBanco() { equipamentoRepositorio.deleteAll(); }
}
