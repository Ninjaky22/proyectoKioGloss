document.addEventListener('DOMContentLoaded', function () {

    const sliderContainer = document.querySelector('.slider-container');

    const sliderWrapper = document.querySelector('.slider-wrapper');

    const prevButton = document.querySelector('.prev-button');

    const nextButton = document.querySelector('.next-button');

    const productCards = document.querySelectorAll('.product-card');

    let currentIndex = 0;

    let cardsToShow = 4; // Cantidad de tarjetas a mostrar inicialmente

    let cardWidth = 0;



    function calculateCardWidth() {

        if (productCards.length > 0) {

            const firstCardStyle = window.getComputedStyle(productCards[0]);

            const cardOuterWidth = productCards[0].offsetWidth + parseInt(firstCardStyle.marginRight) + parseInt(firstCardStyle.marginLeft);

            cardWidth = cardOuterWidth;

        } else {

            cardWidth = 0;

        }

    }



    function updateSlider() {

        sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

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

            prevButton.style.display = currentIndex > 0 ? 'block' : 'none';

        }

        if (nextButton) {

            nextButton.style.display = currentIndex < productCards.length - cardsToShow ? 'block' : 'none';

        }

    }



    // Inicialización

    if (productCards.length > 0) {

        calculateCardWidth(); // Aseguramos que el ancho se calcule primero



        // Ajustar el ancho del slider-wrapper para contener todas las tarjetas

        sliderWrapper.style.width = `${productCards.length * cardWidth}px`;



        updateSlider();



        if (nextButton) {

            nextButton.addEventListener('click', nextSlide);

        }

        if (prevButton) {

            prevButton.addEventListener('click', prevSlide);

        }

        window.addEventListener('resize', () => {

            calculateCardWidth();

            updateSlider();

        });

    }

});