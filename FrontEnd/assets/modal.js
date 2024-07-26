let modal = document.getElementById('modal1');
let openModal = document.querySelector('.modal-button');
let closeModal = document.querySelector('.fa-xmark');
let galleryModal = document.querySelector('.galleryModal');
let trashCan = document.querySelector('.fa-trash-can')
let elemntArrayCopy = [];


openModal.addEventListener('click', function(event) {
    event.preventDefault();
    modal.style.display = 'flex';
});

window.addEventListener('click', function(event) {
    if(event.target === modal || event.target === closeModal ) {
        modal.style.display = 'none';
    }
})

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
    retrieveDataCopy(images); // Afficher toutes les images quand on arrive sur la page
}

imageBaseCopy()