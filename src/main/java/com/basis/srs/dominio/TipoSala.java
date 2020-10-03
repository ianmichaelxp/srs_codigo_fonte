package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name="tipo_sala")
public class TipoSala implements Serializable
{
    @Id
    private int id;
    @Column
    private String descricao;
}
