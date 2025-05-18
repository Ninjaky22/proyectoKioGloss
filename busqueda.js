document.addEventListener('DOMContentLoaded', function () {
    const terminoBusquedaInputs = document.querySelectorAll('#terminoBusqueda, #terminoBusquedaMobil');

    // --- INICIO DE LA LISTA DE ELEMENTOS BUSCABLES (COMPLETA Y CORREGIDA) ---
    const itemsBuscables = [
        // De index.html
        { term: "Inicio", url: "index.html#top" },
        { term: "Productos", url: "productos.html#top" },
        { term: "Nosotros", url: "Nosotros.html#top" },
        { term: "Productos Destacados", url: "index.html#productos-destacados" },

        // De Nosotros.html
        { term: "Fundadora Diana Penagos", url: "Nosotros.html#fundadora" },
        { term: "¿Quiénes Somos? KIO Gloss", url: "Nosotros.html#quienes-somos" },
        { term: "Misión KIO Gloss", url: "Nosotros.html#mision" },
        { term: "Visión KIO Gloss", url: "Nosotros.html#vision" },

        // Categorías
        { term: "Cuidado Facial", url: "productos.html#facial" },
        { term: "Maquillaje", url: "productos.html#maquillaje" },
        { term: "Desmaquillantes", url: "productos.html#desma" },
        { term: "Tónicos", url: "productos-pag2.html#tonicos" },
        { term: "Cuidado Capilar", url: "productos-pag2.html#capilar" },
        { term: "Brochas", url: "productos-pag2.html#brochas" },

        // Productos individuales
        { term: "Kit de Arroz Bioaqua", url: "productos.html#facial" },
        { term: "Kit de Vitamina C Bioaqua", url: "productos.html#facial" },
        { term: "Kit de Acido Hialuronico Bioaqua", url: "productos.html#facial" },
        { term: "Crema Hidratante Arandanos Bioaqua", url: "productos.html#facial" },
        { term: "Sombras Colección Retro Coral Trendy", url: "productos.html#maquillaje" },
        { term: "Sombras Colección Retro Lila Trendy", url: "productos.html#maquillaje" },
        { term: "Sombras Colección Retro Old Rose Trendy", url: "productos.html#maquillaje" },
        { term: "Sombras Colección Retro Mint Trendy", url: "productos.html#maquillaje" },
        { term: "Desmaquillante en Aceite Trendy", url: "productos.html#desma" },
        { term: "Desmaquillante en Espuma Trendy", url: "productos.html#desma" },
        { term: "Agua Micelar Reparadora Nivea", url: "productos.html#desma" },
        { term: "Agua Micelar Avene Cleanance", url: "productos.html#desma" },
        { term: "Tonico de Rosas 120 ML Trendy", url: "productos-pag2.html#tonicos" },
        { term: "Tonico de Hamamelis Kool Skin Kavila", url: "productos-pag2.html#tonicos" },
        { term: "Pure Vitamin C10 - La Roche Posay", url: "productos-pag2.html#tonicos" },
        { term: "Retinol Suero B3 30ml LA ROCHE POSAY", url: "productos-pag2.html#tonicos" },
        { term: "Aceite de Coco Extravirgen 125ml", url: "productos-pag2.html#capilar" },
        { term: "Aceite de Coco Extravirgen 250ml", url: "productos-pag2.html#capilar" },
        { term: "Suero Capilar Repara Puntas Luna Llena", url: "productos-pag2.html#capilar" },
        { term: "Aceite Multiproposito Suspiros", url: "productos-pag2.html#capilar" },
        { term: "Mini Brocha para Base Trendy", url: "productos-pag2.html#brochas" },
        { term: "Bunny Blender Esponja Profesional Trendy", url: "productos-pag2.html#brochas" },
        { term: "Mini Brocha para Rubor Trendy", url: "productos-pag2.html#brochas" },
        { term: "Mini Brocha para Polvo Trendy", url: "productos-pag2.html#brochas" }
    ];
    // --- FIN DE LA LISTA DE ELEMENTOS BUSCABLES ---

    terminoBusquedaInputs.forEach(function (terminoBusquedaInput) {
        const searchContainer = terminoBusquedaInput.closest('.search-container');
        let suggestionsDiv = null;

        terminoBusquedaInput.addEventListener('input', function () {
            const query = this.value.trim().toLowerCase();

            if (suggestionsDiv) {
                suggestionsDiv.remove();
                suggestionsDiv = null;
            }

            if (query.length < 3) return;

            const filteredItems = itemsBuscables.filter(item =>
                item.term.toLowerCase().includes(query)
            );

            suggestionsDiv = document.createElement('div');
            suggestionsDiv.classList.add('search-suggestions');

            if (filteredItems.length > 0) {
                const ul = document.createElement('ul');
                filteredItems.forEach(item => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = item.url;
                    a.textContent = item.term;
                    a.addEventListener('click', () => {
                        if (suggestionsDiv) {
                            suggestionsDiv.remove();
                            suggestionsDiv = null;
                        }
                    });
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                suggestionsDiv.appendChild(ul);
            } else {
                const noResultsMessage = document.createElement('p');
                noResultsMessage.classList.add('search-no-results');
                noResultsMessage.textContent = 'No se encontraron resultados de la búsqueda';
                suggestionsDiv.appendChild(noResultsMessage);
            }

            if (searchContainer) {
                searchContainer.appendChild(suggestionsDiv);
            } else {
                this.parentNode.insertBefore(suggestionsDiv, this.nextSibling);
            }
        });

        document.addEventListener('click', function (event) {
            if (suggestionsDiv && searchContainer && !searchContainer.contains(event.target) && event.target !== terminoBusquedaInput) {
                suggestionsDiv.remove();
                suggestionsDiv = null;
            }
        });

        const searchForm = terminoBusquedaInput.closest('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function (event) {
                event.preventDefault();
                if (suggestionsDiv && suggestionsDiv.querySelector('ul li a')) {
                    suggestionsDiv.querySelector('ul li a').click();
                }
            });
        }
    });
});
