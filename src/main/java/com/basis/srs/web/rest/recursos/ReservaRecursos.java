package com.basis.srs.web.rest.recursos;


import com.basis.srs.servico.ReservaServicos;
import com.basis.srs.servico.dto.ReservaDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaRecursos 
{
    private final ReservaServicos reservaServico;

    @GetMapping
    public ResponseEntity<List<ReservaDTO>> listarReservas()
    {
        return ResponseEntity.ok(reservaServico.listarReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> listarReserva(@PathVariable(value = "id") Integer id)
    {
        return ResponseEntity.ok(reservaServico.listarReserva(id));
    }

    @PostMapping
    public ResponseEntity<ReservaDTO> cadastrarReserva(@RequestBody ReservaDTO ReservaDTO) throws URISyntaxException {

        ReservaDTO reserva = reservaServico.salvarReserva(ReservaDTO);

        return ResponseEntity.created(new URI("/api/reservas")).body(reserva);
    };

    @PutMapping
    public ResponseEntity<ReservaDTO> atualizarReserva(@RequestBody ReservaDTO reservaDTO)
    {
        ReservaDTO dto = reservaServico.salvarReserva(reservaDTO);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerReserva(@PathVariable Integer id)
    {
        reservaServico.deletarReserva(id);
        return ResponseEntity.ok().build();
    }
}
