document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".slider-container");
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const productCards = document.querySelectorAll(".product-card");

  let currentIndex = 0;
  let cardsToShow = getCardsToShow(); // Función para determinar cuántas tarjetas mostrar
  let cardWidth = 0;

  function getCardsToShow() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return 2; // Mostrar 2 tarjetas en móviles
    } else if (screenWidth < 1024) {
      return 3; // Mostrar 3 tarjetas en tablets
    } else {
      return 4; // Mostrar 4 tarjetas en escritorio
    }
  }

  function calculateCardWidth() {
    if (productCards.length > 0) {
      const firstCardStyle = window.getComputedStyle(productCards[0]);
      const cardOuterWidth =
        productCards[0].offsetWidth +
        parseInt(firstCardStyle.marginRight) +
        parseInt(firstCardStyle.marginLeft);
      cardWidth = cardOuterWidth;
    } else {
      cardWidth = 0;
    }
  }

  function updateSlider() {
    sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth
      }px)`;
    updateButtonVisibility();
  }

  function nextSlide() {
    if (currentIndex < productCards.length - cardsToShow) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function updateButtonVisibility() {
    if (prevButton) {
      prevButton.style.display = currentIndex > 0 ? "block" : "none";
    }

    if (nextButton) {
      nextButton.style.display =
        currentIndex < productCards.length - cardsToShow ? "block" : "none";
    }
  }

  function initializeSlider() {
    cardsToShow = getCardsToShow();
    calculateCardWidth();
    sliderWrapper.style.width = `${productCards.length * cardWidth}px`;
    updateSlider();
    updateButtonVisibility();
  }

  // Inicialización
  if (productCards.length > 0) {
    initializeSlider();

    if (nextButton) {
      nextButton.addEventListener("click", nextSlide);
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide);
    }

    window.addEventListener("resize", () => {
      initializeSlider(); // Recalcular al cambiar el tamaño de la ventana
    });
  }
});