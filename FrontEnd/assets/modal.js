//Récuperation de tout les id et class des modals
//Récuperation des id et classes de la premiere modal
let modal1 = document.getElementById('modal1');
let openModal = document.querySelector('.modal-button');
let closeModal = document.querySelectorAll('.fa-xmark');
let galleryModal = document.querySelector('.galleryModal');
let trashCan = document.querySelector('.fa-trash-can')
let elemntArrayCopy = [];
//Récuperation des id et classes de la deuxième modal
let modal2 = document.getElementById('modal2');
let addPhoto = document.getElementById('addPhotoModal');
let previousModal = document.querySelector('.fa-arrow-left');
let validationPhoto = document.getElementById('validation');
let addImage = document.getElementById('addImage');
let namePhoto = document.getElementById('name');
let selectCategories = document.getElementById('selectCategories');
let imageConteneur = document.getElementById('imageBox');
let ajoutImage = document.getElementById('ajoutImage');
let formulaire = document.getElementById('myForm');

namePhoto.addEventListener('input', validerPhoto);
selectCategories.addEventListener('change', validerPhoto);

//Ouverture de la première modal
openModal.addEventListener('click', function(event) {
    event.preventDefault();
    modal1.style.display = 'flex';
});

//Ouverture de la deuxième modal
addPhoto.addEventListener('click', function(event) {
    event.preventDefault();
    modal2.style.display = "flex";
})

//Fermeture des modals via la croix
closeModal.forEach(button => {
    button.addEventListener('click', function() {
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    });
});

//fermeture des modal en cliquant en dehors de celle-ci
window.addEventListener ('click', function(event) {
    if(event.target === modal1 || event.target === modal2) {
        modal1.style.display = 'none';
        modal2.style.display = "none";
    }
})

//Retour vers la première modal
modal2.addEventListener('click', function(event) {
    if(event.target === previousModal) {
        modal2.style.display = "none";
    }
})

function validerPhoto(event) {
    const namePhotoValue = namePhoto.value.trim(); // Récupère la valeur et supprime les espaces blancs
    const selectedCategory = selectCategories.value;

    if(namePhotoValue !== "" && selectedCategory !== "") {
        validationPhoto.style.backgroundColor = "#1D6154";
    }else {
        validationPhoto.style.backgroundColor = "#A7A7A7";
        alert("image, nom ou categorie non renseigner");
        event.preventDefault();
    }
}

formulaire.addEventListener('submit', validerPhoto);

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
