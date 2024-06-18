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
@Entity(name = "libro")
public class libro {
    // titulo
    // autor
    // ISBN
    // Genero
    // Numero de ejemplares disponibles = numEjemplarpDisponible
    // Numero de ejemplares ocupado = numEjemplarOcupado

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idLibro", nullable = false, length = 36)
    private String idLibro;

    @Column(name = "titulo" , nullable = false, length = 100)
    private String titulo;

    @Column(name = "autor", nullable = false, length = 46)
    private String autor;

    @Column(name = "isbn", nullable = false, length = 15)
    private String isbn;

    @Column(name = "genero", nullable = false, length = 36)
    private String genero;

    @Column(name = "numEjemplarDisponible", nullable = false, length = 100)
    private int numEjemplarDisponible;

    @Column(name = "numEjemplarOcupado", nullable = false, length = 100)
    private int numEjemplarOcupado;


}
