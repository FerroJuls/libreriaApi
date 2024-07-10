package com.libreria.libreria.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.Interfaces.Imulta;
import com.libreria.libreria.InterfacesService.ImultaService;
import com.libreria.libreria.Models.multa;


@Service
public class multaService implements ImultaService {
    
    @Autowired
    public Imulta data;

    @Override
    public String save(multa multa) {
        data.save(multa);
        return multa.getIdMulta();
    }

    @Override
    public List<multa> findAll() {
        List<multa> listaMulta = (List<multa>) data.findAll();
        return listaMulta;
    }

    @Override
    public Optional<multa> findOne(String id) {
        Optional<multa> multa = data.findById(id);
        return multa;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }

    // Filtro
    
    @Override
    public List<multa> filtroMulta(String filtro) {
        List<multa> listaMulta = data.filtroMulta(filtro, filtro, filtro );
        return listaMulta;
    }
    
    
}
