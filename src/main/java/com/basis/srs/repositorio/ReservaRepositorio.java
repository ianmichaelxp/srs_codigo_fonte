package com.basis.srs.repositorio;

import com.basis.srs.dominio.Reserva;
import com.basis.srs.dominio.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepositorio extends JpaRepository<Reserva,Integer>
{
    boolean existsBySala(Sala sala);
}