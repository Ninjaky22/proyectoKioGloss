document.addEventListener("DOMContentLoaded", () => {
  // --- Selección de Elementos del DOM ---
  const carritoModal = document.getElementById("carrito-modal");
  const carritoBtns = document.querySelectorAll(".carrito"); // Para botones de abrir carrito (escritorio y móvil)
  const cerrarCarritoBtn = document.querySelector(".cerrar-carrito");
  const carritoItemsContainer = document.getElementById("carrito-items");
  const totalPrecioSpan = document.getElementById("total-precio");
  const pagarBtn = document.querySelector(".pagar-btn");

  // --- Funciones ---

  /**
   * Actualiza la interfaz de usuario (UI) del carrito de compras.
   * Limpia y reconstruye los ítems del carrito, actualiza el total y
   * reasigna los event listeners a los botones de cantidad y eliminar.
   */
  function actualizarCarritoUI() {
    if (!carritoItemsContainer || !totalPrecioSpan) {
      console.error("Elementos del carrito no encontrados en el DOM.");
      return;
    }

    carritoItemsContainer.innerHTML = ""; // Limpiar ítems actuales
    let totalGeneral = 0;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      carritoItemsContainer.innerHTML = '<p style="text-align: center; margin-top: 20px; color: #777;">Tu carrito está vacío.</p>';
    } else {
      cart.forEach((item, index) => {
        const carritoItemDiv = document.createElement("div");
        carritoItemDiv.classList.add("carrito-item");

        const imageUrl = item.imageSrc ? item.imageSrc : "img_cat/default-placeholder.png";
        const itemTotal = (item.price * item.quantity).toFixed(2); // Asegurar que el total del ítem se calcule aquí

        carritoItemDiv.innerHTML = `
          <img src="${imageUrl}" alt="${item.name}" class="carrito-item-imagen">
          <div class="carrito-item-detalles">
            <p class="carrito-item-nombre">${item.name}</p>
            <p class="carrito-item-precio">$${itemTotal}</p>
            <div class="carrito-item-cantidad">
              <button class="cantidad-btn restar-carrito" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="cantidad-btn sumar-carrito" data-index="${index}">+</button>
            </div>
          </div>
          <button class="eliminar-item" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
        `;
        carritoItemsContainer.appendChild(carritoItemDiv);
        totalGeneral += item.price * item.quantity; // Sumar al total general
      });
    }
    totalPrecioSpan.textContent = `$${totalGeneral.toFixed(2)}`;

    // Re-asignar event listeners para botones dentro del carrito (porque se regeneran)
    asignarEventListenersItemsCarrito();
  }

  /**
   * Asigna event listeners a los botones de sumar, restar y eliminar de los ítems del carrito.
   */
  function asignarEventListenersItemsCarrito() {
    // Botones Sumar Cantidad en Carrito
    carritoItemsContainer.querySelectorAll(".cantidad-btn.sumar-carrito").forEach(boton => {
      boton.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index]) {
          cart[index].quantity++;
          // No es necesario recalcular cart[index].total aquí si el precio es por unidad
          localStorage.setItem("cart", JSON.stringify(cart));
          actualizarCarritoUI();
        }
      });
    });

    // Botones Restar Cantidad en Carrito
    carritoItemsContainer.querySelectorAll(".cantidad-btn.restar-carrito").forEach(boton => {
      boton.addEventListener("click", function () {
        const index = parseInt(this.dataset.index);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart[index] && cart[index].quantity > 1) {
          cart[index].quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          actualizarCarritoUI();
        }
      });
    });

    // Botones Eliminar Ítem del Carrito
    carritoItemsContainer.querySelectorAll(".eliminar-item").forEach(boton => {
      boton.addEventListener("click", function () {
        const indexAEliminar = parseInt(this.dataset.index);
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productoAEliminar = cart[indexAEliminar] ? cart[indexAEliminar].name : "El producto";

        Swal.fire({
          title: "¿Estás seguro de eliminar?",
          text: `¿Deseas eliminar "${productoAEliminar}" del carrito?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, Eliminar",
          cancelButtonText: "Cancelar",
          background: "#FFF9E6",
          customClass: { title: "text-darkpurple", popup: "sweet-popup" },
        }).then((result) => {
          if (result.isConfirmed) {
            cart.splice(indexAEliminar, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            actualizarCarritoUI();
            Swal.fire({
              title: "¡Eliminado!",
              text: `"${productoAEliminar}" ha sido eliminado del carrito.`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              background: "#FFF9E6",
              customClass: { title: "text-darkpurple", popup: "sweet-popup" },
            });
          }
        });
      });
    });
  }

  // --- Event Listeners Generales del Carrito ---

  // Mostrar el modal del carrito
  if (carritoBtns.length > 0 && carritoModal) {
    carritoBtns.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        actualizarCarritoUI();
        carritoModal.classList.add("mostrar");
      });
    });
  }

  // Ocultar el modal del carrito
  if (cerrarCarritoBtn && carritoModal) {
    cerrarCarritoBtn.addEventListener("click", () => {
      carritoModal.classList.remove("mostrar");
    });
  }

  // Lógica para el botón "Pagar"
  if (pagarBtn && carritoModal) {
    pagarBtn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Carrito Vacío",
          text: "Aún no has añadido productos a tu carrito.",
          background: "#FFF9E6",
          customClass: { title: "text-darkpurple", popup: "sweet-popup" },
        });
        return;
      }

      Swal.fire({
        title: "Procesando Pago...",
        text: "En unos minutos se realizará tu pago.",
        icon: "info",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#FFF9E6",
        customClass: { title: "text-darkpurple", popup: "sweet-popup" },
      }).then(() => {
        Swal.fire({
          icon: "success",
          title: "¡Gracias por tu compra!",
          text: "Tu pedido ha sido procesado exitosamente.",
          showConfirmButton: true,
          background: "#FFF9E6",
          customClass: { title: "text-darkpurple", popup: "sweet-popup" },
        }).then(() => {
          localStorage.removeItem("cart");
          actualizarCarritoUI();
          carritoModal.classList.remove("mostrar");
        });
      });
    });
  }

  // --- Lógica para Añadir Productos al Carrito (desde las tarjetas de producto) ---

  document.querySelectorAll(".product-card .product-actions .buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      if (!productCard) {
        console.error("Contenedor de producto no encontrado.");
        return;
      }

      const productDataString = btn.dataset.product;
      if (!productDataString) {
        console.error("Atributo data-product no encontrado en el botón.");
        return;
      }

      let product;
      try {
        product = JSON.parse(productDataString);
      } catch (e) {
        console.error("Error al parsear data-product JSON:", e, productDataString);
        return;
      }

      const quantityInput = productCard.querySelector(".quantity-selector .quantity-input");
      if (!quantityInput) {
        console.error("Input de cantidad no encontrado.");
        return;
      }
      const quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity <= 0) {
        console.error("Cantidad inválida.");
        return;
      }

      const cartItem = {
        name: product.name,
        price: parseFloat(product.price), // Asegurar que el precio sea un número
        imageSrc: product.imageSrc,
        quantity: quantity,
        // El total por ítem se calculará en actualizarCarritoUI o se puede almacenar aquí si se prefiere
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(item => item.name === cartItem.name);

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      actualizarCarritoUI(); // Actualizar la UI del modal del carrito

      Swal.fire({
        icon: "success",
        title: `${quantity} ${quantity > 1 ? "unidades" : "unidad"} de`,
        html: `<strong>${product.name}</strong><br>¡Añadidas al carrito!`,
        showConfirmButton: false,
        timer: 1500,
        background: "#FFF9E6",
        customClass: { title: "text-darkpurple", popup: "sweet-popup" },
      });
      quantityInput.value = 1; // Resetear cantidad en la tarjeta
    });
  });

  // Selectores de cantidad en las tarjetas de producto
  document.querySelectorAll(".product-card .quantity-selector .quantity-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const quantitySelector = btn.closest(".quantity-selector");
      if (!quantitySelector) return;
      const input = quantitySelector.querySelector(".quantity-input");
      if (!input) return;

      let value = parseInt(input.value);
      if (btn.classList.contains("minus")) {
        if (value > 1) value--;
      } else if (btn.classList.contains("plus")) {
        value++;
      }
      input.value = value;
    });
  });

  // --- Inicialización ---
  actualizarCarritoUI(); // Cargar el estado del carrito al iniciar la página
});