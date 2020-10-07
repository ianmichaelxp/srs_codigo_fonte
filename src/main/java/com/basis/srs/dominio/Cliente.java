package com.basis.srs.dominio;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "cliente")
public class Cliente implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_cliente")
    @SequenceGenerator(name = "seq_cliente", allocationSize = 1, sequenceName = "seq_cliente")
    @Column(name = "id")
    private Integer id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "data_nascimento")
    private Date dataNasc;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "rg")
    private String rg;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "email")
    private String email;
}
