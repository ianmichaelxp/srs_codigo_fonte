package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;

<<<<<<< HEAD
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
=======
import javax.persistence.*;
>>>>>>> f99a033b0674891d3110d1dcf0a43e9c70c7532e
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "tipo_equipamento")
<<<<<<< HEAD
public class TipoEquipamento implements Serializable {

    @Id
=======
public class TipoEquipamento implements Serializable 
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_equipamento")
    @SequenceGenerator(name = "seq_equipamento", allocationSize = 1, sequenceName = "seq_equipamento")
>>>>>>> f99a033b0674891d3110d1dcf0a43e9c70c7532e
    @Column(name = "id")
    private Integer id;

    @Column(name = "descricao")
    private String descricao;
}