package com.libreria.libreria.Interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.libreria.libreria.Models.multa;


public interface Imulta extends CrudRepository<multa, String>{
    
    // @Query ("SELECT m FROM multa m WHERE m.estado LIKE %?1%")
    // List<multa> filtroMulta(String filtro);

    @Query ("SELECT m FROM multa m " +
    "JOIN m.prestamo.usuario u " +
    "JOIN m.prestamo.libro l " +
    "WHERE m.estado LIKE %?1% OR u.nombre LIKE %?2% OR l.titulo LIKE %?3%" )
    List<multa> filtroMulta(String estado, String nombre,  String titulo);
}
