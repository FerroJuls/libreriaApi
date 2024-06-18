
// URL de la API se declara una url por si se modifica solo cambiar donde la declaro y no entodas las demas partes
var url = "http://localhost:8080/api/v1/multa/";

// hacemos la funcion del filtro 
function buscarMultaPorFiltro(filtro) {
    if (filtro.trim() !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/multa/busquedaFiltros/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["prestamo"]["usuario"]["nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["prestamo"]["libro"]["titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["prestamo"]["fechaDevolucion"]}</td>
                        <td class="text-center align-middle">${result[i]["valorMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarMultaBandera=false;" data-id="${result[i]["idMulta"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idMulta"]}"></i>
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
        // Si el filtro está vacío, llamar a la función para listar todos los valorMultas
        listarMulta();
    }
}


// Función para listar los valorMultas registrados en la Api
function listarMulta() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idMulta"]}</td>
                    <td class="text-center align-middle">${result[i]["prestamo"]["usuario"]["nombre"]}</td>
                    <td class="text-center align-middle">${result[i]["prestamo"]["libro"]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["prestamo"]["fechaDevolucion"]}</td>
                    <td class="text-center align-middle">${result[i]["valorMulta"]}</td>
                    <td class="text-center align-middle">${result[i]["estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar" onclick="registrarMultaBandera=false;" data-id="${result[i]["idMulta"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idMulta"]}"></i>
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
    cargarPrestamoActivos();
});

// Función para cargar la lista de pacientes activos
function cargarPrestamoActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/prestamo/",
        type: "GET",
        success: function (result) {
            result.forEach(function (prestamo) {
                $("#prestamo").append(`<option value="${prestamo.idPrestamo}">${prestamo.fechaDevolucion} - ${prestamo.libro.titulo} - ${prestamo.usuario.nombre} </option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar prestamos activos:", error);
        }
    });
}

// $(document).ready(function () {
//     cargarusuariooActivos();
// });

// // Función para cargar la lista de pacientes activos
// function cargarusuariooActivos() {
//     $.ajax({
//         url: "http://localhost:8080/api/v1/prestamo/",
//         type: "GET",
//         success: function (result) {
//             result.forEach(function (prestamo) {
//                 $("#usuario").append(`<option value="${prestamo.idPrestamo}">${prestamo.usuario.nombre}</option>`);
//             });
//         },
//         error: function (error) {
//             console.error("Error al cargar prestamos activos:", error);
//         }
//     });
// }

// $(document).ready(function () {
//     cargarfechaMultaActivos();
// });

// // Función para cargar la lista de pacientes activos
// function cargarfechaMultaActivos() {
//     $.ajax({
//         url: "http://localhost:8080/api/v1/prestamo/",
//         type: "GET",
//         success: function (result) {
//             result.forEach(function (prestamo) {
//                 // Obtener fecha de devolución
//                 var fechaDevolucion = new Date(prestamo.fechaDevolucion);
                
//                 // Obtener día, mes y año
//                 var dia = fechaDevolucion.getDate();
//                 var mes = fechaDevolucion.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1
//                 var anio = fechaDevolucion.getFullYear();
                
//                 // Formatear la fecha como día/mes/año
//                 var fechaFormateada = dia + '/' + mes + '/' + anio;
                
//                 // Agregar opción al select
//                 $("#fechaMulta").append(`<option value="${prestamo.idPrestamo}">${fechaFormateada}</option>`);
//             });
//         },
//         error: function (error) {
//             console.error("Error al cargar prestamos activos:", error);
//         }
//     });
// }



// hacemos la funcion para que al limpiar la barra quede en blanco para que escribas y busques en el filtro por otro nombre
function blanquearCampos() {
    document.getElementById('texto').value = "";
}

// funcion para registrar un valorMulta con campos obligatorios 
var registrarMultaBandera = true;

// Función para registrar un valorMulta en la api
function registrarMulta() {
    var prestamo = document.getElementById("prestamo");
    var valorMulta = document.getElementById("valorMulta");
    var estado = document.getElementById("estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarprestamo(prestamo) ||
        !validarvalorMulta(valorMulta) ||
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
        "prestamo": prestamo.value,
        "valorMulta": valorMulta.value,
        "estado": estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarMultaBandera == true) {
        metodo = "POST";
        urlLocal = url;

    } else {
        metodo = "PUT";
        urlLocal = url + idMulta;
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
                    listarMulta(); // Aquí se vuelve a listar los productos
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
    var prestamo = document.getElementById("prestamo");
    // var fechaMulta = document.getElementById("fechaMulta");
    // var usuario = document.getElementById("usuario");
    var valorMulta = document.getElementById("valorMulta");
    var estado = document.getElementById("estado");

    return validarprestamo(prestamo) && validarvalorMulta(valorMulta) 
    && validarestado(estado);
}

// Función prestamo 
function validarprestamo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 1000) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// // Función prestamo 
// function validarfechaMulta(cuadroNumero) {
//     var valor = cuadroNumero.value;
//     var valido = true;

//     if (valor.length < 1 || valor.length > 20) {
//         valido = false;
//     }

//     if (valido) {
//         cuadroNumero.className = "form-control is-valid";
//     } else {
//         cuadroNumero.className = "form-control is-invalid";
//     }

//     return valido;
// }

// // Función prestamo 
// function validarusuario(cuadroNumero) {
//     var valor = cuadroNumero.value;
//     var valido = true;

//     if (valor.length < 1 || valor.length > 100) {
//         valido = false;
//     }

//     if (valido) {
//         cuadroNumero.className = "form-control is-valid";
//     } else {
//         cuadroNumero.className = "form-control is-invalid";
//     }

//     return valido;
// }

// Función valorMulta
function validarvalorMulta(cuadroNumero) {
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
    document.getElementById("prestamo").value = "";
    document.getElementById("prestamo").className = "form-control";
    // document.getElementById("fechaMulta").value = "";
    // document.getElementById("fechaMulta").className = "form-control";
    // document.getElementById("usuario").value = "";
    // document.getElementById("usuario").className = "form-control";
    document.getElementById("valorMulta").value = "";
    document.getElementById("valorMulta").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

var idMulta = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idMulta = $(this).data("id");

    $.ajax({
        url: url + idMulta,
        type: "GET",
        success: function (multa) {
            // Aquí cargamos los datos de la multa en el formulario modal
            document.getElementById("prestamo").value = multa.prestamo.idPrestamo;
            document.getElementById("valorMulta").value = multa.valorMulta;
            document.getElementById("estado").value = multa.estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos de la multa: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del cliente desde el atributo data del elemento clicado
    var idMulta = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar esta Multa?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarMulta/" + idMulta,
                type: "DELETE",
                success: function (eliminarMulta) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Prestamo Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de cliente después de eliminar
                    listarMulta();
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
    listarMulta();
});
function actualizarlistarMulta() {
    listarMulta();
}

