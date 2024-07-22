// URL des données
let imgUrl = 'http://localhost:5678/api/works';
let categorieUrl = 'http://localhost:5678/api/categories';

// Sélection de l'élément parent dans le DOM
const parentElement = document.querySelector(".gallery");

let elementArray = [];

// Fonction pour récupérer les données à partir d'une URL
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de statut : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Fonction pour récupérer les images
async function getImages() {
    return await fetchData(imgUrl);
}

// Fonction pour récupérer les données et créer les éléments du DOM
async function retrieveData(data) {
    // Vider l'élément parent avant d'ajouter les nouveaux éléments
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    try {
        console.log("Données traitées :", data);
        data.forEach(element => {
            if (element && element.id && element.imageUrl && element.title && element.categoryId) {
                const figure = document.createElement("figure");
                parentElement.appendChild(figure);
                figure.id = element.id;

                const imageApi = document.createElement("img");
                imageApi.src = element.imageUrl;
                figure.appendChild(imageApi);

                const textApi = document.createElement("figcaption");
                textApi.innerHTML = element.title;
                figure.appendChild(textApi);

                console.log("Élément ajouté au DOM :", element);
            } else {
                console.warn("Élément manquant de propriétés nécessaires :", element);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

// Appel de la fonction principale pour récupérer les images et les stocker dans elementArray
async function imageBase() {
    const images = await getImages();
    elementArray = images; // Stocker les données récupérées dans elementArray
    retrieveData(images); // Afficher toutes les images quand on arrive sur la page
}

imageBase();