// hacemos la funcion del filtro 
function buscarLibroPorFiltro(filtro) {
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
                    <td class="text-center align-middle">${result[i]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["autor"]}</td>
                    <td class="text-center align-middle">${result[i]["ISBN"]}</td>
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

// URL de la API se declara una url por si se modifica solo cambiar donde la declaro y no entodas las demas partes
var url = "http://localhost:8080/api/v1/libro/";

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
                    <td class="text-center align-middle">${result[i]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["autor"]}</td>
                    <td class="text-center align-middle">${result[i]["ISBN"]}</td>
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

// funcion para registrar un libro con campos obligatorios 
var registrarLibroBandera = true;

// Función para registrar un libro en la api
function registrarLibro() {
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor");
    var ISBN = document.getElementById("ISBN");
    var genero = document.getElementById("genero");
    var numEjemplarDisponible = document.getElementById("numEjemplarDisponible");
    var numEjemplarOcupado = document.getElementById("numEjemplarOcupado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarTitulo(titulo) ||
        !validarAutor(autor) ||
        !validarISBN(ISBN) ||
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
        "ISBN": ISBN.value,
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


// Función titulo 
function validarCamposTitulo() {
    var titulo = document.getElementById("titulo");
    return validarTitulo(titulo);
}
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
function validarCamposAutor() {
    var autor = document.getElementById("autor");
    return validarAutor(autor);
}
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


// Función ISBN
function validarCamposISBN() {
    var ISBN = document.getElementById("ISBN");
    return validarISBN(ISBN);
}
function validarISBN(cuadroNumero) {
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
function validarCamposGenero() {
    var genero = document.getElementById("genero");
    return validarGenero(genero);
}
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
function validarCamposNumEjemplarDisponible() {
    var numEjemplarDisponible = document.getElementById("numEjemplarDisponible");
    return validarNumEjemplarDisponible(numEjemplarDisponible);
}
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
function validarCamposNumEjemplarOcupado() {
    var numEjemplarOcupado = document.getElementById("numEjemplarOcupado");
    return validarNumEjemplarOcupado(numEjemplarOcupado);
}
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
    document.getElementById("ISBN").value = "";
    document.getElementById("ISBN").className = "form-control";
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
            document.getElementById("ISBN").value = libro.ISBN;
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
                // error: function (xhr, status, error) {
                //     // Manejo de errores
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'El registro tiene un ingreso.'
                //     });
                // }
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