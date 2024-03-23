// Inicializamos un array vacío para almacenar los productos
let productos = [];
// Hacemos una petición fetch para obtener los datos del archivo JSON
fetch("../js/producto.json")
    .then(response => {
        // Si la respuesta no es exitosa, lanzamos un error
        if (!response.ok) {
            throw new Error('Error en la respuesta: ' + response.status);
        }
        // Si la respuesta es exitosa, la convertimos a JSON
        return response.json();
    })
    .then(data => {
        // Asignamos los datos obtenidos a la variable productos
        productos = data; 
        // Llamamos a la función cargarProductos con los productos obtenidos
        cargarProductos(productos);
    })
    .catch(error => {
        // Si ocurre algún error durante la petición fetch, lo mostramos en la consola
        console.error('Ha ocurrido un error:', error);
    });

// Obtenemos los elementos del DOM que vamos a utilizar
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar =document.querySelectorAll(".producto-agregar");
const numerito= document.querySelector("#numerito");

// Función para cargar los productos en el contenedor de productos
function cargarProductos (productosElegidos){
    contenedorProductos.innerHTML = ""; // Limpiamos el contenedor de productos
   productosElegidos.forEach(producto =>{ // Iteramos sobre cada producto

    const div = document.createElement("div"); // Creamos un nuevo elemento div
    div.classList.add("producto"); // Añadimos la clase 'producto' al div
    // Insertamos el HTML para cada producto en el div
    div.innerHTML = ` 
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
<div class="producto-detalle">
  <h3 class="producto-titulo">${producto.titulo}</h3>
  <p class="producto-precio">$${producto.precio}</p>
  <button class="producto-agregar" id="${producto.id}">Agregar</button>
</div>
    `;
    contenedorProductos.append(div); // Añadimos el div al contenedor de productos
   })
   actualizarBotonesAgregar(); // Actualizamos los botones de agregar
}

// Añadimos un evento de click a cada botón de categoría
botonesCategorias.forEach(boton =>{
    boton.addEventListener ("click",(e) =>{

        botonesCategorias.forEach(boton => boton.classList.remove("active")); // Quitamos la clase 'active' a todos los botones
        e.currentTarget.classList.add("active"); // Añadimos la clase 'active' al botón clickeado

        if(e.currentTarget.id != "todos"){ // Si el botón clickeado no es 'todos'
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); // Buscamos el producto que tenga la misma categoría que el botón clickeado
            tituloPrincipal.innerHTML=productoCategoria.categoria.nombre; // Cambiamos el título principal por el nombre de la categoría

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id); // Filtramos los productos que tengan la misma categoría que el botón clickeado
        cargarProductos(productosBoton); // Cargamos los productos filtrados
        }else { // Si el botón clickeado es 'todos'
            tituloPrincipal.innerHTML="Todos los productos"; // Cambiamos el título principal a 'Todos los productos'
            cargarProductos(productos); // Cargamos todos los productos
        }
        
    })
});

// Función para actualizar los botones de agregar
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar"); // Obtenemos todos los botones de agregar

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito); // Añadimos un evento de click a cada botón para agregar el producto al carrito
    });
}

let productosEnCarrito; // Inicializamos la variable para los productos en el carrito

let productosEnCarritoLS =localStorage.getItem("productos-en-carrito"); // Obtenemos los productos en el carrito del Local Storage

if(productosEnCarritoLS){ // Si hay productos en el carrito en el Local Storage
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // Convertimos los productos en el carrito a un objeto JavaScript y los asignamos a la variable productosEnCarrito
    actualizarNumerito(); // Actualizamos el número de productos en el carrito
}else{
    productosEnCarrito =[]; // Si no hay productos en el carrito en el Local Storage, inicializamos productosEnCarrito como un array vacío
}

// Función para agregar un producto al carrito
function agregarAlCarrito (e){

    Toastify({ // Mostramos una notificación de que el producto fue agregado
        text: "Producto agregado",
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

    const idBoton=e.currentTarget.id; // Obtenemos el id del botón clickeado
    const productoAgregado = productos.find(producto => producto.id === idBoton); // Buscamos el producto que tenga el mismo id que el botón clickeado

    if(productosEnCarrito.some(producto => producto.id === idBoton)){ // Si el producto ya está en el carrito
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // Buscamos el índice del producto en el carrito
        productosEnCarrito[index].cantidad++;  // Incrementamos la cantidad del producto en el carrito
    }else{ // Si el producto no está en el carrito
        productoAgregado.cantidad= 1; // Asignamos la cantidad del producto a 1
        productosEnCarrito.push(productoAgregado); // Añadimos el producto al carrito
    }
    actualizarNumerito(); // Actualizamos el número de productos en el carrito

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardamos los productos en el carrito en el Local Storage
}

// Función para actualizar el número de productos en el carrito
function actualizarNumerito(){
    let nuevoNumerito =productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0 ); // Calculamos la cantidad total de productos en el carrito
    numerito.innerText = nuevoNumerito; // Mostramos la cantidad total de productos en el carrito

}
