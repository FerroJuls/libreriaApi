
// URL de la API se declara una url por si se modifica solo cambiar donde la declaro y no entodas las demas partes
var url = "http://localhost:8080/api/v1/libro/";


// este metodo solo permite letras
const letrasPermitidas = [
    'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 
    'N', 'Ñ', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm',
    'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'v', 'w', 'x', 'y', 'z', ' '
];
const numerosPermitidos = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ''
];
const signosPermitidos = [
    '.', ',', '@', '_', '-', '#', ''
];

// FORMA CORTA
function soloLetras(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!(letrasPermitidas.includes(event.key))){
        event.preventDefault();
        return;
    }
}
function soloNumeros(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!(numerosPermitidos.includes(event.key))){
        event.preventDefault();
        return;
    }
}
function soloSignos(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!(signosPermitidos.includes(event.key))){
        event.preventDefault();
        return;
    }
}
function alfaNumericos(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!((numerosPermitidos.includes(event.key)) || (letrasPermitidas.includes(event.key)))){
        event.preventDefault();
        return;
    }
}



// FORMA LARGA
// function soloLetras(event) {
//     console.log("Llave presionada: " + event.key);
//     console.log("Codigo tecla: " + event.keyCode);
//     if (!((event.keyCode >= 65 && event.keyCode <= 90) 
//         || (event.keyCode >= 97 && event.keyCode <= 122) 
//         || (event.keyCode > 224 && event.keyCode < 226) 
//         || (event.keyCode > 232 && event.keyCode < 234) 
//         || (event.keyCode > 236 && event.keyCode < 238) 
//         || (event.keyCode > 242 && event.keyCode < 244) 
//         || (event.keyCode > 249 && event.keyCode < 251) 
//         || (event.keyCode > 192 && event.keyCode < 194) 
//         || (event.keyCode > 200 && event.keyCode < 202) 
//         || (event.keyCode > 204 && event.keyCode < 206) 
//         || (event.keyCode > 210 && event.keyCode < 212) 
//         || (event.keyCode > 217 && event.keyCode < 219) 
//         || (event.keyCode > 240 && event.keyCode < 242) 
//         || (event.keyCode > 208 && event.keyCode < 210) 
//         || (event.keyCode > 31 && event.keyCode < 33))) {
//         event.preventDefault();
//         return;
//     } else {

//     }
// }

// hacemos la funcion del filtro 
function buscarLibroPorFiltro(filtro) {
    if (filtro.trim() !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/libro/busquedaFiltros/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idLibro"]}</td>
                        <td class="align-middle">${result[i]["titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["autor"]}</td>
                        <td class="text-center align-middle">${result[i]["isbn"]}</td>
                        <td class="text-center align-middle">${result[i]["genero"]}</td>
                        <td class="text-center align-middle">${result[i]["numEjemplarDisponible"]}</td>
                        <td class="text-center align-middle">${result[i]["numEjemplarOcupado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    } else {
        // Si el filtro está vacío, llamar a la función para listar todos los libros
        listarLibro();
    }
}


// Función para listar los libros registrados en la Api
function listarLibro() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idLibro"]}</td>
                    <td class="align-middle">${result[i]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["autor"]}</td>
                    <td class="text-center align-middle">${result[i]["isbn"]}</td>
                    <td class="text-center align-middle">${result[i]["genero"]}</td>
                    <td class="text-center align-middle">${result[i]["numEjemplarDisponible"]}</td>
                    <td class="text-center align-middle">${result[i]["numEjemplarOcupado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
                    </td>
                `;
                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición: " + error);
        }
    });
}

// hacemos la funcion para que al limpiar la barra quede en blanco para que escribas y busques en el filtro por otro nombre
function blanquearCampos() {
    document.getElementById('texto').value = "";
}

// funcion para registrar un libro con campos obligatorios 
var registrarLibroBandera = true;

// Función para registrar un libro en la api
function registrarLibro() {
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor");
    var isbn = document.getElementById("isbn");
    var genero = document.getElementById("genero");
    var numEjemplarDisponible = document.getElementById("numEjemplarDisponible");
    var numEjemplarOcupado = document.getElementById("numEjemplarOcupado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarTitulo(titulo) ||
        !validarAutor(autor) ||
        !validarisbn(isbn) ||
        !validarGenero(genero) ||
        !validarNumEjemplarDisponible(numEjemplarDisponible) ||
        !validarNumEjemplarOcupado(numEjemplarOcupado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "titulo": titulo.value,
        "autor": autor.value,
        "isbn": isbn.value,
        "genero": genero.value,
        "numEjemplarDisponible": numEjemplarDisponible.value,
        "numEjemplarOcupado": numEjemplarOcupado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarLibroBandera == true) {
        metodo = "POST";
        urlLocal = url;

    } else {
        metodo = "PUT";
        urlLocal = url + idLibro;
    }

    if (validarCampos()) {
        $.ajax({
            url: urlLocal,
            type: metodo,
            data: forData,
            success: function (response) {
                limpiar();
                Swal.fire({
                    title: "LISTO",
                    text: "Felicidades, Registro exitoso",
                    icon: "success"
                }).then(function () {
                    // Aquí puedes agregar más acciones después del registro exitoso
                    $('#exampleModal').modal('hide');
                    listarLibro(); // Aquí se vuelve a listar los productos
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El libro esta prestado!",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
    }
};

// Función para validar campos
// Función para validar campos

function validarCampos() {
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor");
    var isbn = document.getElementById("isbn");
    var genero = document.getElementById("genero");
    var numEjemplarDisponible = document.getElementById("numEjemplarDisponible");
    var numEjemplarOcupado = document.getElementById("numEjemplarOcupado");

    return validarTitulo(titulo) && validarAutor(autor) && validarisbn(isbn) &&
        validarGenero(genero) && validarNumEjemplarDisponible(numEjemplarDisponible) &&
        validarNumEjemplarOcupado(numEjemplarOcupado);
}

// Función titulo 
function validarTitulo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 101) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función autor
function validarAutor(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 47) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función isbn
function validarisbn(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 16) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función genero
function validarGenero(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 37) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función numEjemplarDisponible
function validarNumEjemplarDisponible(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 101) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función numEjemplarOcupado
function validarNumEjemplarOcupado(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 101) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("titulo").value = "";
    document.getElementById("titulo").className = "form-control";
    document.getElementById("autor").value = "";
    document.getElementById("autor").className = "form-control";
    document.getElementById("isbn").value = "";
    document.getElementById("isbn").className = "form-control";
    document.getElementById("genero").value = "";
    document.getElementById("genero").className = "form-control";
    document.getElementById("numEjemplarDisponible").value = "";
    document.getElementById("numEjemplarDisponible").className = "form-control";
    document.getElementById("numEjemplarOcupado").value = "";
    document.getElementById("numEjemplarOcupado").className = "form-control";
}

var idLibro = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idLibro = $(this).data("id");

    $.ajax({
        url: url + idLibro,
        type: "GET",
        success: function (libro) {
            document.getElementById("titulo").value = libro.titulo;
            document.getElementById("autor").value = libro.autor;
            document.getElementById("isbn").value = libro.isbn;
            document.getElementById("genero").value = libro.genero;
            document.getElementById("numEjemplarDisponible").value = libro.numEjemplarDisponible;
            document.getElementById("numEjemplarOcupado").value = libro.numEjemplarOcupado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del libro: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del cliente desde el atributo data del elemento clicado
    var idLibro = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar estos Libros?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarLibro/" + idLibro,
                type: "DELETE",
                success: function (eliminarLibro) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Libro Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de cliente después de eliminar
                    listarLibro();
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        title: "Error",
                        text: "¡El libro esta prestado!",
                        icon: "error"
                    });
                }
            });
        }
    });
});

// Llamar a la función para listar cliente al cargar la página
$(document).ready(function () {
    listarLibro();
});
function actualizarlistarLibro() {
    listarLibro();
}




const generos = [
   "Ficción",
   "No Ficción",
   "Ciencia Ficción",
   "Fantasía",
   "Misterio",
   "Romance",
   "Histórico",
   "Biografía",
   "Terror",
   "Autoayuda",
   "Aventura",
   "Thriller",
   "Drama",
   "Suspense",
   "Literatura Contemporánea",
   "Literatura Clásica",
   "Literatura Juvenil",
   "Poesía",
   "Ensayo",
   "Crítica Literaria",
   "Cómic",
   "Graphic Novel",
   "Novela Gráfica",
   "Dystopía",
   "Utopía",
   "Relato Corto",
   "Novela Negra",
   "Policial",
   "Histórica",
   "Erótica",
   "Ficción Histórica",
   "Horror",
   "Gótico",
   "Magical Realism",
   "Literatura Infantil",
   "Ficción Especulativa",
   "Contemporáneo",
   "Romántica",
   "Narrativa",
   "Espionaje",
   "Política",
   "Economía",
   "Autobiografía",
   "Memorias",
   "Diario",
   "Ensayo Académico",
   "Fábula",
   "Sátira",
   "Parodia",
   "Novela Romántica",
   "Novela Histórica",
   "Realismo Mágico",
   "Mitología",
   "Espiritualidad",
   "Ciencia Popular",
   "Ficción Realista",
   "Relatos de Terror",
   "Novela de Formación",
   "Novela Experimental",
   "Teatro",
   "Manga",
   "Anime",
   "Noir",
   "Ficción Alternativa",
   "Ficción de Viajes en el Tiempo",
   "Ficción de Superhéroes",
   "Literatura de Viajes",
   "Relatos de Viajes",
   "Ciencia y Tecnología",
   "Crónica",
   "Género de Supervivencia",
   "Género de Fantasía Épica",
   "Género de Ciencia Ficción Dura",
   "Género de Ciencia Ficción Blanda",
   "Ficción Aventura",
   "Ficción de Espionaje",
   "Ficción de Guerra",
   "Literatura Infantil Temprana",
   "Literatura para Pre-adolescentes",
   "Biografía Autorizada",
   "Biografía No Autorizada",
   "Ensayo Personal",
   "Ensayo Crítico",
   "Ficción de Fantasía Urbana",
   "Ficción de Ciencia Ficción Social",
   "Ficción de Ciencia Ficción Militar",
   "Ficción de Ciencia Ficción Cyberpunk",
   "Novela de Espionaje de Ciencia Ficción",
   "Novela de Espionaje Histórico",
   "Novela de Ciencia Ficción Policial",
   "Literatura Indígena",
   "Literatura Postcolonial",
   "Literatura Africana",
   "Literatura Latinoamericana",
   "Literatura de Autoayuda Espiritual",
   "Literatura de Autoayuda Profesional",
   "Novela de Desarrollo Personal"
];

const input = document.getElementById('genero');
const listContainer = document.getElementById('autocomplete-list');

input.addEventListener('input', function () {
   const query = this.value.toLowerCase();
   listContainer.innerHTML = '';

   if (query) {
      const filteredGeneros = generos.filter(genero => genero.toLowerCase().includes(query));

      filteredGeneros.forEach(genero => {
         const item = document.createElement('div');
         item.textContent = genero;
         item.className = 'autocomplete-item';
         item.addEventListener('click', function () {
            input.value = genero;
            listContainer.innerHTML = '';
         });
         listContainer.appendChild(item);
      });
   }
});

document.addEventListener('click', function (event) {
   if (!input.contains(event.target) && !listContainer.contains(event.target)) {
      listContainer.innerHTML = '';
   }
});