package com.basis.srs.web.rest.recursos;

import com.basis.srs.servico.dto.SalaDTO;
import com.basis.srs.servico.SalaServicos;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/salas")
@RequiredArgsConstructor
@CrossOrigin({"*"})
public class SalaRecursos
{
    private final SalaServicos salaServico;

    @GetMapping
    public ResponseEntity<List<SalaDTO>> listarSalas()
    {
        return ResponseEntity.ok(salaServico.listarSalas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalaDTO> obterPorId(@PathVariable(value = "id") Integer id)
    {
        return ResponseEntity.ok(salaServico.obterPorId(id));
    }

    @PostMapping
    public ResponseEntity<SalaDTO> criarSala(@Valid @RequestBody SalaDTO dto) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/salas/")).body(salaServico.salvarSala(dto));
    }

    @PutMapping
    public ResponseEntity<SalaDTO> atualizarSala(@Valid @RequestBody SalaDTO salaDTO)
    {
        SalaDTO dto = salaServico.salvarSala(salaDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerSala(@PathVariable(value = "id") Integer id)
    {
        salaServico.removerSala(id);
        return ResponseEntity.ok().build();
    }
}
