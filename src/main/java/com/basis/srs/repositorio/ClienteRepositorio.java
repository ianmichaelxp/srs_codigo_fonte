package com.basis.srs.repositorio;

import com.basis.srs.dominio.Cliente;
import org.springframework.data.jpa.repository.support.JpaRepositoryImplementation;

public interface ClienteRepositorio extends JpaRepositoryImplementation<Cliente,Integer> {

    boolean existsByCpf(String cpf);

    boolean existsByRg(String rg);

    boolean existsByEmail(String email);

    boolean existsById(Integer id);

}
