package com.basis.srs.web.rest.recursos;

import com.basis.srs.servico.ReservaServicos;
import com.basis.srs.servico.dto.ReservaDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@AllArgsConstructor
public class ReservaRecursos
{
    public final ReservaServicos reservaServicos;

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarReservas()
    {
        return ResponseEntity.ok(reservaServicos.listarReserva());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> obterPorId(@PathVariable Integer id)
    {
        return ResponseEntity.ok(reservaServicos.obterPorId(id));
    }

    @PutMapping
    public ResponseEntity<ReservaDTO> atualizarReservas(@RequestBody @Valid ReservaDTO reservaDTO)
    {
        return ResponseEntity.ok(reservaServicos.salvarReserva(reservaDTO));
    }

    @PostMapping
    public ResponseEntity<ReservaDTO> criarReserva(@RequestBody @Valid ReservaDTO reservaDTO) throws URISyntaxException
    {
        return ResponseEntity.created(new URI("/api/reservas")).body(reservaServicos.salvarReserva(reservaDTO));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> removerReserva(@PathVariable Integer id)
    {
        reservaServicos.removerReserva(id);
        return ResponseEntity.ok().build();
    }
}
