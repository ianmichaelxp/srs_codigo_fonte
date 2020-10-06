package com.basis.srs.web.rest;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.servico.dto.ReservaDTO;
import com.basis.srs.servico.ReservaServico;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@AllArgsConstructor
public class ReservaRecurso {


    public final ReservaServico servicos;

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarReserva()
    {
        return ResponseEntity.ok(servicos.listarReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> obterPorId(@PathVariable Integer id)
    {
        return ResponseEntity.ok(servicos.obterPorId(id));
    }

    @PutMapping
    public ResponseEntity<Reserva> atualizarReserva(@RequestBody ReservaDTO reserva)
    {
        return ResponseEntity.ok(servicos.salvarReserva(reserva));
    }

    @PostMapping
    public ResponseEntity<Reserva> salvarReserva(@RequestBody ReservaDTO reserva) throws URISyntaxException {
        return ResponseEntity.created(new URI("/api/reservas")).body(servicos.salvarReserva(reserva));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> removerReserva(@PathVariable Integer id)
    {
        servicos.removerReserva(id);
        return ResponseEntity.ok().build();
    }


}

