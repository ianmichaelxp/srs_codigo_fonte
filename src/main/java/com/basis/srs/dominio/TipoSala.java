package com.basis.srs.dominio;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity @Data
public class TipoSala
{
    @Id
    private int id;
    @Column
    private String descricao;
}
