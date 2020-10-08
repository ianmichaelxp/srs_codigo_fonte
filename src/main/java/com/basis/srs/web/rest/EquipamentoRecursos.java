package com.basis.srs.web.rest;
import com.basis.srs.servico.dto.EquipamentoDTO;
import com.basis.srs.servico.EquipamentoServico;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    /*
    public ResponseEntity<EquipamentoDTO> listar(@PathVariable(value = "id") Integer id)

    return ResponseEntity.ok(

     */

    @PostMapping
    public ResponseEntity<EquipamentoDTO> cadastrarEquipamento(@Valid @RequestBody EquipamentoDTO dto) throws URISyntaxException
    {
        EquipamentoDTO equipamentoDTO = equipamentoServico.salvarEquipamento(dto);
        return ResponseEntity.created(new URI("/api/equipamentos/")).body(equipamentoDTO);
    }

    @PutMapping
    public ResponseEntity<EquipamentoDTO> atualizarEquipamento(@Valid @RequestBody EquipamentoDTO dto)
    {
        EquipamentoDTO equipamentoDTO = equipamentoServico.salvarEquipamento(dto);
        return ResponseEntity.ok(equipamentoDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerEquipamento(@PathVariable(value = "id")Integer id)
    {
        equipamentoServico.removerEquipamento(id);
        return ResponseEntity.ok().build();
    }
}
