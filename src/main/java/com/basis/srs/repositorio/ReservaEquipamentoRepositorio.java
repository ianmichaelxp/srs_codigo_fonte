package com.basis.srs.repositorio;

import com.basis.srs.dominio.Equipamento;
import com.basis.srs.dominio.ReservaEquipamento;
import com.basis.srs.dominio.ReservaEquipamentoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaEquipamentoRepositorio extends JpaRepository<ReservaEquipamento, ReservaEquipamentoPK> {



}
