
// URL de la API se declara una url por si se modifica solo cambiar donde la declaro y no entodas las demas partes
var url = "http://localhost:8080/api/v1/prestamo/";

// hacemos la funcion del filtro 
function buscarPrestamoPorFiltro(filtro) {
    if (filtro.trim() !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/prestamo/busquedaFiltros/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaDevolucion"]}</td>
                        <td class="text-center align-middle">${result[i]["usuario"]["nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["libro"]["titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarPrestamoBandera=false;" data-id="${result[i]["idPrestamo"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idPrestamo"]}"></i>
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
        listarPrestamo();
    }
}


// Función para listar los libros registrados en la Api
function listarPrestamo() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                        <td>${result[i]["idPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaDevolucion"]}</td>
                        <td class="text-center align-middle">${result[i]["usuario"]["nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["libro"]["titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarPrestamoBandera=false;" data-id="${result[i]["idPrestamo"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idPrestamo"]}"></i>
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

// Llamar a las funciones para cargar las listas al cargar la página
$(document).ready(function () {
    cargarUsuarioActivos();
});

// Función para cargar la lista de pacientes activos
function cargarUsuarioActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/usuario/",
        type: "GET",
        success: function (result) {
            result.forEach(function (usuario) {
                $("#usuario").append(`<option value="${usuario.idUsuario}">${usuario.nombre}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar clientes activos:", error);
        }
    });
}

// Llamar a las funciones para cargar las listas al cargar la página
$(document).ready(function () {
    cargarLibroActivos();
});

// Función para cargar la lista de pacientes activos
function cargarLibroActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/libro/",
        type: "GET",
        success: function (result) {
            result.forEach(function (libro) {
                $("#libro").append(`<option value="${libro.idLibro}">${libro.titulo}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar clientes activos:", error);
        }
    });
}


// hacemos la funcion para que al limpiar la barra quede en blanco para que escribas y busques en el filtro por otro nombre
function blanquearCampos() {
    document.getElementById('texto').value = "";
}

// funcion para registrar un libro con campos obligatorios 
var registrarPrestamoBandera = true;

// Función para registrar un libro en la api
function registrarPrestamo() {
    var fechaPrestamo = document.getElementById("fechaPrestamo");
    var fechaDevolucion = document.getElementById("fechaDevolucion");
    var usuario = document.getElementById("usuario");
    var libro = document.getElementById("libro");
    var estado = document.getElementById("estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarfechaPrestamo(fechaPrestamo) ||
        !validarfechaDevolucion(fechaDevolucion) ||
        !validarusuario(usuario) ||
        !validarlibro(libro) ||
        !validarestado(estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "fechaPrestamo": fechaPrestamo.value,
        "fechaDevolucion": fechaDevolucion.value,
        "usuario": usuario.value,
        "libro": libro.value,
        "estado": estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarPrestamoBandera == true) {
        metodo = "POST";
        urlLocal = url;

    } else {
        metodo = "PUT";
        urlLocal = url + idPrestamo;
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
                    listarPrestamo(); // Aquí se vuelve a listar los productos
                });
            },
            error: function (request, error) {
                alert("Request: " + JSON.stringify(request));
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
    var fechaPrestamo = document.getElementById("fechaPrestamo");
    var fechaDevolucion = document.getElementById("fechaDevolucion");
    var usuario = document.getElementById("usuario");
    var libro = document.getElementById("libro");
    var estado = document.getElementById("estado");

    return validarfechaPrestamo(fechaPrestamo) && validarfechaDevolucion(fechaDevolucion) && validarusuario(usuario) &&
        validarlibro(libro) && validarestado(estado);
}

// Función fechaPrestamo 
function validarfechaPrestamo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función fechaDevolucion
function validarfechaDevolucion(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función usuario
function validarusuario(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 100) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función libro
function validarlibro(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 100) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función estado
function validarestado(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 15) {
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
    document.getElementById("fechaPrestamo").value = "";
    document.getElementById("fechaPrestamo").className = "form-control";
    document.getElementById("fechaDevolucion").value = "";
    document.getElementById("fechaDevolucion").className = "form-control";
    document.getElementById("usuario").value = "";
    document.getElementById("usuario").className = "form-control";
    document.getElementById("libro").value = "";
    document.getElementById("libro").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

var idPrestamo = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idPrestamo = $(this).data("id");

    $.ajax({
        url: url + idPrestamo,
        type: "GET",
        success: function (prestamo) {
            document.getElementById("fechaPrestamo").value = prestamo.fechaPrestamo;
            document.getElementById("fechaDevolucion").value = prestamo.fechaDevolucion;
            document.getElementById("usuario").value = prestamo.usuario.idUsuario;
            document.getElementById("libro").value = prestamo.libro.idLibro;
            document.getElementById("estado").value = prestamo.estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del prestamo: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del cliente desde el atributo data del elemento clicado
    var idPrestamo = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este prestamo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPrestamo/" + idPrestamo,
                type: "DELETE",
                success: function (eliminarPrestamo) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Prestamo Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de cliente después de eliminar
                    listarPrestamo();
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
    listarPrestamo();
});
function actualizarlistarPrestamo() {
    listarPrestamo();
}

function obtenerFechaActual() {
    const hoy = new Date();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();

    // Ajuste para tener el formato adecuado con dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    return hoy.getFullYear() + '-' + mes + '-' + dia;
}

// Función para establecer la fecha de préstamo por defecto y limitar fechas anteriores
function configurarFechaPrestamo() {
    const fechaPrestamoInput = document.getElementById('fechaPrestamo');
    fechaPrestamoInput.value = obtenerFechaActual();
    fechaPrestamoInput.setAttribute('min', obtenerFechaActual());
}

// Función para calcular y establecer la fecha de devolución por defecto (3 meses después)
function configurarFechaDevolucion() {
    const fechaDevolucionInput = document.getElementById('fechaDevolucion');
    const fechaPrestamo = new Date(document.getElementById('fechaPrestamo').value);
    fechaPrestamo.setMonth(fechaPrestamo.getMonth() + 1); // Sumar 3 meses
    let mes = fechaPrestamo.getMonth() + 1;
    let dia = fechaPrestamo.getDate();

    // Ajuste para tener el formato adecuado con dos dígitos
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;

    const fechaDevolucion = fechaPrestamo.getFullYear() + '-' + mes + '-' + dia;
    fechaDevolucionInput.value = fechaDevolucion;
}

// Llamar a las funciones al cargar la página
window.onload = function() {
    configurarFechaPrestamo();
    configurarFechaDevolucion();
};

// Event listener para actualizar la fecha de devolución si cambia la fecha de préstamo
document.getElementById('fechaPrestamo').addEventListener('change', function() {
    configurarFechaDevolucion();
});