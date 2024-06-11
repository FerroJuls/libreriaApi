package com.libreria.libreria.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "usuario")
public class usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idUsuario", nullable = false, length = 36)
    private String idUsuario;

    @Column(name = "nombre" , nullable = false, length = 46)
    private String nombre;

    @Column(name = "direccion", nullable = false, length = 46)
    private String direccion;

    @Column(name = "correo", nullable = false, length = 100)
    private String correo;

    @Column(name = "tipoUser", nullable = false, length = 36)
    private String tipoUser;
    
}
