package com.basis.srs.web.rest;

import com.basis.srs.dominio.Sala;
import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.SalaServico;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.URISyntax;
import javax.xml.ws.Response;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/salas")
@RequiredArgsConstructor
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
    public ResponseEntity<SalaDTO> criarSala(@RequestBody SalaDTO dto) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/clientes/")).body(dto);
    }
    @PutMapping
    public ResponseEntity<SalaDTO> atualizarSala(@RequestBody SalaDTO salaDTO){
        SalaDTO dto = new SalaDTO();
        return ResponseEntity.ok(dto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerSala(@PathVariable(value = "id")Integer id){

        return ResponseEntity.ok().build();
    }
}
