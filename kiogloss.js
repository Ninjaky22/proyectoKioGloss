function accion () {
    var ancla = document.getElementsByClassName("nav-links");
    for (var i = 0; i < ancla.length; i++){
        ancla[i].classList.toggle('desaparece');
    }  
}

                    // MODAL INGRESAR//

const btnabrirmodal = document.querySelector("#btn-abrir-ingresar");
const btncerrarmodal = document.querySelector("#btn-cerrar-modal-ingresar");
const btnXcerrar = document.querySelector("#btn-x-cerrar-ingresar");
const modal = document.querySelector("#modal-ingresar");
const dialogContent = modal.querySelector(".dialog-ingresar");


btnabrirmodal.addEventListener("click", () => {
  modal.showModal();
  dialogContent.classList.remove("fade-out");
  void dialogContent.offsetWidth;
  dialogContent.classList.add("dialog-ingresar");
});


function cerrarModalConAnimacion() {
  dialogContent.classList.add("fade-out");


  setTimeout(() => {
    modal.close();
    dialogContent.classList.remove("fade-out");
  }, 300);
}

btncerrarmodal.addEventListener("click", cerrarModalConAnimacion);
btnXcerrar.addEventListener("click", cerrarModalConAnimacion);

const linkRegistrarse = document.querySelector("#link-registrate");

linkRegistrarse.addEventListener("click", (e) => {
  e.preventDefault();

  dialogContent.classList.add("fade-out");

  setTimeout(() => {
    modal.close();
    dialogContent.classList.remove("fade-out");

    // Abre modal registrar con animación
    modalRegistrar.showModal();
    dialogContentRegistrar.classList.remove("fade-out");
    void dialogContentRegistrar.offsetWidth;
    dialogContentRegistrar.classList.add("dialog-registrar");

  }, 300);
});

                    // FIN MODAL INGRESAR//

                      // MODAL REGISTRAR //

const btnAbrirModalRegistrar = document.querySelector("#btn-abrir-registrar");
const btnCerrarModalRegistrar = document.querySelector("#btn-cerrar-modal-registrar");
const btnXCerrarRegistrar = document.querySelector("#btn-x-cerrar-ingreso");
const modalRegistrar = document.querySelector("#modal-registrar");
const dialogContentRegistrar = modalRegistrar.querySelector(".dialog-registrar");

btnAbrirModalRegistrar.addEventListener("click", () => {
  modalRegistrar.showModal();
  dialogContentRegistrar.classList.remove("fade-out");
  void dialogContentRegistrar.offsetWidth;
  dialogContentRegistrar.classList.add("dialog-registrar");
});

function cerrarModalRegistrarConAnimacion() {
  dialogContentRegistrar.classList.add("fade-out");

  setTimeout(() => {
    modalRegistrar.close();
    dialogContentRegistrar.classList.remove("fade-out");
  }, 300);
}

btnCerrarModalRegistrar.addEventListener("click", cerrarModalRegistrarConAnimacion);
btnXCerrarRegistrar.addEventListener("click", cerrarModalRegistrarConAnimacion);

const linkIngresar = document.querySelector("#link-ingresar");

linkIngresar.addEventListener("click", (e) => {
  e.preventDefault();

  dialogContentRegistrar.classList.add("fade-out");

  setTimeout(() => {
    modalRegistrar.close();
    dialogContentRegistrar.classList.remove("fade-out");
    
    modal.showModal();
    dialogContent.classList.remove("fade-out");
    void dialogContent.offsetWidth;
    dialogContent.classList.add("dialog-ingresar");

  }, 300);
});

                      // FIN MODAL REGISTRAR //

                      // MODAL NUESTROS PRODUCTOS //

const btnAbrirModalnp = document.querySelector("#btn-abrir-np");
const btnXCerrarnp = document.querySelector("#btn-x-cerrar-np");
const modalnp = document.querySelector("#modal-np");
const dialogContentnp = modalnp.querySelector(".dialog-np");

btnAbrirModalnp.addEventListener("click", () => {
  modalnp.showModal();
  dialogContentnp.classList.remove("fade-out");
  void dialogContentnp.offsetWidth;
  dialogContentnp.classList.add("dialog-np");
});

function cerrarModalnpConAnimacion() {
  dialogContentnp.classList.add("fade-out");

  setTimeout(() => {
    modalnp.close();
    dialogContentnp.classList.remove("fade-out");
  }, 300);
}

btnXCerrarnp.addEventListener("click", cerrarModalnpConAnimacion);

const linknp = document.querySelector("#link-np");

                      // FIN MODAL NUESTROS PRODUCTOS //

                      // MODAL COMPRAR EN LINEA //

const btnAbrirModalcl = document.querySelector("#btn-abrir-cl");
const btnXCerrarcl = document.querySelector("#btn-x-cerrar-cl");
const modalcl = document.querySelector("#modal-cl");
const dialogContentcl = modalcl.querySelector(".dialog-cl");

btnAbrirModalcl.addEventListener("click", () => {
  modalcl.showModal();
  dialogContentcl.classList.remove("fade-out");
  void dialogContentcl.offsetWidth;
  dialogContentcl.classList.add("dialog-cl");
});

function cerrarModalclConAnimacion() {
  dialogContentcl.classList.add("fade-out");

  setTimeout(() => {
    modalcl.close();
    dialogContentcl.classList.remove("fade-out");
  }, 300);
}

btnXCerrarcl.addEventListener("click", cerrarModalclConAnimacion);

const linkcl = document.querySelector("#link-cl");

                      // FIN MODAL COMPRAR EN LINEA //

                      // MODAL ENVIOS //

const btnAbrirModale = document.querySelector("#btn-abrir-e");
const btnXCerrare = document.querySelector("#btn-x-cerrar-e");
const modale = document.querySelector("#modal-e");
const dialogContente = modale.querySelector(".dialog-e");

btnAbrirModale.addEventListener("click", () => {
  modale.showModal();
  dialogContente.classList.remove("fade-out");
  void dialogContente.offsetWidth;
  dialogContente.classList.add("dialog-e");
});

function cerrarModaleConAnimacion() {
  dialogContente.classList.add("fade-out");

  setTimeout(() => {
    modale.close();
    dialogContente.classList.remove("fade-out");
  }, 300);
}

btnXCerrare.addEventListener("click", cerrarModaleConAnimacion);

const linke = document.querySelector("#link-e");

                      // FIN MODAL ENVIOS //

                      // MODAL PROVEEDORES //

const btnAbrirModalpee = document.querySelector("#btn-abrir-pee");
const btnXCerrarpee = document.querySelector("#btn-x-cerrar-pee");
const modalpee = document.querySelector("#modal-pee");
const dialogContentpee = modalpee.querySelector(".dialog-pee");

btnAbrirModalpee.addEventListener("click", () => {
  modalpee.showModal();
  dialogContentpee.classList.remove("fade-out");
  void dialogContentpee.offsetWidth;
  dialogContentpee.classList.add("dialog-pee");
});

function cerrarModalpeeConAnimacion() {
  dialogContentpee.classList.add("fade-out");

  setTimeout(() => {
    modalpee.close();
    dialogContentpee.classList.remove("fade-out");
  }, 300);
}

btnXCerrarpee.addEventListener("click", cerrarModalpeeConAnimacion);

const linkpee = document.querySelector("#link-pee");

                      // FIN MODAL PROOVEDORES //

           // REDIRECCIÓN LOGO //

const logoLink = document.getElementById("logo-link");

  const esInicio = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

  if (!esInicio) {
    logoLink.href = "index.html";
  } else {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }

          // Fin REDIRECCIÓN LOGO //