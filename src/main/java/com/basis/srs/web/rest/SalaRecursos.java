package com.basis.srs.web.rest;

import com.basis.srs.dominio.Sala;
import com.basis.srs.servico.SalaDTO;
import com.basis.srs.servico.SalaServicos;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
@RequiredArgsConstructor
public class SalaRecursos
{
    private SalaServicos servicos;

    @GetMapping
    public List<Sala> listarSalas(){
        return servicos.listarSalas();
    }
    @GetMapping("/{id}")
    public Sala listarSala(@PathVariable(value = "id") int id){
        return servicos.listarSala(id);
    }
    @PostMapping
    public Sala criarSala(@RequestBody SalaDTO dto){
        Sala sala = servicos.salvarSala(dto);
        return sala;
    }
    @PutMapping
    public Sala atualizarSala(@RequestBody SalaDTO dto){
        Sala sala = servicos.atualizarSala(dto);
        return sala;
    }
    @DeleteMapping("/{id}")
    public void removerSala(@PathVariable(value = "id")int id){
        servicos.removerConta(id);
    }
}
