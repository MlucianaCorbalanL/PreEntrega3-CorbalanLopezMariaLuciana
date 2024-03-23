// Seleccionamos el botón del formulario de inicio y le añadimos un evento de click
document.querySelector('.formulario-inicio button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevenimos la acción por defecto del botón (enviar el formulario)
    
    // Obtenemos el valor del campo de texto del formulario (nombre)
    let nombre = document.querySelector('.formulario-inicio input[type=text]').value;
    
    // Obtenemos el valor del campo de contraseña del formulario (correo)
    let correo = document.querySelector('.formulario-inicio input[type=password]').value;
    
    // Si el nombre y el correo están presentes
    if (nombre && correo) {
        // Redirigimos al usuario a la página de inicio
        window.location.href = '/../pages/inicio.html';
    } else {
        // Si el nombre o el correo no están presentes, mostramos un mensaje en la consola
        console.log('Por favor, completa todos los campos');
    }
});



