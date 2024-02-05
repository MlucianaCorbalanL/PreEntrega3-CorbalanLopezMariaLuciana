// Registrar un nuevo usuario
function registrarUsuario() {
    console.log("¡Bienvenido a nuestra pastelería! Por favor, ingrese sus datos para registrarse.");

    let nombre = prompt("Ingrese su nombre:");
    let correo = prompt("Ingrese su correo electrónico:");
    let contraseña = prompt("Ingrese su contraseña:");

    console.log("Usuario registrado exitosamente:");
    console.log("Nombre: " + nombre);
    console.log("Correo electrónico: " + correo);

    alert("¡Registro exitoso! Gracias por unirte a nuestra pastelería, " + nombre + "!");
}

// Mostrar el catálogo de productos
function mostrarCatalogo() {
    let productos = ['Tortas', 'Cupcake', 'Cookies', 'Tartas', 'Pancakes', 'Donut'];
    console.log('Catálogo de productos:\n' + productos.join('\n'));
    alert('Catálogo de productos:\n\n' + productos.join('\n'));
}

// Seleccionar productos y realizar el pago
function comprarProductos(usuario, cantidadProductos) {
    let carrito = [];

    
    for (let i = 0; i < cantidadProductos; i++) {
        let productoElegido = prompt('Ingrese el nombre del producto ' + (i + 1) + ':');
        carrito.push(productoElegido);
    }

    // Mostrar los productos seleccionados 
    console.log('Productos seleccionados:\n' + carrito.join('\n'));
    alert('Productos seleccionados:\n\n' + carrito.join('\n'));

    // Calcular el total y realizar el pago
    let total = cantidadProductos * 250;
    console.log('El total de su compra es $' + total);

    // Seleccionar método de pago
    let metodoPago = prompt('Seleccione su método de pago (Efectivo, Tarjeta):').toLowerCase();

    switch (metodoPago) {
        case 'efectivo':
            alert('Pago en efectivo seleccionado.');
            break;
        case 'tarjeta':
            alert('Pago con tarjeta seleccionado.');
            break;
        default:
            alert('Método de pago no válido. Se realizará el pago en efectivo por defecto.');
            break;
    }

    let confirmacionPago = confirm('¿Desea proceder con el pago?');

    // Proceso de pago
    if (confirmacionPago) {
        alert('¡Pago exitoso! Gracias por su compra, ' + usuario + '.');
        return true;
    } else {
        alert('Pago cancelado. ¡Esperamos volver a verte pronto, ' + usuario + '!');
        return false;
    }
}

let nombreUsuario = prompt('Por favor, ingrese su nombre:');
registrarUsuario(nombreUsuario);

mostrarCatalogo();

let cantidadProductosComprar = parseInt(prompt('¿Cuántos productos desea comprar?'));
if (isNaN(cantidadProductosComprar) || cantidadProductosComprar <= 0) {
    alert('Por favor, ingrese una cantidad válida de productos.');
} else {
    comprarProductos(nombreUsuario, cantidadProductosComprar);
}
