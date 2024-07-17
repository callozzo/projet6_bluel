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
        if (!response.ok){
            throw new Error(`status error : ${response.status}`)
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

//Fonction pour récupérer les catégories
async function getCategories() {
    return await fetchData(categorieUrl);
}

// Fonction pour récupérer les données et créer les éléments du DOM
async function retrieveData(e) {
    try {
        const data = await e;
        for(let element of data) {
            const figure = document.createElement("figure");
            parentElement.appendChild(figure);
            figure.id = element.id;

            const imageApi = document.createElement("img");
            imageApi.src = element.imageUrl;
            figure.appendChild(imageApi);

            const textApi = document.createElement("figcaption");
            textApi.innerHTML = element.title;
            figure.appendChild(textApi);

            elementArray.push({id: element.id, imageUrl: element.imageUrl, title: element.title, categoryid: element.category.id});
        }  
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
    console.log(elementArray);
}

// Appel de la fonction principale
retrieveData(getImages());