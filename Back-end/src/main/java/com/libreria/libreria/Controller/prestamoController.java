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

import com.libreria.libreria.InterfacesService.IprestamoService;
import com.libreria.libreria.Models.prestamo;


@RequestMapping("/api/v1/prestamo")
@RestController
public class prestamoController {
    
    @Autowired
    private IprestamoService prestamoService;

    @PostMapping("/")
     public ResponseEntity<Object> save (@ModelAttribute("prestamo") prestamo prestamo){
        prestamoService.save(prestamo);
        //obtener el libro
        //prestamo.getLibro();
        //controller libro
        //actualizar el libro
        prestamo.getLibro().setNumEjemplarDisponible(prestamo.getLibro().getNumEjemplarDisponible()-1);
        prestamo.getLibro().setNumEjemplarOcupado(prestamo.getLibro().getNumEjemplarOcupado()+1);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaPrestamo = prestamoService.findAll();
        return new ResponseEntity<>(listaPrestamo, HttpStatus.OK);
    }

    @GetMapping("/busquedaFiltros/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaPrestamo = prestamoService.filtroPrestamo(filtro);
        return new ResponseEntity<>(listaPrestamo, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var prestamo = prestamoService.findOne(id);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPrestamo/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        prestamoService.deleteForever(id);
        return new ResponseEntity<>("Prestamo eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("prestamo") prestamo prestamoUpdate) {
        var prestamo = prestamoService.findOne(id).get();

        if (prestamo != null) {

            prestamo.setFechaPrestamo(prestamoUpdate.getFechaPrestamo());
            prestamo.setFechaDevolucion(prestamoUpdate.getFechaDevolucion());
            prestamo.setUsuario(prestamoUpdate.getUsuario());
            prestamo.setLibro(prestamoUpdate.getLibro());
            prestamo.setEstado(prestamoUpdate.getEstado());

            prestamoService.save(prestamo);
            return new ResponseEntity<>(prestamo, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error prestamo No encontrado", HttpStatus.BAD_REQUEST);
        }
    }
    
}
