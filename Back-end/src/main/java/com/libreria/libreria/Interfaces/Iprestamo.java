package com.libreria.libreria.Interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.Models.prestamo;

@Repository
public interface Iprestamo extends CrudRepository<prestamo, String>{
    
    @Query ("SELECT p FROM prestamo p WHERE p.estado LIKE %?1%")
    List<prestamo> filtroPrestamo(String filtro);

}
