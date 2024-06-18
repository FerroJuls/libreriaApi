package com.libreria.libreria.Interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.libreria.libreria.Models.multa;


public interface Imulta extends CrudRepository<multa, String>{
    
    @Query ("SELECT m FROM multa m WHERE m.estado LIKE %?1%")
    List<multa> filtroMulta(String filtro);

     
}
