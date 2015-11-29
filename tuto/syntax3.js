// Sintaxis 3 - Múltiples eventos para un elemento

elemento.on({
    evento1: function(parámetro) {
        /*
        hacer algo
        */
    },
    evento1: function(parámetro) {
        /*
        hacer algo
        */
    },
    eventoN: function(parámetro) {
        /*
        hacer algo
        */
    }
});


// Ejemplo

$(document).on({
    
    movemouse: function(event) {
        console.log('Está moviendo el mouse');
    },
    
    keypress: function(event) {
        console.log('Presionó una tecla');
    }
});