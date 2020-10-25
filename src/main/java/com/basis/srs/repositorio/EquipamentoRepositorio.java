package com.basis.srs.repositorio;
import com.basis.srs.dominio.Equipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipamentoRepositorio extends JpaRepository<Equipamento,Integer>
{
    boolean existsByNome(String nome);

    List<Equipamento> findByNome(String nome);
}
