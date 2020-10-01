package com.basis.srs.servico;

import com.basis.srs.dominio.Sala;
import com.basis.srs.repositorio.SalaRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SalaServicos
{
    private SalaRepositorio repositorio;

    public List<Sala> listarSalas(){
        return null;
    }
    public Sala listarSala(@PathVariable(value = "id") int id){
        return null;
    }
    public Sala salvarSala(@RequestBody SalaDTO dto){
        return null;
    }
    public Sala atualizarSala(@RequestBody SalaDTO dto){
        return null;
    }
    public void removerConta(@PathVariable(value = "id") int id){

    }

}
