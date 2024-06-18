package com.libreria.libreria.InterfacesService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.Models.prestamo;

public interface IprestamoService {

    public String save(prestamo prestamo);

    public List<prestamo> findAll();

    public Optional<prestamo> findOne(String id);

    public int deleteForever(String id);

    // Filtro
    public List<prestamo> filtroPrestamo(String filtro);
    
    
}
