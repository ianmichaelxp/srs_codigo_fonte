package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class SalaEquipamentoPK implements Serializable
{
    private Integer idSala;

    private Integer idEquipamento;

}