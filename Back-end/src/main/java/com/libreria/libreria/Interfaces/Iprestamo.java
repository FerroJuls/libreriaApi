package com.libreria.libreria.Interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.Models.prestamo;

@Repository
public interface Iprestamo extends CrudRepository<prestamo, String>{
    
    // @Query ("SELECT p FROM prestamo p WHERE p.estado LIKE %?1%")
    @Query ("SELECT p FROM prestamo p " +
    "JOIN p.usuario u " +
    "JOIN p.libro l " +
    "WHERE p.estado LIKE %?1% OR u.nombre LIKE %?2% OR l.titulo LIKE %?3%")
    List<prestamo> filtroPrestamo(String estado, String nombre,  String titulo);

}
