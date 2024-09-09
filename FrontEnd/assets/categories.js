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

// Fonction pour réinitialiser les couleurs de tous les boutons
function resetBoutonsStyle() {
    const boutons = document.querySelectorAll('button');
    for (let bouton of boutons) {
        bouton.style.backgroundColor = '#FFFEF8';
        bouton.style.color = '#1D6154'; 
    }
}

// Fonction pour gérer le changement de style des boutons actifs
function changerCouleurBoutonActif(bouton) {
    resetBoutonsStyle(); // Réinitialiser les styles de tous les boutons

    // Ajouter la classe 'button-actif' au bouton cliqué
    bouton.classList.add('button-actif');

    // Changer la couleur du bouton au click
    bouton.style.backgroundColor = '#1D6154'; 
    bouton.style.color = '#FFFFFF'; 
}

// Ajout d'event pour les filtres et le changement de couleur pour chaque bouttons
boutonTous.addEventListener('click', () => {
    imageBase();
    changerCouleurBoutonActif(boutonTous);
});
boutonObjets.addEventListener('click', () => {
    filtres(1);
    changerCouleurBoutonActif(boutonObjets); 
});
boutonApparts.addEventListener('click', () => {
    filtres(2); 
    changerCouleurBoutonActif(boutonApparts); 
});
boutonHotels.addEventListener('click', () => {
    filtres(3);
    changerCouleurBoutonActif(boutonHotels); 
});
