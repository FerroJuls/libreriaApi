package com.libreria.libreria.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.Interfaces.Ilibro;
import com.libreria.libreria.InterfacesService.IlibroService;
import com.libreria.libreria.Models.libro;

@Service
public class libroService implements IlibroService{
    
    @Autowired
    public Ilibro data;

    @Override
    public String save(libro libro) {
        data.save(libro);
        return libro.getIdLibro();
    }

    @Override
    public List<libro> findAll() {
        List<libro> listaLibro = (List<libro>) data.findAll();
        return listaLibro;
    }

    @Override
    public Optional<libro> findOne(String id) {
        Optional<libro> libro = data.findById(id);
        return libro;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }

    // Filtro
    
    @Override
    public List<libro> filtroLibro(String filtro) {
        List<libro> listaLibro = data.filtroLibro(filtro );
        return listaLibro;
    }
}
