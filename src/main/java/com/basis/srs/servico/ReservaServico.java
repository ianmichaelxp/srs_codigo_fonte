package com.basis.srs.servico;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.repositorio.ReservaRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class ReservaServico {


        private ReservaRepositorio reservaRepositorio;


        //get
        public List<Reserva> ListarReservas() {
            return reservaRepositorio.findAll();

        }
        //get
        public Reserva obterReservaPorCodigo(int id) {

            return null; reservaRepositorio.findById(id).get();
        }

        //post

        public Reserva criarReserva(Reserva reserva) {
            return reservaRepositorio.save(reserva);
        }

        //put

        public void atualizarReserva(Reserva reserva) {

            reservaRepositorio.save(reserva);
        }

        //delete

        public void deletarReserva(int id) {

            reservaRepositorio.deleteById(id);
        }

}


