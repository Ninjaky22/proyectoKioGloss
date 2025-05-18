// Función para mostrar/ocultar el menú lateral principal
function toggleMenu() {
  const menuLateral = document.getElementById('menu-lateral');
  if (menuLateral) {
    menuLateral.classList.toggle('mostrar');
    // Si estamos mostrando el menú, y hay algún submenú activo, lo cerramos
    if (menuLateral.classList.contains('mostrar')) {
      const activeSubmenu = menuLateral.querySelector('.has-submenu.submenu-active');
      if (activeSubmenu) {
        // activeSubmenu.classList.remove('submenu-active'); // Opcional: resetear submenús al abrir principal
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuLateral = document.getElementById('menu-lateral');
  const hamburguesaIcon = document.querySelector('.hamburguesa');
  const productosSubmenuToggle = document.querySelector('.productos-submenu-toggle');

  // Referencias a los modales y sus contenidos (necesarias si replicamos la lógica de abrirModal)
  const modalIngresar = document.getElementById('modal-ingresar');
  const dialogContentIngresar = modalIngresar ? modalIngresar.querySelector('.dialog-ingresar-horizontal') : null;
  const modalRegistrar = document.getElementById('modal-registrar');
  const dialogContentRegistrar = modalRegistrar ? modalRegistrar.querySelector('.dialog-registrar-horizontal') : null;

  // Referencias a los nuevos botones del menú móvil
  const mobileBtnIngresar = document.getElementById('mobile-menu-ingresar');
  const mobileBtnRegistrar = document.getElementById('mobile-menu-registrar');

  if (!menuLateral || !hamburguesaIcon) {
    console.warn('Advertencia: No se encontró el menú lateral o el ícono de hamburguesa.');
  }

  // Clic fuera del menú para cerrarlo
  document.addEventListener('click', function (event) {
    if (menuLateral && hamburguesaIcon) {
      const isClickInsideMenu = menuLateral.contains(event.target);
      const isClickOnHamburguesa = hamburguesaIcon.contains(event.target);

      if (menuLateral.classList.contains('mostrar') && !isClickInsideMenu && !isClickOnHamburguesa) {
        menuLateral.classList.remove('mostrar');
        const activeSubmenu = menuLateral.querySelector('.has-submenu.submenu-active');
        if (activeSubmenu) {
          activeSubmenu.classList.remove('submenu-active');
        }
      }
    }
  });

  // Funcionalidad para desplegar el submenú de Productos
  if (productosSubmenuToggle) {
    productosSubmenuToggle.addEventListener('click', function (event) {
      event.preventDefault();
      const parentLi = this.parentElement;
      if (parentLi) {
        parentLi.classList.toggle('submenu-active');
      }
    });
  }

  // Función auxiliar para abrir modales (similar a la de kiogloss.js)
  function abrirModalDesdeMenu(modalElement, contentElement) {
    if (!modalElement || !contentElement) {
      console.error("Error al abrir modal desde menú: Elemento del modal o su contenido no encontrado.");
      return;
    }
    modalElement.showModal();
    contentElement.classList.remove("fade-out"); // Asumiendo que usas esta clase para animación
    void contentElement.offsetWidth; // Forzar reflow para la animación
  }

  // Event listener para el botón "Ingresar" del menú móvil
  if (mobileBtnIngresar && modalIngresar && dialogContentIngresar) {
    mobileBtnIngresar.addEventListener('click', function (event) {
      event.preventDefault();
      abrirModalDesdeMenu(modalIngresar, dialogContentIngresar);
      if (menuLateral.classList.contains('mostrar')) { // Cerrar menú lateral
        menuLateral.classList.remove('mostrar');
      }
    });
  }

  // Event listener para el botón "Regístrate" del menú móvil
  if (mobileBtnRegistrar && modalRegistrar && dialogContentRegistrar) {
    mobileBtnRegistrar.addEventListener('click', function (event) {
      event.preventDefault();
      abrirModalDesdeMenu(modalRegistrar, dialogContentRegistrar);
      if (menuLateral.classList.contains('mostrar')) { // Cerrar menú lateral
        menuLateral.classList.remove('mostrar');
      }
    });
  }

  // Cerrar el menú lateral principal al hacer clic en enlaces de navegación (no los de abrir modal/submenu)
  if (menuLateral) {
    const menuLinks = menuLateral.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        const isSubmenuToggle = this.classList.contains('productos-submenu-toggle');
        const isModalButton = this.id === 'mobile-menu-ingresar' || this.id === 'mobile-menu-registrar';

        // Solo cerrar si el enlace NO es el que despliega el submenú
        // y NO es uno de los botones que ya manejan el cierre del menú al abrir un modal.
        if (!isSubmenuToggle && !isModalButton) {
          if (menuLateral.classList.contains('mostrar')) {
            menuLateral.classList.remove('mostrar');
            const activeSubmenu = menuLateral.querySelector('.has-submenu.submenu-active');
            if (activeSubmenu) {
              activeSubmenu.classList.remove('submenu-active');
            }
          }
        }
      });
    });
  }
});