// Récupération des boutons des filtres
const boutonTous = document.getElementById("tous");
const boutonObjets = document.getElementById("objets");
const boutonApparts = document.getElementById("appartements");
const boutonHotels = document.getElementById("hotels");

// Fonction pour filtrer les images par catégorie
function filtres(value) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    try {
        console.log("Category filter value:", value);

        const filtreElement = elementArray.filter(element => element.categoryId === value || value === null);
        console.log("Éléments filtrés :", filtreElement);
        retrieveData(filtreElement);
    } catch (error) {
        console.error("Erreur lors du filtrage des éléments :", error);
    }
}

// Ajout des écouteurs d'événements pour les boutons de filtre
boutonTous.addEventListener('click', () => imageBase()); // Afficher toutes les images
boutonObjets.addEventListener('click', () => filtres(1)); // Filtrer par catégorie 1 (Objets)
boutonApparts.addEventListener('click', () => filtres(2)); // Filtrer par catégorie 2 (Appartements)
boutonHotels.addEventListener('click', () => filtres(3)); // Filtrer par catégorie 3 (Hôtels)