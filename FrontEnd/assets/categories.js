// Récupération des boutons des filtres
const boutonTous = document.getElementById("tous");

// Ajout d'une fonction pour la recuperation des categories
async function retrieveCategories(data) {
    let parentElement = document.getElementById("categorie")
    try {
        data.forEach(element => {
            if (element && element.id && element.name) {
                const button = document.createElement("button");
                parentElement.appendChild(button);
                button.id = element.name;
                button.innerHTML = element.name

                // Event pour filtrer en fonction des ids des boutons plus changement de couleurs
                button.addEventListener('click', () => {
                    filtres(element.id);
                    changerCouleurBoutonActif(button);
                })
            } else {
                console.warn("Élément manquant de propriétés nécessaires :", element);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

// Appel de la fonction pour recuperer les categories et les stocker dans le tableau
async function categorieBase() {
    let categorieArray = []
    const categorie = await getCategories();
    categorieArray = categorie;
    retrieveCategories(categorie);
}

categorieBase();

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

window.addEventListener('DOMContentLoaded', () => {
    changerCouleurBoutonActif(boutonTous);
})

// Ajout d'event pour les filtres et le changement de couleur pour le bouton Tous
boutonTous.addEventListener('click', () => {
    imageBase();
    changerCouleurBoutonActif(boutonTous);
});

