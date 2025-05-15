document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad del Carrito Modal ---
    const carritoModal = document.getElementById('carrito-modal');
    const carritoBtn = document.querySelector('.carrito');
    const cerrarCarritoBtn = document.querySelector('.cerrar-carrito');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const totalPrecioSpan = document.getElementById('total-precio');

    // Mostrar el modal del carrito
    if (carritoBtn) {
        carritoBtn.addEventListener('click', () => {
            actualizarCarritoUI(); // Actualizar la UI al abrir
            carritoModal.classList.add('mostrar');
        });
    }

    // Ocultar el modal del carrito
    if (cerrarCarritoBtn) {
        cerrarCarritoBtn.addEventListener('click', () => {
            carritoModal.classList.remove('mostrar');
        });
    }

    function actualizarCarritoUI() {
        carritoItemsContainer.innerHTML = '';
        let total = 0;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((item, index) => {
            const carritoItem = document.createElement('div');
            carritoItem.classList.add('carrito-item');
            carritoItem.innerHTML = `
                <div class="carrito-item-detalles">
                    <p class="carrito-item-nombre">${item.name}</p>
                    <p class="carrito-item-precio">$${item.total.toFixed(2)}</p>
                    <div class="carrito-item-cantidad">
                        <button class="cantidad-btn restar-carrito" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="cantidad-btn sumar-carrito" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="eliminar-item" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            carritoItemsContainer.appendChild(carritoItem);
            total += item.total;
        });

        totalPrecioSpan.textContent = `$${total.toFixed(2)}`;

        // Event listeners para los botones de cantidad y eliminar en el carrito modal
        const botonesSumarCarrito = carritoItemsContainer.querySelectorAll('.cantidad-btn.sumar-carrito');
        const botonesRestarCarrito = carritoItemsContainer.querySelectorAll('.cantidad-btn.restar-carrito');
        const botonesEliminarItem = carritoItemsContainer.querySelectorAll('.eliminar-item');

        botonesSumarCarrito.forEach(boton => {
            boton.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart[index].quantity++;
                cart[index].total = cart[index].price * cart[index].quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                actualizarCarritoUI();
            });
        });

        botonesRestarCarrito.forEach(boton => {
            boton.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    cart[index].total = cart[index].price * cart[index].quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    actualizarCarritoUI();
                }
            });
        });

        botonesEliminarItem.forEach(boton => {
            boton.addEventListener('click', function () {
                const indexAEliminar = parseInt(this.dataset.index);
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const productoAEliminar = cart[indexAEliminar].name;

                Swal.fire({
                    title: '¿Estás seguro de eliminar?',
                    text: `¿Deseas eliminar "${productoAEliminar}" del carrito?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, Eliminar',
                    cancelButtonText: 'Cancelar',
                    background: '#FFF9E6',
                    customClass: {
                        title: 'text-darkpurple',
                        popup: 'sweet-popup'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        let updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
                        updatedCart.splice(indexAEliminar, 1);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        actualizarCarritoUI();
                        Swal.fire({
                            title: '¡Eliminado!',
                            text: `"${productoAEliminar}" ha sido eliminado del carrito.`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                            background: '#FFF9E6',
                            customClass: {
                                title: 'text-darkpurple',
                                popup: 'sweet-popup'
                            }
                        });
                    }
                });
            });
        });
    }

    // Botón de compra en la cuadrícula de productos
    document.querySelectorAll('.product-card .product-actions .buy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const product = JSON.parse(btn.dataset.product);
            // Subimos dos niveles para llegar al .product-card y luego buscamos .quantity-input
            const quantityInput = btn.closest('.product-card').querySelector('.quantity-selector .quantity-input');
            const quantity = parseInt(quantityInput.value);

            const cartItem = {
                ...product,
                quantity,
                total: product.price * quantity
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
                cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            actualizarCarritoUI(); // Actualizar la interfaz del carrito al añadir un nuevo producto
            Swal.fire({
                icon: "success",
                title: `${quantity} ${quantity > 1 ? 'unidades' : 'unidad'} de`,
                html: `<strong>${product.name}</strong><br>¡Añadidas al carrito!`,
                showConfirmButton: false,
                timer: 1500,
                background: '#FFF9E6',
                customClass: {
                    title: 'text-darkpurple',
                    popup: 'sweet-popup'
                }
            });
            quantityInput.value = 1; // Resetear la cantidad en la tarjeta de producto
        });
    });

    // Selector de cantidad en la cuadrícula de productos
    document.querySelectorAll('.product-card .quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);

            if (btn.classList.contains('minus')) {
                input.value = value > 1 ? value - 1 : 1;
            } else {
                input.value = value + 1;
            }
        });
    });

    // Inicializar la UI del carrito al cargar la página
    actualizarCarritoUI();
});