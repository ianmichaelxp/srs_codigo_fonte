package com.basis.srs.servico;

import com.basis.srs.dominio.Sala;
import com.basis.srs.repositorio.SalaRepositorio;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.mapper.SalaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SalaServico
{
    private SalaRepositorio salaRepositorio;
    private SalaMapper salaMapper;

    public List<SalaDTO> listarSalas(){

        return salaMapper.toDTO(salaRepositorio.findAll());
    }
    public SalaDTO listarSala(@PathVariable(value= "id")Integer id){

        return (SalaDTO) salaMapper.toDTO(salaRepositorio.findById(id));
    }
    public SalaDTO salvarSala(@RequestBody Sala sala){

        return (SalaDTO) salaMapper.toDTO(sala);
        //return null;
    }
    public void removerSala(@PathVariable(value = "id") Integer id){
       // salaMapper.toDTO(salaRepositorio.deleteById(id));
    }

}
