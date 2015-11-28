// cuando se termina de cargar la página
$(document).ready(function() {
    // variables globales
    mover = false;
    mouse = {};
    pos = {};
    play = false;
    scale = 0;
    increment = 0.1;
    
    // elementos del html
    body = $('#cuerpo');
    form = $('#form');
    figure = null;
    color = $('#color');
    radius = $('#radius');
    inputs = $('input[type="text"]');

    var margin = 20;
    var fig = $('.fig');
    var add = $('#add');

    // Animación
    setInterval(function () {
        if (play) animate();
    }, 20);

    // adapta los elementos a la resolución de la pantalla
    function resize () {
        body.css({
            width: ($(window).width() - margin),
            height: ($(window).height() - margin)
        });
    }
    resize();

    body.css({
        width: ($(window).width() - margin),
        height: ($(window).height() - margin)
    });
    
    //
    newFig(); 
    
    // eventos del navegador
    $(window).on({
        // cuando se redimensiona el navegador
        resize: resize,
        
        // cuando se levanta la tecla
        keyup: function (evt) {
            var key = String.fromCharCode(evt.keyCode);
            if(key === 'A')
                play = false;
        },
        
        // cuando se baja una tecla
        keydown: function (evt) {
            var key = String.fromCharCode(evt.keyCode);
            if(key === 'A')
                play = true;
        },
        
        // cuando se pulsa un botón
        keypress: function (evt) {
            var key = String.fromCharCode(evt.keyCode);
            if(key === 'b' && figure)
                figure.remove();
        }
    });
    
    // cuando se hace doble click en el body
    body.on({
        dblclick: function (evt) {
            if (evt.pageY > 120)
                newFig(evt);
        }
    });
    
    // mientras se edita el campo de color
    color.on('input change', function (evt) {
        if (figure)
            figure.css('background', color.val());
    });
    
    // cuando cambia el Border-radius
    radius.change(function (evt) {
        if (figure)
            figure.css('border-radius', radius.val() + '%');
    });
    
    // mientras se mueve el Border-radius
    radius.on('input change', function (evt) {
        if (figure)
            figure.css('border-radius', radius.val() + '%');
    });
    
    // cuando un input gana el foco
    inputs.focus(function (evt) {
        $(evt.target).css({
            boxShadow: '1px 1px 2px rgba(0,0,0,.5)',
            outline: '0px'
        });
    });
    
    // cuando un input pierde el foco
    inputs.blur(function (evt) {
        $(evt.target).css({
            boxShadow: 'none'
        });
    });
    
    // eventos de formularios
    form.on({
        
        // cuando se preciona un <input type='reset'/>
        reset: function () {
            $('.fig').remove();
        },
        
        // cuando se envía el formulario
        submit: function () {
            alert('Los datos fueron enviados');
        },
        
        // cuando se selcciona el tecto de un input
        select: function () {
            alert('Usted seleccionó texto');
        }
    });
});


/* función que crea una figura y la añade al HTML */

function newFig (evt) {
    var newFig = $('<div class="fig"></div>');
    var top = evt ? evt.pageY - 40 : 120;
    var left = evt ? evt.pageX - 40 : 120;
    figure = null;

    newFig.css({
        top: top,
        left: left,
        background: color.val(),
        borderRadius: radius.val() + '%'
    });

    // eventos del Mouse asignados a las figuras
    newFig.on({
        
        // cuando se baja en click izquierdo
        mousedown: function (evt) {
            mover = true;
            mouse = {x: evt.pageX, y: evt.pageY};
            pos = {
                top: Number($(evt.target).css('top').replace('px','')), 
                left: Number($(evt.target).css('left').replace('px',''))
            };
        },
        
        // cuando se levanta el click izquierdo
        mouseup: function (evt) {
            mover = false;
            mouse = {x: evt.pageX, y: evt.pageY};
        },
        
        // cuando el puntero sale del elemento
        mouseout: function (evt) {
            mover = false;
            var scale = Number($(evt.target)
                .css('transform')
                .split('(')[1].split(',')[0]);
            $(evt.target).css('transform',
                'scale(' + (scale - .05) + ')');
        },
        
        // cuando el puntero entra al elemento
        mouseover: function (evt) {
            var scale = Number($(evt.target)
                .css('transform')
                .split('(')[1].split(',')[0]);
            $(evt.target).css('transform',
                'scale(' + (scale + .05) + ')');
        },
        
        // cuando el puntero se mueve sobre el elemento
        mousemove: function (evt) {
            if (mover) {
                var tar = $(evt.target);
                tar.css({
                    left: pos.left + evt.pageX - mouse.x,
                    top: pos.top + evt.pageY - mouse.y
                });
            }
        },
        
        // cuando se hace click a elemento
        click: function (evt) {
            figure = $(evt.target);
        }
    });
    
    // inserta la figura en el html
    body.append(newFig);
}

// función para animar las figuras
function animate () {
    var figs = $('.fig');
    figs.each(function(index) {

        if (index === 0) {
            if (scale > 0.5) increment = -.1;
            if (scale < -0.5) increment = .1;

            scale += increment;
        }

        if (index % 2 === 0)
            $(this).css('transform', 
                'scale(' + (1+scale) + ')');
        else
            $(this).css('transform', 
                'scale(' + (1-scale) + ')');
    }); 
}
