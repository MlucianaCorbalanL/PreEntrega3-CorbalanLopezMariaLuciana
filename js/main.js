
// catálogo de productos
const catalogoProductos = {
    1: { nombre: 'Tortas', precio: 7000 },
    2: { nombre: 'Cupcake', precio: 900 },
    3: { nombre: 'Cookies', precio: 750 },
    4: { nombre: 'Tartas', precio: 3500 },
    5: { nombre: 'Pancakes', precio: 780 },
    6: { nombre: 'Donut', precio: 800 }
};

// Función para registrar un nuevo usuario
function registrarUsuario(nombre) {
    let correo = prompt("Ingrese su correo electrónico:");
    let contraseña = prompt("Ingrese su contraseña:");

    console.log("Usuario registrado exitosamente:");
    console.log(`Nombre: ${nombre}`);
    console.log(`Correo electrónico: ${correo}`);

    alert(`¡Registro exitoso! Gracias por unirte a nuestra pastelería, ${nombre.toLowerCase()}!`);
}

// Función para mostrar el catálogo de productos
function mostrarCatalogo() {
    let catalogo = 'Catálogo de productos:\n';
Object.values(catalogoProductos).forEach((producto, index) => {
  catalogo += `${index + 1}: ${producto.nombre} - $${producto.precio}\n`;
});
    console.log(catalogo);
    alert(catalogo);
}

// Función para seleccionar método de pago
function seleccionarMetodoDePago() {
    let metodoPago = prompt('Seleccione su método de pago (Efectivo, Tarjeta):');
    let regex = /^(efectivo|tarjeta)$/i; // Expresión regular que acepta solo "efectivo" o "tarjeta", sin importar las mayúsculas o minúsculas
    if (regex.test(metodoPago)) {
        alert(`Pago con ${metodoPago.toLowerCase()} seleccionado.`);
    } else {
        alert('Método de pago no válido. Se realizará el pago en efectivo por defecto.');
        metodoPago = 'efectivo';
    }
    return metodoPago;
}


// Seleccionar productos y realizar el pago
function comprarProductos(usuario) {
    let carritoCompra = {};

    let cantidadProductosComprar = parseInt(prompt('¿Cuántos productos desea comprar?'));
    if (isNaN(cantidadProductosComprar) || cantidadProductosComprar <= 0) {
        alert('Por favor, ingrese una cantidad válida de productos.');
        return;
    }

    for (let i = 0; i < cantidadProductosComprar; i++) {
        let idProducto = parseInt(prompt('Ingrese el ID del producto ' + (i + 1) + ':'));
        if (!catalogoProductos[idProducto]) {
            alert('El ID del producto ingresado no es válido.');
            i += -1; 
            continue;
        }
        let cantidadProducto = parseInt(prompt('Ingrese la cantidad de ' + catalogoProductos[idProducto].nombre + ' que desea comprar:'));
        if (isNaN(cantidadProducto) || cantidadProducto <= 0) {
            alert('Por favor, ingrese una cantidad válida para ' + catalogoProductos[idProducto].nombre);
            i += -1; 
            continue;
        }
        agregarAlCarrito(carritoCompra, idProducto, cantidadProducto);
    }

    // Mostrar resumen de la compra
    let subtotal = calcularSubtotal(carritoCompra);
    alert(`Subtotal: $${subtotal.toFixed(2)}`);
    let totalConIVA = calcularTotalConIVA(subtotal);
    alert(`Total con IVA por envío: $${totalConIVA.toFixed(2)}`);

    // Seleccionar método de pago
    let metodoPago = seleccionarMetodoDePago();

    // Proceso de pago
    let confirmacionPago = confirm('¿Desea proceder con el pago?');
    if (confirmacionPago) {
        alert(`¡Pago exitoso! Gracias por su compra, ${usuario}.`);
    } else {
        alert(`Pago cancelado. ¡Esperamos volver a verte pronto, ${usuario}!`);
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(carrito, idProducto, cantidad) {
    if (catalogoProductos[idProducto]) {
        let nombreProducto = catalogoProductos[idProducto].nombre;
        if (carrito[nombreProducto]) {
            carrito[nombreProducto].cantidad += cantidad;
        } else {
            carrito[nombreProducto] = { cantidad: cantidad, precioUnitario: catalogoProductos[idProducto].precio };
        }
    } else {
        alert('El producto con ID ' + idProducto + ' no existe en el catálogo.');
    }
}

// Función para calcular el subtotal del carrito
function calcularSubtotal(carrito) {
    let subtotal = 0;
    for (let producto in carrito) {
        subtotal += carrito[producto].cantidad * carrito[producto].precioUnitario;
    }
    return subtotal;
}

// Función para calcular el total de la compra con IVA por envío
function calcularTotalConIVA(subtotal) {
    const IVA = 0.21; // 21% de IVA
    const ENVIO = 500; // Costo fijo de envío
    let totalConIVA = subtotal * (1 + IVA) + ENVIO;
    return totalConIVA;
}

// Solicitar el nombre al usuario
let nombreUsuario = prompt('Por favor, ingrese su nombre:');

// Llamar a la función registrarUsuario con el nombre proporcionado por el usuario
registrarUsuario(nombreUsuario);

// Mostrar el catálogo de productos
mostrarCatalogo();

// Llamar a la función comprarProductos con el nombre de usuario
comprarProductos(nombreUsuario);