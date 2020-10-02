package com.basis.srs.web.rest;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.servico.ReservaServico;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReservaRecurso {


    private ReservaServico reserva;


        @PostMapping
        public ResponseEntity<Reserva> salvar(@RequestBody Reserva reserva) {
            return null;
        }

        @GetMapping
        public ResponseEntity<Reserva> obter(@RequestBody Reserva reserva) {
            return null;
        }

        @PutMapping
        public ResponseEntity<Reserva> atualizar(@RequestBody Reserva reserva) {
            return null;
        }
        @DeleteMapping
        public ResponseEntity<Reserva> deletar(@RequestBody Reserva reserva) {
            return null;
        }






}

