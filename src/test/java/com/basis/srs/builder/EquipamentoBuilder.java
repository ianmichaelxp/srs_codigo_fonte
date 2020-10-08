package com.basis.srs.builder;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.TipoEquipamento;
import com.basis.srs.repositorio.EquipamentoRepositorio;
import com.basis.srs.servico.EquipamentoServico;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.mapper.EquipamentoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class EquipamentoBuilder extends ConstrutorDeEntidade<Equipamento> {

    @Autowired
    private EquipamentoRepositorio equipamentoRepositorio;

    @Autowired
    private EquipamentoServico equipamentoServico;

    @Autowired
    private EquipamentoMapper equipamentoMapper;

    @Override
    public Equipamento construirEntidade()
    {
        Equipamento equipamento = new Equipamento();
        TipoEquipamento tipoEquipamento = new TipoEquipamento();

        tipoEquipamento.setId(1);
        tipoEquipamento.setDescricao("Descricao qualquer");
        equipamento.setNome("Ian Michael");
        equipamento.setTipoEquipamento(tipoEquipamento);
        equipamento.setPrecoDiario(200.00);
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
        return equipamentoMapper.toEntity(equipamentoServico.listarEquipamento(id));
    }

    @Override
    public EquipamentoDTO converterToDto(Equipamento equipamento) {
        return equipamentoMapper.toDto(equipamento);
    }

    public void excluirPorId(Integer id)
    {
        equipamentoRepositorio.deleteById(id);
    }

    public void restaurarBanco() { equipamentoRepositorio.deleteAll(); }
}
