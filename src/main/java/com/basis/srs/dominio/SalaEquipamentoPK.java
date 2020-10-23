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
    @Column(name="id_sala")
    private Integer idSala;

    @Column(name="id_equipamento")
    private Integer idEquipamento;

}
