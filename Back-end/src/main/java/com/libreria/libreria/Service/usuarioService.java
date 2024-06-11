package com.libreria.libreria.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.Interfaces.Iusuario;
import com.libreria.libreria.InterfacesService.IusuarioService;
import com.libreria.libreria.Models.usuario;

@Service 
public class usuarioService implements IusuarioService {

    @Autowired
    private Iusuario data;

    @Override
    public String save(usuario usuario) {
        data.save(usuario);
        return usuario.getIdUsuario();
    }

    @Override
    public List<usuario> findAll(){
        List<usuario> listaUsuario = (List<usuario>) data.findAll();
        return listaUsuario;
    }

    @Override
    public Optional<usuario> findOne(String id){
        Optional<usuario> usuario = data.findById(id);
        return usuario;
    }

    @Override
    public int deleteForever(String id){
        data.deleteById(id);
        return 1;
    }

    // Filtro
    
    @Override
    public List<usuario> filtroUsuario(String filtro) {
        List<usuario> listaUsuario = data.filtroUsuario(filtro);
        return listaUsuario;
    }



}
