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
            categories.push(element.category.id);           
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

let elementArrayCopy = [];

// Fonction pour savoir si les deux Id des API coïncident
async function filtres(value) { 
    
    const categoryIds = await categories();
    const imageCategoryIds = await retrieveCategory();

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    console.log("Category IDs:", categoryIds);
    console.log("Image Category IDs:", imageCategoryIds);
    
    let newArray = [];
    elementArrayCopy = elementArray.filter((element) => element.categoryid === value || value === null);
    retrieveData(elementArrayCopy);
    console.log(elementArrayCopy);

    for(let i = 0; i < imageCategoryIds.length; i++) {
        newArray = imageCategoryIds.filter(id => categoryIds.includes(id) && id === value);
        return newArray;
    }    
}

boutonTous.addEventListener('click', () => filtres(1,2,3));
boutonObjets.addEventListener('click', () => filtres(1));
boutonApparts.addEventListener('click', () => filtres(2));
boutonHotels.addEventListener('click', () => filtres(3));