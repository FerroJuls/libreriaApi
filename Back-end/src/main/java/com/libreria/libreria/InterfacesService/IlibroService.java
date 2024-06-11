package com.libreria.libreria.InterfacesService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.Models.libro;

public interface IlibroService {

    public String save(libro libro);

    public List<libro> findAll();

    public Optional<libro> findOne(String id);

    public int deleteForever(String id);

    // Filtro
    public List<libro> filtroLibro(String filtro);

}
