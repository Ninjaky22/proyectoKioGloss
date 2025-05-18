document.addEventListener("DOMContentLoaded", function () {
  const ANIMATION_DURATION = 300; // Duración de la animación

  // --- DECLARAR VARIABLES DE MODALES PRINCIPALES Y SUS CONTENIDOS AQUÍ ARRIBA ---
  let modalIngresar = null;
  let dialogContentIngresar = null;
  let modalRecuperar = null;
  let dialogContentRecuperar = null;
  let modalRegistrar = null;
  let dialogContentRegistrar = null;
  // Declara aquí otras variables de modal/contenido si necesitas acceder a ellas desde diferentes bloques

  // --- FUNCIONES GENÉRICAS PARA MODALES ---
  function abrirModal(modalElement, contentElement) {
    if (!modalElement || !contentElement) {
      console.error(
        "Error al abrir: Elemento del modal o su contenido no encontrado.",
        modalElement,
        contentElement
      );
      return;
    }
    modalElement.showModal();
    contentElement.classList.remove("fade-out");
    void contentElement.offsetWidth; // Forzar reflow
  }

  function cerrarModalConAnimacion(modalElement, contentElement, callback) {
    if (!modalElement || !contentElement) {
      console.error(
        "Error al cerrar: Elemento del modal o su contenido no encontrado.",
        modalElement,
        contentElement
      );
      if (modalElement && typeof modalElement.close === "function")
        modalElement.close();
      if (callback) callback();
      return;
    }
    contentElement.classList.add("fade-out");
    setTimeout(() => {
      if (typeof modalElement.close === "function") modalElement.close();
      contentElement.classList.remove("fade-out");
      if (callback) callback();
    }, ANIMATION_DURATION);
  }

  // --- MODAL INGRESAR ---
  const btnAbrirModalIngresar = document.querySelector("#btn-abrir-ingresar");
  modalIngresar = document.querySelector("#modal-ingresar"); // Asigna a la variable de alcance superior

  if (modalIngresar) {
    console.log("#modal-ingresar encontrado.");
    // Asigna a la variable de alcance superior
    dialogContentIngresar = modalIngresar.querySelector(
      ".dialog-ingresar-horizontal"
    );

    // Las siguientes son locales a este bloque if, si no se necesitan fuera
    const btnXCerrarIngresar = modalIngresar.querySelector(
      "#btn-x-cerrar-ingresar"
    );
    const btnIngresarSubmit = modalIngresar.querySelector(
      "#btn-ingresar-submit"
    );
    const linkRegistrateDesdeIngresar =
      modalIngresar.querySelector("#link-registrate");
    const linkRecuperarDesdeLogin = modalIngresar.querySelector(
      "#link-recuperar-password-desde-login"
    );
    const loginPasswordInput = modalIngresar.querySelector(
      "#login-password-input"
    );
    const loginTogglePassword = modalIngresar.querySelector(
      "#login-toggle-password"
    );

    if (!dialogContentIngresar) {
      // Chequeo importante
      console.error(
        "ERROR CRÍTICO: .dialog-ingresar-horizontal no encontrado dentro de #modal-ingresar."
      );
    }

    if (loginPasswordInput && loginTogglePassword) {
      loginTogglePassword.addEventListener("click", function () {
        const currentType = loginPasswordInput.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";
        loginPasswordInput.setAttribute("type", newType);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
      });
      console.log("FUNCIONALIDAD OJITO: Configurada para #modal-ingresar.");
    } else {
      console.warn(
        "ADVERTENCIA OJITO: Elementos para el toggle de contraseña en #modal-ingresar no encontrados."
      );
      if (!loginPasswordInput)
        console.warn(
          " > login-password-input NO encontrado dentro de #modal-ingresar."
        );
      if (!loginTogglePassword)
        console.warn(
          " > login-toggle-password NO encontrado dentro de #modal-ingresar."
        );
    }

    if (btnAbrirModalIngresar) {
      btnAbrirModalIngresar.addEventListener("click", () => {
        if (modalIngresar && dialogContentIngresar) {
          // Siempre verifica ambas
          abrirModal(modalIngresar, dialogContentIngresar);
        } else {
          console.error(
            "Error al intentar abrir modal-ingresar: modal o contenido no están listos."
          );
        }
      });
    } else {
      console.warn(
        "Advertencia: #btn-abrir-ingresar no encontrado en el documento."
      );
    }

    if (btnXCerrarIngresar) {
      btnXCerrarIngresar.addEventListener("click", () => {
        if (modalIngresar && dialogContentIngresar)
          cerrarModalConAnimacion(modalIngresar, dialogContentIngresar);
      });
    } else {
      console.warn(
        "Advertencia: #btn-x-cerrar-ingresar no encontrado dentro de #modal-ingresar."
      );
    }

    if (btnIngresarSubmit) {
      btnIngresarSubmit.addEventListener("click", (e) => {
        console.log("Intento de inicio de sesión...");
      });
    } else {
      console.warn(
        "Advertencia: #btn-ingresar-submit no encontrado dentro de #modal-ingresar."
      );
    }

    if (linkRecuperarDesdeLogin) {
      linkRecuperarDesdeLogin.addEventListener("click", (e) => {
        e.preventDefault();
        // modalRecuperar y dialogContentRecuperar deben estar asignados en su bloque
        if (
          modalRecuperar &&
          dialogContentRecuperar &&
          modalIngresar &&
          dialogContentIngresar
        ) {
          cerrarModalConAnimacion(modalIngresar, dialogContentIngresar, () => {
            abrirModal(modalRecuperar, dialogContentRecuperar);
          });
        } else {
          console.error(
            "Error al transitar a recuperar: falta algún modal/contenido esencial."
          );
          if (!modalRecuperar) console.log(" > modalRecuperar falta");
          if (!dialogContentRecuperar)
            console.log(" > dialogContentRecuperar falta");
        }
      });
    } else {
      console.warn(
        "Advertencia: #link-recuperar-password-desde-login no encontrado dentro de #modal-ingresar."
      );
    }

    if (linkRegistrateDesdeIngresar) {
      linkRegistrateDesdeIngresar.addEventListener("click", (e) => {
        e.preventDefault();
        // modalRegistrar y dialogContentRegistrar deben estar asignados en su bloque
        if (
          modalRegistrar &&
          dialogContentRegistrar &&
          modalIngresar &&
          dialogContentIngresar
        ) {
          cerrarModalConAnimacion(modalIngresar, dialogContentIngresar, () => {
            abrirModal(modalRegistrar, dialogContentRegistrar);
          });
        } else {
          console.error(
            "Error al transitar a registrar: falta algún modal/contenido esencial."
          );
        }
      });
    } else {
      console.warn(
        "Advertencia: #link-registrate no encontrado dentro de #modal-ingresar."
      );
    }
  } else {
    console.error(
      "ERROR CRÍTICO: #modal-ingresar no encontrado en el DOM. Su funcionalidad no se activará."
    );
  }

  // --- MODAL RECUPERAR CONTRASEÑA ---
  modalRecuperar = document.querySelector("#modal-recuperar-password"); // Asigna a la variable de alcance superior

  if (modalRecuperar) {
    console.log("#modal-recuperar-password encontrado.");
    // Asigna a la variable de alcance superior
    dialogContentRecuperar = modalRecuperar.querySelector(
      ".dialog-recuperar-horizontal"
    );

    const btnXCerrarRecuperar = modalRecuperar.querySelector(
      "#btn-x-cerrar-recuperar"
    );
    const btnEnviarRecuperacion = modalRecuperar.querySelector(
      "#btn-enviar-recuperacion"
    );
    const linkVolverALogin = modalRecuperar.querySelector(
      "#link-volver-a-login"
    );
    const emailRecuperarInput =
      modalRecuperar.querySelector("#recuperar-email");

    if (!dialogContentRecuperar) {
      // Chequeo importante
      console.error(
        "ERROR CRÍTICO: .dialog-recuperar-horizontal no encontrado dentro de #modal-recuperar-password."
      );
    }

    if (btnXCerrarRecuperar) {
      btnXCerrarRecuperar.addEventListener("click", () => {
        if (modalRecuperar && dialogContentRecuperar)
          cerrarModalConAnimacion(modalRecuperar, dialogContentRecuperar);
      });
    } else {
      console.warn(
        "Advertencia: #btn-x-cerrar-recuperar no encontrado dentro de #modal-recuperar-password."
      );
    }

    if (btnEnviarRecuperacion && emailRecuperarInput) {
      btnEnviarRecuperacion.addEventListener("click", () => {
        const email = emailRecuperarInput.value;
        if (email) {
          console.log("Enviar enlace de recuperación a:", email);
          alert(
            `Se enviaría un enlace de recuperación a: ${email} (simulación)`
          );
        } else {
          alert("Por favor, ingresa tu correo electrónico.");
        }
      });
    } else {
      if (!btnEnviarRecuperacion)
        console.warn("Advertencia: #btn-enviar-recuperacion no encontrado.");
      if (!emailRecuperarInput)
        console.warn("Advertencia: #recuperar-email no encontrado.");
    }

    if (linkVolverALogin) {
      linkVolverALogin.addEventListener("click", (e) => {
        e.preventDefault();
        // AHORA modalIngresar y dialogContentIngresar SON ACCESIBLES CORRECTAMENTE
        if (
          modalIngresar &&
          dialogContentIngresar &&
          modalRecuperar &&
          dialogContentRecuperar
        ) {
          cerrarModalConAnimacion(
            modalRecuperar,
            dialogContentRecuperar,
            () => {
              abrirModal(modalIngresar, dialogContentIngresar);
            }
          );
        } else {
          console.error(
            "Error al volver a login: falta modalIngresar o dialogContentIngresar o el modal de recuperación actual."
          );
          if (!modalIngresar) console.log(" > modalIngresar es null/undefined");
          if (!dialogContentIngresar)
            console.log(" > dialogContentIngresar es null/undefined");
        }
      });
    } else {
      console.warn(
        "Advertencia: #link-volver-a-login no encontrado dentro de #modal-recuperar-password."
      );
    }
  } else {
    console.warn(
      "Advertencia: #modal-recuperar-password no encontrado en el DOM."
    );
  }

  // --- MODAL REGISTRAR ---
  const btnAbrirModalRegistrar = document.querySelector("#btn-abrir-registrar");
  modalRegistrar = document.querySelector("#modal-registrar"); // Asigna a variable de alcance superior

  if (modalRegistrar) {
    console.log("#modal-registrar encontrado.");
    // Asigna a variable de alcance superior
    dialogContentRegistrar = modalRegistrar.querySelector(
      ".dialog-registrar-horizontal"
    );

    const btnXCerrarRegistrar = modalRegistrar.querySelector(
      "#btn-x-cerrar-registrar"
    );
    const btnSubmitRegistrar = modalRegistrar.querySelector(
      "#btn-submit-registrar"
    );
    const linkIngresarDesdeRegistro = modalRegistrar.querySelector(
      "#link-ingresar-desde-registro"
    );

    const registrarPasswordInput = modalRegistrar.querySelector(
      "#registrar-password-input"
    );
    const registrarConfirmPasswordInput = modalRegistrar.querySelector(
      "#registrar-confirm-password-input"
    );
    const registrarTogglePassword = modalRegistrar.querySelector(
      "#registrar-toggle-password"
    );

    if (
      registrarPasswordInput &&
      registrarConfirmPasswordInput &&
      registrarTogglePassword
    ) {
      registrarTogglePassword.addEventListener("click", function () {
        // Determinar el nuevo tipo (text o password) basándose en el campo de contraseña principal
        const currentType = registrarPasswordInput.getAttribute("type");
        const newType = currentType === "password" ? "text" : "password";

        // Aplicar el nuevo tipo a AMBOS campos de contraseña
        registrarPasswordInput.setAttribute("type", newType);
        registrarConfirmPasswordInput.setAttribute("type", newType);

        // Cambiar el ícono del ojo
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
      });
      console.log("FUNCIONALIDAD OJITO: Configurada para #modal-registrar.");
    } else {
      console.warn(
        "ADVERTENCIA OJITO (REGISTRO): Elementos para el toggle de contraseña en #modal-registrar no encontrados."
      );
      if (!registrarPasswordInput)
        console.warn(" > registrar-password-input NO encontrado.");
      if (!registrarConfirmPasswordInput)
        console.warn(" > registrar-confirm-password-input NO encontrado.");
      if (!registrarTogglePassword)
        console.warn(" > registrar-toggle-password NO encontrado.");
    }
    // --- FIN DE NUEVA FUNCIONALIDAD OJITO ---

    if (!dialogContentRegistrar) {
      // Chequeo importante
      console.error(
        "ERROR CRÍTICO: .dialog-registrar-horizontal no encontrado dentro de #modal-registrar."
      );
    }

    if (btnAbrirModalRegistrar) {
      btnAbrirModalRegistrar.addEventListener("click", () => {
        if (modalRegistrar && dialogContentRegistrar)
          abrirModal(modalRegistrar, dialogContentRegistrar);
      });
    } else {
      console.warn("Advertencia: #btn-abrir-registrar no encontrado.");
    }

    if (btnXCerrarRegistrar) {
      btnXCerrarRegistrar.addEventListener("click", () => {
        if (modalRegistrar && dialogContentRegistrar)
          cerrarModalConAnimacion(modalRegistrar, dialogContentRegistrar);
      });
    } else {
      console.warn("Advertencia: #btn-x-cerrar-registrar no encontrado.");
    }

    if (btnSubmitRegistrar) {
      btnSubmitRegistrar.addEventListener("click", (event) => {
        console.log("Formulario de registro 'enviado' (simulación)");
      });
    } else {
      console.warn("Advertencia: #btn-submit-registrar no encontrado.");
    }

    if (linkIngresarDesdeRegistro) {
      linkIngresarDesdeRegistro.addEventListener("click", (e) => {
        e.preventDefault();
        if (
          modalIngresar &&
          dialogContentIngresar &&
          modalRegistrar &&
          dialogContentRegistrar
        ) {
          cerrarModalConAnimacion(
            modalRegistrar,
            dialogContentRegistrar,
            () => {
              abrirModal(modalIngresar, dialogContentIngresar);
            }
          );
        } else {
          console.error(
            "Error al volver a login desde registro: falta algún modal/contenido esencial."
          );
        }
      });
    } else {
      console.warn("Advertencia: #link-ingresar-desde-registro no encontrado.");
    }
  } else {
    console.warn("Advertencia: #modal-registrar no encontrado en el DOM.");
  }

  // --- OTROS MODALES (Aplica el mismo patrón de declaración de variables y asignación) ---
  // Recuerda declarar 'let modalXX = null;' y 'let dialogContentXX = null;' al principio del DOMContentLoaded
  // si estos modales necesitan interactuar entre sí o ser referenciados desde otros bloques.

  // MODAL NUESTROS PRODUCTOS
  const modalnp = document.querySelector("#modal-np");
  if (modalnp) {
    const btnAbrirModalnp = document.querySelector("#btn-abrir-np");
    const btnXCerrarnp = modalnp.querySelector("#btn-x-cerrar-np");
    const dialogContentnp = modalnp.querySelector(".dialog-np"); // Asumimos que esta clase existe
    if (dialogContentnp) {
      // Solo añade listeners si el contenido existe
      if (btnAbrirModalnp)
        btnAbrirModalnp.addEventListener("click", () =>
          abrirModal(modalnp, dialogContentnp)
        );
      if (btnXCerrarnp)
        btnXCerrarnp.addEventListener("click", () =>
          cerrarModalConAnimacion(modalnp, dialogContentnp)
        );
    } else {
      console.warn(
        "Advertencia: .dialog-np no encontrado en #modal-np. Listeners no añadidos."
      );
    }
  }

  // MODAL COMPRAR EN LINEA
  const modalcl = document.querySelector("#modal-cl");
  if (modalcl) {
    const btnAbrirModalcl = document.querySelector("#btn-abrir-cl");
    const btnXCerrarcl = modalcl.querySelector("#btn-x-cerrar-cl");
    const dialogContentcl = modalcl.querySelector(".dialog-cl");
    if (dialogContentcl) {
      if (btnAbrirModalcl)
        btnAbrirModalcl.addEventListener("click", () =>
          abrirModal(modalcl, dialogContentcl)
        );
      if (btnXCerrarcl)
        btnXCerrarcl.addEventListener("click", () =>
          cerrarModalConAnimacion(modalcl, dialogContentcl)
        );
    } else {
      console.warn(
        "Advertencia: .dialog-cl no encontrado en #modal-cl. Listeners no añadidos."
      );
    }
  }

  // MODAL ENVIOS
  const modale = document.querySelector("#modal-e");
  if (modale) {
    const btnAbrirModale = document.querySelector("#btn-abrir-e");
    const btnXCerrare = modale.querySelector("#btn-x-cerrar-e");
    const dialogContente = modale.querySelector(".dialog-e");
    if (dialogContente) {
      if (btnAbrirModale)
        btnAbrirModale.addEventListener("click", () =>
          abrirModal(modale, dialogContente)
        );
      if (btnXCerrare)
        btnXCerrare.addEventListener("click", () =>
          cerrarModalConAnimacion(modale, dialogContente)
        );
    } else {
      console.warn(
        "Advertencia: .dialog-e no encontrado en #modal-e. Listeners no añadidos."
      );
    }
  }

  // MODAL PROVEEDORES
  const modalpee = document.querySelector("#modal-pee");
  if (modalpee) {
    const btnAbrirModalpee = document.querySelector("#btn-abrir-pee");
    const btnXCerrarpee = modalpee.querySelector("#btn-x-cerrar-pee");
    const dialogContentpee = modalpee.querySelector(".dialog-pee");
    if (dialogContentpee) {
      if (btnAbrirModalpee)
        btnAbrirModalpee.addEventListener("click", () =>
          abrirModal(modalpee, dialogContentpee)
        );
      if (btnXCerrarpee)
        btnXCerrarpee.addEventListener("click", () =>
          cerrarModalConAnimacion(modalpee, dialogContentpee)
        );
    } else {
      console.warn(
        "Advertencia: .dialog-pee no encontrado en #modal-pee. Listeners no añadidos."
      );
    }
  }

  // --- REDIRECCIÓN LOGO ---
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    const esInicio =
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/";
    if (!esInicio) {
      logoLink.href = "index.html";
    } else {
      logoLink.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  } else {
    console.warn("Advertencia: #logo-link no encontrado.");
  }
}); // Fin del DOMContentLoaded

// TERMINÓ //
