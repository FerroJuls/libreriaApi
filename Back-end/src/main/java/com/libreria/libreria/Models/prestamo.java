package com.libreria.libreria.Models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "prestamo")
public class prestamo {
    // o Fecha de préstamo
    // o Fecha de devolución
    // o Usuario que realiza el préstamo
    // o Libro prestado
    // o Estado
    //     1. Préstamo
    //     2. Entregado
    //     3. Cancelado  un libro en muchos prestamos, un usuario en muchas prestamos  
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idPrestamo", nullable = false, length = 36)
    private String idPrestamo;

    @Column(name = "fechaPrestamo" , nullable = false, length = 10)
    private Date fechaPrestamo;

    @Column(name = "fechaDevolucion" , nullable = false, length = 10)
    private Date fechaDevolucion;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idLibro", nullable = false)
    private libro libro;

    @Column(name = "estado", nullable = false, length = 9)
    private String estado;

}
