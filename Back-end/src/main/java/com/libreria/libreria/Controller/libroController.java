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

import com.libreria.libreria.InterfacesService.IlibroService;
import com.libreria.libreria.Models.libro;

@RequestMapping("/api/v1/libro")
@RestController
public class libroController {
    
    @Autowired
    private IlibroService libroService;

    @PostMapping("/")
     public ResponseEntity<Object> save (@ModelAttribute("libro") libro libro){
        libroService.save(libro);
        return new ResponseEntity<>(libro, HttpStatus.OK);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaLibro = libroService.findAll();
        return new ResponseEntity<>(listaLibro, HttpStatus.OK);
    }

    @GetMapping("/busquedaFiltros/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaLibro = libroService.filtroLibro(filtro);
        return new ResponseEntity<>(listaLibro, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var libro = libroService.findOne(id);
        return new ResponseEntity<>(libro, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarLibro/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        libroService.deleteForever(id);
        return new ResponseEntity<>("Libro eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("libro") libro libroUpdate) {
        var libro = libroService.findOne(id).get();

        if (libro != null) {

            libro.setTitulo(libroUpdate.getTitulo());
            libro.setAutor(libroUpdate.getAutor());
            libro.setIsbn(libroUpdate.getIsbn());
            libro.setGenero(libroUpdate.getGenero());
            libro.setNumEjemplarDisponible(libroUpdate.getNumEjemplarDisponible());
            libro.setNumEjemplarOcupado(libroUpdate.getNumEjemplarOcupado());

            libroService.save(libro);
            return new ResponseEntity<>(libro, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error libro No encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}
