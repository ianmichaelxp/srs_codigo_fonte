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
import java.util.Collection;

@Component
public class EquipamentoBuilder extends ConstrutorDeEntidade<Equipamento>
{
    @Autowired
    private EquipamentoMapper equipamentoMapper;

    @Autowired
    private EquipamentoServicos equipamentoServicos;

    @Autowired
    private EquipamentoRepositorio equipamentoRepositorio;

    public void limparBanco(){
        equipamentoRepositorio.deleteAll();
    }

    public EquipamentoDTO converterToDTO(Equipamento equipamento){
        return equipamentoMapper.toDto(equipamento);
    }

    @Override
    public Equipamento construirEntidade() throws ParseException {
        Equipamento equipamento = new Equipamento();
        TipoEquipamento tipoEquipamento = new TipoEquipamento();

        equipamento.setNome("notebook");
        equipamento.setPrecoDiario(50.00);
        equipamento.setTipoEquipamento(tipoEquipamento);
        return equipamento;
    }

    @Override
    protected Equipamento persistir(Equipamento entidade) {
        return null;
    }

    @Override
    protected Collection<Equipamento> obterTodos() {
        return null;
    }

    @Override
    protected Equipamento obterPorId(Integer id) {
        return null;
    }
}
