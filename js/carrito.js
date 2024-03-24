// Obtenemos los productos en el carrito del Local Storage y los convertimos a un objeto JavaScript
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

// Obtenemos los elementos del DOM que vamos a utilizar
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const ContenedorCarritoProductos = document.querySelector("#carrito-productos");
const ContenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const ContenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal=document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Función para cargar los productos en el carrito
function cargarProductosCarrito () {

    // Si hay productos en el carrito
    if (productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        ContenedorCarritoProductos.classList.remove("disabled");
        ContenedorCarritoAcciones.classList.remove("disabled");
        ContenedorCarritoComprado.classList.add("disabled");
    
        ContenedorCarritoProductos.innerHTML="";
    
        // Iteramos sobre cada producto en el carrito
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div"); // Creamos un nuevo elemento div
            div.classList.add("carrito-producto"); // Añadimos la clase 'carrito-producto' al div
            // Insertamos el HTML para cada producto en el div
            div.innerHTML =` 
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `
            ContenedorCarritoProductos.append(div); // Añadimos el div al contenedor de productos en el carrito
        })    
    }else{ // Si no hay productos en el carrito
    
        contenedorCarritoVacio.classList.remove("disabled");
        ContenedorCarritoProductos.classList.add("disabled");
        ContenedorCarritoAcciones.classList.add("disabled");
        ContenedorCarritoComprado.classList.add("disabled");
    } 

    actualizarBotonesEliminar(); // Actualizamos los botones de eliminar
    actualizarTotal(); // Actualizamos el total
}

cargarProductosCarrito (); // Cargamos los productos en el carrito

// Función para actualizar los botones de eliminar
function actualizarBotonesEliminar(){
    botonesEliminar =document.querySelectorAll(".carrito-producto-eliminar"); // Obtenemos todos los botones de eliminar

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito); // Añadimos un evento de click a cada botón para eliminar el producto del carrito
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito (e) {

    Toastify({ // Mostramos una notificación de que el producto fue eliminado
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #faa872, #c77408)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id; // Obtenemos el id del botón clickeado
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // Buscamos el índice del producto en el carrito
   
    productosEnCarrito.splice(index, 1); // Eliminamos el producto del carrito
    cargarProductosCarrito(); // Cargamos los productos en el carrito

    productosEnCarrito.splice(index, 1); // Eliminamos el producto del carrito
    localStorage.setItem("productos-en-carrito",JSON.stringify (productosEnCarrito)); // Guardamos los productos en el carrito en el Local Storage
}


// Añadimos un evento de click al botón de vaciar el carrito
botonVaciar.addEventListener("click", vaciarCarrito);

// Función para vaciar el carrito
function vaciarCarrito(){

  // Mostramos un mensaje de confirmación para vaciar el carrito
  Swal.fire({
        title: '¿Estás seguro?', 
        icon: 'question', 
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`, 
        showCancelButton: true, 
        focusConfirm: false, 
        confirmButtonText: 'Sí', 
        cancelButtonText: 'No' 
    }).then((result) => {
        if (result.isConfirmed) { 
            productosEnCarrito.length = 0; 
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardamos el carrito vacío en el Local Storage
            cargarProductosCarrito(); // Cargamos los productos en el carrito
        }
      })
}

// Función para actualizar el total del carrito
function actualizarTotal(){
    const totalCalculado= productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); // Calculamos el total del carrito
    total.innerText= `$${totalCalculado}`; // Mostramos el total del carrito

}

// Añadimos un evento de click al botón de comprar
botonComprar.addEventListener("click", comprarCarrito);

// Función para comprar los productos en el carrito
function comprarCarrito(){

    productosEnCarrito.length = 0; // Vaciamos el carrito
    localStorage.setItem("productos-en-carrito",JSON.stringify (productosEnCarrito)); // Guardamos el carrito vacío en el Local Storage
    
    // Mostramos el contenedor de carrito comprado y ocultamos los demás contenedores
    contenedorCarritoVacio.classList.add("disabled");
    ContenedorCarritoProductos.classList.add("disabled");
    ContenedorCarritoAcciones.classList.add("disabled");
    ContenedorCarritoComprado.classList.remove("disabled");
}
