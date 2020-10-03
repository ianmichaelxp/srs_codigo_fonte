package com.basis.srs.servico.mapper;
import com.basis.srs.dominio.Sala;

import java.util.List;
import java.util.Optional;

public interface EntityMapper<D, E>
{
    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List<D> toDto(List<E> entityList);
}
