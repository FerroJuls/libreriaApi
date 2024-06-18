package com.libreria.libreria.Models;

// import java.sql.Date;

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
@Entity(name = "multa")

public class multa {
    // Usuario multado.
    // Préstamo
    // Valor multa.
    // Fecha multa.
    // Estado.
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idMulta", nullable = false, length = 36)
    private String idMulta;

    // @ManyToOne
    // @JoinColumn(name = "idUsuario", nullable = false)
    // private usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idPrestamo", nullable = false)
    private prestamo prestamo;

    // @Column(name = "fechaMulta" , nullable = false, length = 10)
    // private Date fechaMulta;

    @Column(name = "valorMulta" , nullable = false, length = 100)
    private String valorMulta;

    @Column(name = "estado", nullable = false, length = 9)
    private String estado;
}
