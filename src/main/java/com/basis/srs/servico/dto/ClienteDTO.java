package com.basis.srs.servico.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;


@Getter
@Setter
public class ClienteDTO
{
    @NotNull
    private Integer id;

    @NotNull
    @Size(max = 120)
    private String nome;

    @NotNull
    private String endereco;

    @NotNull
    private LocalDate dataNasc;

    @NotNull
    @Size(min = 11,max = 11)
    private String telefone;

    @NotNull
    @Size(min = 7,max = 7)
    private String rg;

    @NotNull
    @CPF(message= "cpf invalido")
    private String cpf;

    @Email
    @NotNull
    private String email;

}
