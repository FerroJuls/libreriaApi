package com.libreria.libreria.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.InterfacesService.ImultaService;
import com.libreria.libreria.Models.multa;




@RequestMapping("/api/v1/multa")
@RestController

public class multaController {
    
    @Autowired
    private ImultaService multaService;

    @PostMapping("/")
     public ResponseEntity<Object> save (@ModelAttribute("multa") multa multa){
        multaService.save(multa);
        return new ResponseEntity<>(multa, HttpStatus.OK);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaMulta = multaService.findAll();
        return new ResponseEntity<>(listaMulta, HttpStatus.OK);
    }

    @GetMapping("/busquedaFiltros/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaMulta = multaService.filtroMulta(filtro);
        return new ResponseEntity<>(listaMulta, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var multa = multaService.findOne(id);
        return new ResponseEntity<>(multa, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarMulta/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        multaService.deleteForever(id);
        return new ResponseEntity<>("multa eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("multa") multa multaUpdate) {
        var multa = multaService.findOne(id).get();

        if (multa != null) {

            multa.setPrestamo(multaUpdate.getPrestamo());
            multa.setValorMulta(multaUpdate.getValorMulta());
            multa.setEstado(multaUpdate.getEstado());

            multaService.save(multa);
            return new ResponseEntity<>(multa, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error multa No encontrado", HttpStatus.BAD_REQUEST);
        }
    }
    
    
}
