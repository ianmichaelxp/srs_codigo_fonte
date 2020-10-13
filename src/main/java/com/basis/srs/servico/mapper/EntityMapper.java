package com.basis.srs.servico.mapper;

import java.util.List;

public interface EntityMapper<D, E>
{
    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List<D> toDto(List<E> entityList);
<<<<<<< HEAD
}
=======
}
>>>>>>> f99a033b0674891d3110d1dcf0a43e9c70c7532e
