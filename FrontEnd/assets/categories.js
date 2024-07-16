// Récupération des boutons de filtres
const boutonTous = document.getElementById("tous");
const boutonObjets = document.getElementById("objets");
const boutonApparts = document.getElementById("appartements");
const boutonHotels = document.getElementById("hotels");
const a = 1;
const b = 2;
const c = 3;

// Fonction pour la récuperation de l'id des catégories pour les images
async function retrieveCategory() {
    try {
        const data = await getImages();
        for(let i = 0; i < data.length; i++) {
            const element = data[i];
            const categories = 0;
            categories.id = element.category.id; 
        }
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

// Fonction pour la la recuperation de l'id des catégories
async function categories() {
    try {
        const elementId = await getCategories();
        for(let i = 0; i < elementId.length; i++) {
            const element = elementId[i];
            const categoriesId = 0;
            categoriesId.id = element.id;
        }
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

// Fonction pour sa voir si les deux Id des API coïncide
async function filtres() { 
    if (categories() === retrieveCategory()) {
        return 'correct';
    } else {
        return 'wrong';
    }
}

const category = await categories()
console.log(category);