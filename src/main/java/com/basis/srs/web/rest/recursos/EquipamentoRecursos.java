package com.basis.srs.web.rest.recursos;
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
    public ResponseEntity<EquipamentoDTO> cadastrarEquipamento(@RequestBody EquipamentoDTO equipamentoDTO) throws URISyntaxException {

        EquipamentoDTO equipamentoSalvo = equipamentoServico.salvarEquipamento(equipamentoDTO);

        return ResponseEntity.created(new URI("/api/equipamentos")).body(equipamentoSalvo);
    };

    @PutMapping
    public ResponseEntity<EquipamentoDTO> atualizarEquipamento(@RequestBody EquipamentoDTO equipamentoDTO)
    {
        EquipamentoDTO dto = equipamentoServico.salvarEquipamento(equipamentoDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerEquipamento(@PathVariable Integer id)
    {
        equipamentoServico.removerEquipamento(id);
        return ResponseEntity.ok().build();
    }
}
