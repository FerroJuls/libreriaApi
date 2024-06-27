// URL de la API se declara una url por si se modifica solo cambiar donde la declaro y no entodas las demas partes
var url = "http://localhost:8080/api/v1/usuario/";

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
function alfaNumericosSignos(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!((numerosPermitidos.includes(event.key)) || (letrasPermitidas.includes(event.key)) || (signosPermitidos.includes(event.key)))){
        event.preventDefault();
        return;
    }
}

const letrasPermitidasEs = [
    'A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 
    'N', 'Ñ', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm',
    'n', 'ñ', 'o', 'ó', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'v', 'w', 'x', 'y', 'z'
];
const numerosPermitidosEs = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];
const signosPermitidosEs = [
    '.', ',', '@', '_', '-', '#'
];
function alfaNumericosSignosEs(event) {
    console.log("Llave presionada: " + event.key);
    console.log("Codigo tecla: " + event.keyCode);

    if(!((letrasPermitidasEs.includes(event.key)) || (numerosPermitidosEs.includes(event.key)) || (signosPermitidosEs.includes(event.key)))){
        event.preventDefault();
        return;
    }
}



// hacemos la funcion del filtro 
function buscarUsuarioPorFiltro(filtro) {
    if (filtro.trim() !== "") {
        $.ajax({
            url: "http://localhost:8080/api/v1/usuario/busquedaFiltros/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idUsuario"]}</td>
                        <td class="align-middle">${result[i]["nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["correo"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoUser"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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
        listarUsuario();
    }
}


// Función para listar los libros registrados en la Api
function listarUsuario() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                        <td>${result[i]["idUsuario"]}</td>
                        <td class="align-middle">${result[i]["nombre"]}</td>
                        <td class="text-center align-middle">${result[i]["direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["correo"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoUser"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar" onclick="registrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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
var registrarUsuarioBandera = true;

// Función para registrar un libro en la api
function registrarUsuario() {
    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var correo = document.getElementById("correo");
    var tipoUser = document.getElementById("tipoUser");

    // Verificar si algún campo obligatorio está vacío
    if (!validarNombre(nombre) ||
        !validarDireccion(direccion) ||
        !validarCorreo(correo) ||
        !validarTipoUser(tipoUser)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "nombre": nombre.value,
        "direccion": direccion.value,
        "correo": correo.value,
        "tipoUser": tipoUser.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarUsuarioBandera == true) {
        metodo = "POST";
        urlLocal = url;

    } else {
        metodo = "PUT";
        urlLocal = url + idUsuario;
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
                    listarUsuario(); // Aquí se vuelve a listar los productos
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El usuario no a devuelto el libro!",
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

function validarCampos() {
    var nombre = document.getElementById("nombre");
    var direccion = document.getElementById("direccion");
    var correo = document.getElementById("correo");
    var tipoUser = document.getElementById("tipoUser");

    return validarNombre(nombre) && validarDireccion(direccion) && validarCorreo(correo) &&
    validarTipoUser(tipoUser);
}

// Función nombre 
function validarNombre(cuadroNumero) {
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

// Función direccion
function validarDireccion(cuadroNumero) {
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

// Función correo
function validarCorreo(inputCorreo) {
    var valor = inputCorreo.value;

    // Crear la expresión regular dinámicamente con los caracteres permitidos
    var regexCorreo = new RegExp(
        '^[' +
        letrasPermitidasEs.join('') +
        numerosPermitidosEs.join('') +
        '\\' + signosPermitidosEs.join('\\') + // Escapar los caracteres especiales
        ']+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    );

    if (regexCorreo.test(valor)) {
        inputCorreo.classList.remove('is-invalid');
        inputCorreo.classList.add('is-valid');
        return true;
    } else {
        inputCorreo.classList.remove('is-valid');
        inputCorreo.classList.add('is-invalid');
        return false;
    }
}


// Función tipoUser
function validarTipoUser(cuadroNumero) {
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


// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").className = "form-control";
    document.getElementById("direccion").value = "";
    document.getElementById("direccion").className = "form-control";
    document.getElementById("correo").value = "";
    document.getElementById("correo").className = "form-control";
    document.getElementById("tipoUser").value = "";
    document.getElementById("tipoUser").className = "form-control";
}

var idUsuario = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idUsuario = $(this).data("id");

    $.ajax({
        url: url + idUsuario,
        type: "GET",
        success: function (usuario) {
            document.getElementById("nombre").value = usuario.nombre;
            document.getElementById("direccion").value = usuario.direccion;
            document.getElementById("correo").value = usuario.correo;
            document.getElementById("tipoUser").value = usuario.tipoUser;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del usuario: " + error.statusText);
        }
    });
});

$(document).on("click", ".eliminar", function () {
    // Obtener el ID del cliente desde el atributo data del elemento clicado
    var idUsuario = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarUsuario/" + idUsuario,
                type: "DELETE",
                success: function (eliminarUsuario) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Libro Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de cliente después de eliminar
                    listarUsuario();
                },
                error: function (xhr, status, error) {
                    Swal.fire({
                        title: "Error",
                        text: "¡El usuario no a devuelto el libro!",
                        icon: "error"
                    });
                }
            });
        }
    });
});

// Llamar a la función para listar cliente al cargar la página
$(document).ready(function () {
    listarUsuario();
});
function actualizarlistarUsuario() {
    listarUsuario();
}