package com.libreria.libreria.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.Interfaces.Iprestamo;
import com.libreria.libreria.InterfacesService.IprestamoService;
import com.libreria.libreria.Models.prestamo;

@Service
public class prestamoService implements IprestamoService{
    
    @Autowired
    public Iprestamo data;

    @Override
    public String save(prestamo prestamo) {
        data.save(prestamo);
        return prestamo.getIdPrestamo();
    }

    @Override
    public List<prestamo> findAll() {
        List<prestamo> listaPrestamo = (List<prestamo>) data.findAll();
        return listaPrestamo;
    }

    @Override
    public Optional<prestamo> findOne(String id) {
        Optional<prestamo> prestamo = data.findById(id);
        return prestamo;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }

    // Filtro
    
    @Override
    public List<prestamo> filtroPrestamo(String filtro) {
        List<prestamo> listaPrestamo = data.filtroPrestamo(filtro, filtro, filtro );
        return listaPrestamo;
    }
    
}
