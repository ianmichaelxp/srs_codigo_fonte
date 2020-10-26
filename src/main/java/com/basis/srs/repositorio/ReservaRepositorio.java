package com.basis.srs.repositorio;

import com.basis.srs.dominio.Cliente;
import com.basis.srs.dominio.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservaRepositorio extends JpaRepository<Reserva,Integer> {
    //boolean existById(Integer id);

    List<Reserva> getAllBySalaId(Integer id);

//    boolean existsByDataInicio(LocalDate dataInicio);

}
