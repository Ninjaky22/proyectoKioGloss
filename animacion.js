document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute("href"));
      if (destino) {
        scrollAnimado(destino.offsetTop, 800); // 800 milisegundos
      }
    });
  });

  function scrollAnimado(destino, duracion) {
    const inicio = window.pageYOffset;
    const distancia = destino - inicio;
    let inicioTiempo = null;

    function animacionScroll(tiempoActual) {
      if (inicioTiempo === null) inicioTiempo = tiempoActual;
      const tiempoTranscurrido = tiempoActual - inicioTiempo;
      const progreso = Math.min(tiempoTranscurrido / duracion, 1);
      const desplazamiento = inicio + distancia * easeInOutCubic(progreso);
      window.scrollTo(0, desplazamiento);
      if (progreso < 1) {
        requestAnimationFrame(animacionScroll);
      }
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animacionScroll);
  }
});
