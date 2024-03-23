// Obtenemos los elementos del DOM que vamos a utilizar
const openMenu = document.querySelector("#open-menu"); // Botón para abrir el menú
const closeMenu = document.querySelector("#close-menu"); // Botón para cerrar el menú
const aside = document.querySelector("aside"); // Elemento aside que representa el menú

// Añadimos un evento de click al botón de abrir el menú
openMenu.addEventListener ("click", ()=> {
    aside.classList.add("aside-visible"); // Cuando se hace click en el botón, añadimos la clase 'aside-visible' al menú para hacerlo visible
})

// Añadimos un evento de click al botón de cerrar el menú
closeMenu.addEventListener ("click", ()=> {
    aside.classList.remove("aside-visible"); // Cuando se hace click en el botón, quitamos la clase 'aside-visible' al menú para hacerlo invisible
})

// Añadimos un evento de click a cada botón de categoría
botonesCategorias.forEach(boton => boton.addEventListener("click", () =>{
    aside.classList.remove("aside-visible"); // Cuando se hace click en un botón de categoría, quitamos la clase 'aside-visible' al menú para hacerlo invisible
}))
