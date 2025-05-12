document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const btnAnterior = document.querySelector('.btn-anterior');
    const btnSiguiente = document.querySelector('.btn-siguiente');
    const categorias = document.querySelectorAll('.categoria');
    
    const anchoCategoria = 150; // Ancho de cada categoría + gap
    let desplazamiento = 0;
    const maxDesplazamiento = (categorias.length - 5) * anchoCategoria;
    
    // Función para actualizar la visibilidad de los botones
    function actualizarBotones() {
        btnAnterior.style.display = desplazamiento <= 0 ? 'none' : 'flex';
        btnSiguiente.style.display = desplazamiento >= maxDesplazamiento ? 'none' : 'flex';
    }
    
    // Inicializar visibilidad de botones
    actualizarBotones();
    
    // Evento para botón siguiente
    btnSiguiente.addEventListener('click', function() {
        if (desplazamiento < maxDesplazamiento) {
            desplazamiento += anchoCategoria;
            carrusel.scrollTo({
                left: desplazamiento,
                behavior: 'smooth'
            });
            actualizarBotones();
        }
    });
    
    // Evento para botón anterior
    btnAnterior.addEventListener('click', function() {
        if (desplazamiento > 0) {
            desplazamiento -= anchoCategoria;
            carrusel.scrollTo({
                left: desplazamiento,
                behavior: 'smooth'
            });
            actualizarBotones();
        }
    });
    
    // Evento para hacer clic en una categoría
    categorias.forEach(categoria => {
        categoria.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para redirigir a la categoría seleccionada
            console.log('Categoría seleccionada:', this.querySelector('span').textContent);
        });
    });
    
    // Soporte para touch en dispositivos móviles
    let inicioTouchX = 0;
    let finTouchX = 0;
    
    carrusel.addEventListener('touchstart', function(e) {
        inicioTouchX = e.touches[0].clientX;
    }, {passive: true});
    
    carrusel.addEventListener('touchmove', function(e) {
        finTouchX = e.touches[0].clientX;
    }, {passive: true});
    
    carrusel.addEventListener('touchend', function() {
        if (finTouchX < inicioTouchX - 50 && desplazamiento < maxDesplazamiento) {
            desplazamiento += anchoCategoria;
            carrusel.scrollTo({
                left: desplazamiento,
                behavior: 'smooth'
            });
            actualizarBotones();
        }
        
        if (finTouchX > inicioTouchX + 50 && desplazamiento > 0) {
            desplazamiento -= anchoCategoria;
            carrusel.scrollTo({
                left: desplazamiento,
                behavior: 'smooth'
            });
            actualizarBotones();
        }
    }, {passive: true});
});