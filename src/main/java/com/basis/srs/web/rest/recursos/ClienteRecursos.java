package com.basis.srs.web.rest.recursos;

import com.basis.srs.servico.ClienteServicos;
import com.basis.srs.servico.dto.ClienteDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
public class ClienteRecursos
{
    public final ClienteServicos servicos;

    @GetMapping
    public ResponseEntity<List<ClienteDTO>> listarClientes()
    {
        return ResponseEntity.ok(servicos.listarClientes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> obterPorId(@PathVariable Integer id)
    {
        return ResponseEntity.ok(servicos.obterPorId(id));
    }

    @PutMapping
    public ResponseEntity<ClienteDTO> atualizarCliente(@Validated @RequestBody ClienteDTO cliente)
    {
        return ResponseEntity.ok(servicos.salvarCliente(cliente));
    }

    @PostMapping
    public ResponseEntity<ClienteDTO> criarCliente(@Validated @RequestBody ClienteDTO cliente) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/cliente")).body(servicos.salvarCliente(cliente));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> removerCliente(@PathVariable Integer id)
    {
        servicos.removerCliente(id);
        return ResponseEntity.ok().build();
    }
}
