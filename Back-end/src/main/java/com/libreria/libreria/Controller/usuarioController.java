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

import com.libreria.libreria.InterfacesService.IusuarioService;
import com.libreria.libreria.Models.usuario;

@RequestMapping("/api/v1/usuario")
@RestController

public class usuarioController {
    
    @Autowired
    private IusuarioService usuarioService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("usuario") usuario usuario){
        usuarioService.save(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }
    
    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaUsuario = usuarioService.findAll();
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

    @GetMapping("/busquedaFiltros/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaUsuario = usuarioService.filtroUsuario(filtro);
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var usuario = usuarioService.findOne(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/eliminarUsuario/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        usuarioService.deleteForever(id);
        return new ResponseEntity<>("Libro eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("usuario") usuario usuarioUpdate) {
        var usuario = usuarioService.findOne(id).get();

        if (usuario != null) {

            usuario.setNombre(usuarioUpdate.getNombre());
            usuario.setDireccion(usuarioUpdate.getDireccion());
            usuario.setCorreo(usuarioUpdate.getCorreo());
            usuario.setTipoUser(usuarioUpdate.getTipoUser());

            usuarioService.save(usuario);
            return new ResponseEntity<>(usuario, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error usuario No encontrado", HttpStatus.BAD_REQUEST);
        }
    }

}
