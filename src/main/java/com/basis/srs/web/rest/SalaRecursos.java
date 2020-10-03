package com.basis.srs.web.rest;

import com.basis.srs.dominio.Sala;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.SalaServico;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/salas")
@AllArgsConstructor
public class SalaRecursos
{
    private SalaServico salaServico;

    @GetMapping
    public ResponseEntity<List<SalaDTO>> listarSalas(){

        return ResponseEntity.ok(salaServico.listarSalas());
    }
    @GetMapping("/{id}")
    public ResponseEntity<SalaDTO> listarSala(@PathVariable(value = "id") Integer id){

        return ResponseEntity.ok(salaServico.listarSala(id));
    }
    @PostMapping
    public ResponseEntity<Sala> criarSala(@RequestBody SalaDTO dto) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/clientes/")).body(salaServico.salvarSala(dto));
    }
    @PutMapping
    public ResponseEntity<Sala> atualizarSala(@RequestBody SalaDTO salaDTO){
        SalaDTO dto = new SalaDTO();
        return ResponseEntity.ok(salaServico.salvarSala(dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerSala(@PathVariable(value = "id")Integer id){
        salaServico.removerSala(id);
        return ResponseEntity.ok().build();
    }
}
