package com.basis.srs.repositorio;
import com.basis.srs.dominio.Sala;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaRepositorio extends JpaRepositoryImplementation<Sala,Integer>
{

}
