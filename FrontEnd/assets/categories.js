// Récupération des boutons des filtres
const boutonTous = document.getElementById("tous");
const boutonObjets = document.getElementById("objets");
const boutonApparts = document.getElementById("appartements");
const boutonHotels = document.getElementById("hotels");

// Fonction pour la récupération de l'id des catégories pour les images
async function retrieveCategory() {
    try {
        const data = await getImages();
        const categories = [];
        for(let i = 0; i < data.length; i++) {
            const element = data[i];
            categories.push(element.categoryId);           
        }
        return categories;
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
        return [];
    }
}

// Fonction pour la récupération de l'id des catégories
async function categories() {
    try {
        const data = await getCategories();
        const categoriesId = [];
        for(let i = 0; i < data.length; i++) {
            const element = data[i];
            categoriesId.push(element.id);
        }
        return categoriesId;
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
        return [];
    }
}

// Fonction pour savoir si les deux Id des API coïncident
async function filtres(value) { 
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    try { 
        const categoryIds = await categories();
        const imageCategoryIds = await retrieveCategory();

        console.log("Category IDs:", categoryIds);
        console.log("Image Category IDs:", imageCategoryIds);
        
        const filtreElement = elementArray.filter(element => element.categoryId === value || value === null);
        console.log("Éléments filtrés :", filtreElement);
        retrieveData(Promise.resolve(filtreElement));
    } catch (error) {
        console.error("Erreur lors du filtrage des éléments :", error);
    }
}

// Ajout des écouteurs d'événements pour les boutons de filtre
boutonTous.addEventListener('click', () => retrieveData(getImages()));
boutonObjets.addEventListener('click', () => filtres(1));
boutonApparts.addEventListener('click', () => filtres(2));
boutonHotels.addEventListener('click', () => filtres(3));