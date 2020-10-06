package com.basis.srs.repositorio;
import com.basis.srs.dominio.SalaEquipamento;
import com.basis.srs.dominio.SalaEquipamentoPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaEquipamentoRepositorio extends JpaRepository<SalaEquipamento, SalaEquipamentoPK>
{

}
