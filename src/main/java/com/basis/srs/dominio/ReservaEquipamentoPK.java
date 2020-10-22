package com.basis.srs.dominio;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
public class ReservaEquipamentoPK implements Serializable {

    private Integer idReserva;

    private Integer idEquipamento;

}
