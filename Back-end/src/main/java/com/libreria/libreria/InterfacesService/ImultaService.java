package com.libreria.libreria.InterfacesService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.Models.multa;


public interface ImultaService {

    public String save(multa multa);

    public List<multa> findAll();

    public Optional<multa> findOne(String id);

    public int deleteForever(String id);

    // Filtro
    public List<multa> filtroMulta(String filtro);
    
}
