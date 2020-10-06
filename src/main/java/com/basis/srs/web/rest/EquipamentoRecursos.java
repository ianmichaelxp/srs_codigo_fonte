package com.basis.srs.web.rest;
import com.basis.srs.dominio.Equipamento;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.EquipamentoServico;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;



@RestController
@RequestMapping("/api/equipamentos")
@RequiredArgsConstructor
public class EquipamentoRecursos
{
    private final EquipamentoServico equipamentoServico;

    @GetMapping
    public ResponseEntity<List<EquipamentoDTO>> listarEquipamentos()
    {
        return ResponseEntity.ok(equipamentoServico.listarEquipamentos());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EquipamentoDTO> listarEquipamento(@PathVariable(value = "id") Integer id)
    {
        return ResponseEntity.ok(equipamentoServico.listarEquipamento(id));
    }

    @PostMapping
    public ResponseEntity<Equipamento> criarEquipamento(@RequestBody EquipamentoDTO dto) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/clientes/")).body(equipamentoServico.salvarEquipamento(dto));
    }

    @PutMapping
    public ResponseEntity<Equipamento> atualizarEquipamento(@RequestBody EquipamentoDTO equipamentoDTO)
    {
        EquipamentoDTO dto = new EquipamentoDTO();
        return ResponseEntity.ok(equipamentoServico.salvarEquipamento(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerEquipamento(@PathVariable(value = "id")Integer id)
    {
        equipamentoServico.removerEquipamento(id);
        return ResponseEntity.ok().build();
    }
}
