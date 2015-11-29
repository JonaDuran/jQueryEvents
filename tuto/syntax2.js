// Sintaxis 2

elemento.on('evento', function(parámetro) {
    /*
    hacer algo
    */
});


// Ejemplo

$('#idTextarea').on('input change', function(event) {
    
    console.log('Estas escribiendo');
    
});