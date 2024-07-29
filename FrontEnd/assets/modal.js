//Récuperation de tout les id et class des modals
let modal = document.getElementById('modal1');
let openModal = document.querySelector('.modal-button');
let closeModal = document.querySelector('.fa-xmark');
let galleryModal = document.querySelector('.galleryModal');
let trashCan = document.querySelector('.fa-trash-can')
let elemntArrayCopy = [];
let modal2 = document.getElementById('modal2');
let addPhoto = document.getElementById('addPhotoModal');
let previousModal = document.querySelector('.fa-arrow-left');
let validationPhoto = document.getElementById('validation');
let addImage = document.getElementById('addImage');


//Ouverture de la première modal
openModal.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'flex';
});

//Fermeture de la première modal en cliquant soit sur la croix soit en dehors de la modal
window.addEventListener('click', function(event) {
    if(event.target === modal || event.target === closeModal ) {
        modal.style.display = 'none';
    }
})

//Ouverture de la deuxième modal
addPhoto.addEventListener('click', function(event) {
    event.preventDefault();
    modal2.style.display = "flex";
})

//Pareil que la fonction ligne 21 avec la deuxième modal en plus
window.addEventListener ('click', function(event) {
    if(event.target === modal2 || event.target === closeModal) {
        modal2.style.display = "none";
        modal.style.display = 'none';
    }
})

//Retour vers la première modal
modal2.addEventListener('click', function(event) {
    if(event.target === previousModal) {
        modal2.style.display = "none";
    }
})

//Fonction d'affichage des images sur la première modal, ajout de l'icon poubelle
async function retrieveDataCopy(data) {
    try {
        console.log("Données traitées :", data);
        data.forEach(element => {
            if (element && element.id && element.imageUrl && element.title && element.categoryId) {
                const figure = document.createElement("figure");
                galleryModal.appendChild(figure);
                figure.id = element.id;

                const imageApi = document.createElement("img");
                imageApi.src = element.imageUrl;
                figure.appendChild(imageApi);

                const trashIcon = document.createElement("i");
                trashIcon.className = 'fa-solid fa-trash-can';
                figure.appendChild(trashIcon);

                console.log("Élément ajouté au DOM :", element);
            } else {
                console.warn("Élément manquant de propriétés nécessaires :", element);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

async function imageBaseCopy() {
    const images = await getImages();
    elementArrayCopy = images; // Stocker les données récupérées dans elementArray
    retrieveDataCopy(images); // Afficher toutes les images quand on arrive sur la modal
}

imageBaseCopy()