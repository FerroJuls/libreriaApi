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
    var numEjemplarpDisponible = document.getElementById("numEjemplarpDisponible");
    var numEjemplarOcupado = document.getElementById("numEjemplarOcupado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarTitulo(titulo) ||
        !validarAutor(autor) ||
        !validarISBN(ISBN) ||
        !validarGenero(genero) ||
        !validarNumEjemplarDisponible(numEjemplarpDisponible) ||
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
        "numEjemplarpDisponible": numEjemplarpDisponible.value,
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
function validarCampos() {
    var titulo = document.getElementById("titulo");
    return validarTitulo(titulo);
}

// Función para validar el nombreProducto
function validarTitulo(cuadroNumero) {
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

// Función autor
function validarCampos() {
    var autor = document.getElementById("autor");
    return validarAutor(autor);
}

// Función para validar autor
function validarAutor(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 46) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}


// Función Cantidad

function validarCamposCantidad() {
    var cantidad = document.getElementById("cantidad");
    return validarCantidad(cantidad);
}

function validarCantidad(cuadroNumero) {
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

// Función Precio

function validarCamposPrecio() {
    var precio = document.getElementById("precio");
    return validarPrecio(precio);
}

function validarPrecio(cuadroNumero) {
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

// Función iva

function validarCamposIva() {
    var iva = document.getElementById("iva");
    return validarIva(iva);
}

function validarIva(cuadroNumero) {
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

// Función descuento

function validarCamposDescuento() {
    var descuento = document.getElementById("descuento");
    return validarDescuento(descuento);
}

function validarDescuento(cuadroNumero) {
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

function validarCamposEstado() {
    var estado = document.getElementById("estado");
    return validarEstado(estado);
}

function validarEstado(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 9) {
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
    document.getElementById("nombreProducto").value = "";
    document.getElementById("nombreProducto").className = "form-control";
    document.getElementById("descripcion").value = "";
    document.getElementById("descripcion").className = "form-control";
    document.getElementById("cantidad").value = "";
    document.getElementById("cantidad").className = "form-control";
    document.getElementById("precio").value = "";
    document.getElementById("precio").className = "form-control";
    document.getElementById("iva").value = "";
    document.getElementById("iva").className = "form-control";
    document.getElementById("descuento").value = "";
    document.getElementById("descuento").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

