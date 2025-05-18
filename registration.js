document.addEventListener('DOMContentLoaded', () => {
    // --- SELECCIÓN DE ELEMENTOS DEL DOM (REGISTRO, LOGIN, BOTONES HEADER) ---
    const registrarModal = document.getElementById('modal-registrar');
    const registrarForm = document.querySelector('.registrar-form');
    const usernameInput = document.getElementById('registrar-username');
    const emailInput = document.getElementById('registrar-email');
    const passwordInput = document.getElementById('registrar-password-input');
    const confirmPasswordInput = document.getElementById('registrar-confirm-password-input');
    const submitButton = document.getElementById('btn-submit-registrar');
    const closeButtonRegistrar = document.getElementById('btn-x-cerrar-registrar');

    const ingresarModal = document.getElementById('modal-ingresar');
    const ingresarForm = document.querySelector('.ingresar-form');
    const loginEmailInput = document.getElementById('login-email-input');
    const loginPasswordInput = document.getElementById('login-password-input');
    const btnIngresarSubmit = document.getElementById('btn-ingresar-submit');
    const btnXCerrarIngresar = document.getElementById('btn-x-cerrar-ingresar');

    const recuperarModal = document.getElementById('modal-recuperar-password');
    const btnCerrarRecuperar = document.getElementById('btn-x-cerrar-recuperar');
    const recuperarForm = document.getElementById('recuperar-form');
    const recuperarEmailInput = document.getElementById('recuperar-email');
    const recuperarEmailSection = document.getElementById('recuperar-email-section');
    const nuevaPasswordSection = document.getElementById('recuperar-nueva-password-section');
    const nuevaPasswordInput = document.getElementById('recuperar-nueva-password-input');
    const confirmarPasswordInput = document.getElementById('recuperar-confirmar-password-input');
    const btnAccionRecuperar = document.getElementById('btn-accion-recuperar');
    const textoInstructivoRecuperar = document.getElementById('recuperar-texto-instructivo');
    const linkVolverLoginRecuperar = document.getElementById('link-volver-a-login-recuperar');

    const linkRegistrateDesdeLogin = document.getElementById('link-registrate');
    const linkIngresarDesdeRegistro = document.getElementById('link-ingresar-desde-registro');

    // Botones de autenticación en Header PC
    const btnAbrirIngresarPC = document.getElementById('btn-abrir-ingresar');
    const btnAbrirRegistrarPC = document.getElementById('btn-abrir-registrar');
    const btnCerrarSesionPC = document.getElementById('btn-cerrar-sesion-pc');

    // Items de lista (<li>) de autenticación en Menú Móvil
    const liMobileIngresar = document.getElementById('li-mobile-ingresar');
    const liMobileRegistrar = document.getElementById('li-mobile-registrar');
    const liMobileCerrarSesion = document.getElementById('li-mobile-cerrar-sesion');
    const mobileLinkCerrarSesion = document.getElementById('mobile-menu-cerrar-sesion');

    let emailParaRecuperar = null;

    // --- FUNCIONES UTILITARIAS Y DE UI ---
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function actualizarUIUsuarioLogueado() {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            if (btnAbrirIngresarPC) btnAbrirIngresarPC.classList.add('oculto');
            if (btnAbrirRegistrarPC) btnAbrirRegistrarPC.classList.add('oculto');
            if (btnCerrarSesionPC) btnCerrarSesionPC.classList.remove('oculto');

            if (liMobileIngresar) liMobileIngresar.classList.add('oculto');
            if (liMobileRegistrar) liMobileRegistrar.classList.add('oculto');
            if (liMobileCerrarSesion) liMobileCerrarSesion.classList.remove('oculto');
        }
    }

    function actualizarUIParaVisitante() {
        if (btnAbrirIngresarPC) btnAbrirIngresarPC.classList.remove('oculto');
        if (btnAbrirRegistrarPC) btnAbrirRegistrarPC.classList.remove('oculto');
        if (btnCerrarSesionPC) btnCerrarSesionPC.classList.add('oculto');

        if (liMobileIngresar) liMobileIngresar.classList.remove('oculto');
        if (liMobileRegistrar) liMobileRegistrar.classList.remove('oculto');
        if (liMobileCerrarSesion) liMobileCerrarSesion.classList.add('oculto');
    }

    function resetRecuperarModal() {
        if (recuperarForm) recuperarForm.reset();
        if (recuperarEmailSection) recuperarEmailSection.style.display = 'block';
        if (nuevaPasswordSection) nuevaPasswordSection.style.display = 'none';
        if (btnAccionRecuperar) btnAccionRecuperar.textContent = 'Buscar Correo';
        if (textoInstructivoRecuperar) textoInstructivoRecuperar.textContent = 'Ingresa tu correo electrónico. Si está registrado, te permitiremos restablecer tu contraseña.';
        if (recuperarEmailInput) recuperarEmailInput.disabled = false;
        emailParaRecuperar = null;
    }

    // --- LÓGICA DE REGISTRO ---
    if (closeButtonRegistrar && registrarModal) {
        closeButtonRegistrar.addEventListener('click', () => registrarModal.close());
    }
    if (registrarModal) {
        registrarModal.addEventListener('click', (event) => {
            if (event.target === registrarModal) registrarModal.close();
        });
    }
    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (!username || !email || !password || !confirmPassword) {
                Swal.fire({ icon: 'error', title: 'Campos Incompletos', text: 'Por favor, completa todos los campos.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }
            if (!isValidEmail(email)) {
                Swal.fire({ icon: 'error', title: 'Email Inválido', text: 'Por favor, ingresa un correo electrónico válido.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }
            if (password !== confirmPassword) {
                Swal.fire({ icon: 'error', title: 'Error de Contraseña', text: 'Las contraseñas no coinciden.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }
            if (password.length < 6) {
                Swal.fire({ icon: 'error', title: 'Contraseña Débil', text: 'La contraseña debe tener al menos 6 caracteres.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                Swal.fire({ icon: 'warning', title: 'Email Existente', text: 'Este correo electrónico ya está registrado.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }
            if (users.some(user => user.username === username)) {
                Swal.fire({ icon: 'warning', title: 'Usuario Existente', text: 'Este nombre de usuario ya está en uso.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            Swal.fire({ icon: 'success', title: '¡Bienvenido!', text: 'Tu cuenta ha sido creada exitosamente.', confirmButtonColor: '#28a745', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
            if (registrarForm) registrarForm.reset();
            if (registrarModal) setTimeout(() => registrarModal.close(), 1500);
        });
    }

    // --- LÓGICA DE INICIO DE SESIÓN ---
    if (btnXCerrarIngresar && ingresarModal) {
        btnXCerrarIngresar.addEventListener('click', () => ingresarModal.close());
    }
    if (ingresarModal) {
        ingresarModal.addEventListener('click', (event) => {
            if (event.target === ingresarModal) ingresarModal.close();
        });
    }
    if (btnIngresarSubmit) {
        btnIngresarSubmit.addEventListener('click', () => {
            const loginIdentifier = loginEmailInput.value.trim();
            const loginPassword = loginPasswordInput.value.trim();

            if (!loginIdentifier || !loginPassword) {
                Swal.fire({ icon: 'error', title: 'Campos Incompletos', text: 'Por favor, ingresa tu email/usuario y contraseña.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.length === 0) {
                Swal.fire({ icon: 'error', title: 'Error de Inicio de Sesión', text: 'No hay usuarios registrados.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                return;
            }

            const foundUser = users.find(user => (user.email === loginIdentifier || user.username === loginIdentifier) && user.password === loginPassword);

            if (foundUser) {
                Swal.fire({ icon: 'success', title: `¡Bienvenido de nuevo, ${foundUser.username}!`, text: 'Has iniciado sesión correctamente.', confirmButtonColor: '#28a745', timer: 2000, timerProgressBar: true, position: 'top-start', width: '300px', showConfirmButton: false });
                sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
                if (ingresarForm) ingresarForm.reset();
                setTimeout(() => {
                    if (ingresarModal) ingresarModal.close();
                    actualizarUIUsuarioLogueado();
                }, 1500);
            } else {
                Swal.fire({ icon: 'error', title: 'Error de Inicio de Sesión', text: 'El email/usuario o la contraseña son incorrectos.', confirmButtonColor: '#d33', position: 'top-start', width: '300px', timer: 2500, showConfirmButton: false, timerProgressBar: true });
                if (loginPasswordInput) loginPasswordInput.value = '';
            }
        });
    }

    // --- LÓGICA PARA CERRAR SESIÓN ---
    function cerrarSesion() {
        Swal.fire({
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro de que quieres cerrar tu sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            background: "#FFF9E6",
            customClass: { title: "text-darkpurple", popup: "sweet-popup" },
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('currentUser');
                actualizarUIParaVisitante();
                Swal.fire({ title: '¡Sesión Cerrada!', text: 'Has cerrado sesión exitosamente.', icon: 'success', timer: 1500, showConfirmButton: false, background: "#FFF9E6", customClass: { title: "text-darkpurple", popup: "sweet-popup" } });
            }
        });
    }
    if (btnCerrarSesionPC) {
        btnCerrarSesionPC.addEventListener('click', cerrarSesion);
    }
    if (mobileLinkCerrarSesion) {
        mobileLinkCerrarSesion.addEventListener('click', (event) => {
            event.preventDefault();
            cerrarSesion();
            const menuLateral = document.getElementById('menu-lateral');
            if (menuLateral && menuLateral.classList.contains('mostrar')) {
                menuLateral.classList.remove('mostrar');
            }
        });
    }

    // --- LÓGICA DE RECUPERACIÓN DE CONTRASEÑA ---
    if (btnCerrarRecuperar && recuperarModal) {
        btnCerrarRecuperar.addEventListener('click', () => {
            resetRecuperarModal();
            recuperarModal.close();
        });
    }
    if (recuperarModal) {
        recuperarModal.addEventListener('click', (event) => {
            if (event.target === recuperarModal) {
                resetRecuperarModal();
                recuperarModal.close();
            }
        });
        recuperarModal.addEventListener('close', resetRecuperarModal);
    }
    if (btnAccionRecuperar) {
        btnAccionRecuperar.addEventListener('click', (event) => {
            event.preventDefault();
            if (emailParaRecuperar) {
                const nuevaPassword = nuevaPasswordInput.value.trim();
                const confirmarPassword = confirmarPasswordInput.value.trim();
                if (!nuevaPassword || !confirmarPassword) {
                    Swal.fire({ icon: 'error', title: 'Campos Vacíos', text: 'Por favor, ingresa y confirma tu nueva contraseña.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2500, showConfirmButton: false, timerProgressBar: true });
                    return;
                }
                if (nuevaPassword.length < 6) {
                    Swal.fire({ icon: 'error', title: 'Contraseña Débil', text: 'La nueva contraseña debe tener al menos 6 caracteres.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2500, showConfirmButton: false, timerProgressBar: true });
                    return;
                }
                if (nuevaPassword !== confirmarPassword) {
                    Swal.fire({ icon: 'error', title: 'No Coinciden', text: 'Las nuevas contraseñas no coinciden.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2500, showConfirmButton: false, timerProgressBar: true });
                    return;
                }
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(user => user.email === emailParaRecuperar);
                if (userIndex !== -1) {
                    users[userIndex].password = nuevaPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    Swal.fire({ icon: 'success', title: '¡Éxito!', text: 'Tu contraseña ha sido restablecida.', confirmButtonColor: '#28a745', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                    setTimeout(() => {
                        if (recuperarModal) recuperarModal.close();
                    }, 1500);
                } else {
                    Swal.fire({ icon: 'error', title: 'Error Inesperado', text: 'No se pudo encontrar el usuario para actualizar.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 3000, showConfirmButton: false, timerProgressBar: true });
                    resetRecuperarModal();
                }
            } else {
                const email = recuperarEmailInput.value.trim();
                if (!email) {
                    Swal.fire({ icon: 'error', title: 'Campo Vacío', text: 'Por favor, ingresa tu correo electrónico.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                    return;
                }
                if (!isValidEmail(email)) {
                    Swal.fire({ icon: 'error', title: 'Email Inválido', text: 'Por favor, ingresa un correo electrónico válido.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2000, showConfirmButton: false, timerProgressBar: true });
                    return;
                }
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userFound = users.find(user => user.email === email);
                if (userFound) {
                    emailParaRecuperar = userFound.email;
                    if (recuperarEmailSection) recuperarEmailSection.style.display = 'none';
                    if (nuevaPasswordSection) nuevaPasswordSection.style.display = 'block';
                    if (btnAccionRecuperar) btnAccionRecuperar.textContent = 'Restablecer Contraseña';
                    if (textoInstructivoRecuperar) textoInstructivoRecuperar.textContent = `Restablece la contraseña para ${userFound.email}.`;
                    if (nuevaPasswordInput) nuevaPasswordInput.focus();
                } else {
                    Swal.fire({ icon: 'warning', title: 'No Encontrado', text: 'El correo electrónico ingresado no está registrado.', confirmButtonColor: '#3085d6', position: 'top-start', width: '300px', timer: 2500, showConfirmButton: false, timerProgressBar: true });
                }
            }
        });
    }

    // --- TRANSICIONES ENTRE MODALES (LOGIN, REGISTRO, RECUPERAR) ---
    if (linkRegistrateDesdeLogin && registrarModal && ingresarModal) {
        linkRegistrateDesdeLogin.addEventListener('click', (e) => {
            e.preventDefault();
            ingresarModal.close();
            registrarModal.showModal();
        });
    }
    if (linkIngresarDesdeRegistro && ingresarModal && registrarModal) {
        linkIngresarDesdeRegistro.addEventListener('click', (e) => {
            e.preventDefault();
            registrarModal.close();
            ingresarModal.showModal();
        });
    }
    const linkRecuperarDesdeLogin = document.getElementById('link-recuperar-password-desde-login');
    if (linkRecuperarDesdeLogin && recuperarModal && ingresarModal) {
        linkRecuperarDesdeLogin.addEventListener('click', (e) => {
            e.preventDefault();
            ingresarModal.close();
            recuperarModal.showModal();
        });
    }
    if (linkVolverLoginRecuperar && ingresarModal && recuperarModal) {
        linkVolverLoginRecuperar.addEventListener('click', (e) => {
            e.preventDefault();
            recuperarModal.close();
            ingresarModal.showModal();
        });
    }

    // --- INICIALIZACIÓN DE UI AL CARGAR PÁGINA ---
    if (sessionStorage.getItem('currentUser')) {
        actualizarUIUsuarioLogueado();
    } else {
        actualizarUIParaVisitante();
    }
});