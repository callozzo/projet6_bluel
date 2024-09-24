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
let imagePreview = document.getElementById('imagePreview')

//Ouverture de la première modal
openModal.addEventListener('click', function(event) {
    event.preventDefault();
    modal1.style.display = 'flex';
});

//Ouverture de la deuxième modal
addPhoto.addEventListener('click', function(event) {
    event.preventDefault();
    modal2.style.display = "flex";
    addImage.style.display = 'block';
})

//Fonction pour le reset du formulaire
function resetFormAndPreview() {
    formulaire.reset();
    imagePreview.style.display = 'none';
    imagePreview.src = '';
    ajoutImage.value = '';
    ajoutImage.src = '';
    validationPhoto.style.backgroundColor = "#A7A7A7";
}

//Fermeture des modals via la croix
closeModal.forEach(button => {
    button.addEventListener('click', function() {
        modal1.style.display = 'none';
        modal2.style.display = 'none';
        resetFormAndPreview();
    });
});

//fermeture des modal en cliquant en dehors de celle-ci
window.addEventListener ('click', function(event) {
    if(event.target === modal1 || event.target === modal2) {
        modal1.style.display = 'none';
        modal2.style.display = "none";
        resetFormAndPreview();
    }
})

//Retour vers la première modal
modal2.addEventListener('click', function(event) {
    if(event.target === previousModal) {
        modal2.style.display = "none";
        resetFormAndPreview();
    }
})

//Event pour qu'au click sur le boutton l'input d'ajout de photo s'ouvre
addImage.addEventListener('click', function() {
    ajoutImage.click();
})

//Event pour l'affichage d'une preview de la photo selectionner
ajoutImage.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            addImage.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Fonction pour vérifier les champs du formulaire et changer la couleur du bouton de validation
function couleurBouton() {
    let namePhotoValue = namePhoto.value.trim();
    let selectedCategories = selectCategories.value;
    let ajoutImageValue = ajoutImage.files[0];

    if (namePhotoValue !== "" && selectedCategories !== "" && ajoutImageValue) {
        validationPhoto.style.backgroundColor = "#1D6154"; // Vert si tous les champs sont remplis
    } else {
        validationPhoto.style.backgroundColor = "#A7A7A7"; // Gris si un ou plusieurs champs sont vides
    }
}

// Ajouter des EventListeners pour vérifier les champs à chaque changement
namePhoto.addEventListener('input', couleurBouton);
selectCategories.addEventListener('change', couleurBouton);
ajoutImage.addEventListener('change', couleurBouton);

// Gestion de la soumission du formulaire
formulaire.addEventListener('submit', async function(event) {
    event.preventDefault();

    let namePhotoValue = namePhoto.value.trim();
    let selectedCategories = selectCategories.value;
    let ajoutImageValue = ajoutImage.files[0];
    const token = sessionStorage.getItem("tokens");

    if (!namePhotoValue || !selectedCategories || !ajoutImageValue) {
        validationPhoto.style.backgroundColor = "#A7A7A7"; // Gris si non rempli
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    } else {
        validationPhoto.style.backgroundColor = "#1D6154"; // Vert une fois rempli
    }

    if (!token) {
        console.error("Aucun token trouvé. L'utilisateur n'est peut-être pas authentifié.");
        return;
    }

        //CategoryId renvoie l'Id dans formData pour que le fetch fonctionne
        let categoryId;
        if(selectedCategories === "Objets"){
            categoryId = 1;
        }else if(selectedCategories === "Appartements"){
            categoryId = 2;
        }else if(selectedCategories === "Hotels & restaurants"){
            categoryId = 3;
        }else {
            alert("Catégorie sélectionneée non valide.");
            return;
        }

        const formData = new FormData();
        formData.append('image', ajoutImageValue);
        formData.append('title', namePhotoValue);
        formData.append('category', categoryId);        

        try{
            const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Image créée, réponse API:', responseData);

            ajoutImageData(responseData);
            elementArray.push(responseData); // Ajout de l'image dans elementArray 
            retrieveData(elementArray); // Appel de retrieveData pour afficher la nouvel image

            formulaire.reset();
            modal1.style.display = 'none';
            modal2.style.display = "none";
            resetFormAndPreview();

        } else {
            console.error("Erreur lors de l'ajout de l'élément :", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Erreur lors de l'appel API pour l'ajout :", error);
    }    
});

// Fonction pour ajouter la nouvelle image dans la galerie
async function ajoutImageData(imageData) {
    const figure = document.createElement("figure");
    galleryModal.appendChild(figure);
    figure.id = imageData.id;

    const imageApi = document.createElement("img");
    imageApi.src = imageData.imageUrl;
    figure.appendChild(imageApi);

    const trashIcon = document.createElement("i");
    trashIcon.className = 'fa-solid fa-trash-can';
    figure.appendChild(trashIcon);

    // Suppression via l'icone poubelle
    trashIcon.addEventListener('click', async () => {
        const token = sessionStorage.getItem("tokens");

        try {
            const response = await fetch(`http://localhost:5678/api/works/${imageData.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(`Élément avec l'ID ${imageData.id} supprimé.`);
                figure.remove(); // Supprime l'élément du DOM

            // Supprimer l'élément de elementArray
            const index = elementArray.findIndex(item => item.id === imageData.id);
            if (index !== -1) {
                elementArray.splice(index, 1); // Supprimer l'élément du tableau
                console.log(`Élément avec l'ID ${imageData.id} supprimé de elementArray.`);
            }

            // Appeler retrieveData pour mettre à jour le DOM après la suppression
            retrieveData(elementArray);
                
            } else {
                console.error("Erreur lors de la suppression de l'élément :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'appel API pour la suppression :", error);
        }
    });

    console.log("Élément ajouté au DOM :", imageData);
}

// Fonction d'affichage des images sur la première modal, avec icônes de suppression
async function retrieveDataCopy(data) {
    try {
        data.forEach(element => {
            ajoutImageData(element); // Utilisation de la fonction dynamique
        });
    } catch (error) {
        console.error("Erreur lors de la création des éléments du DOM :", error);
    }
}

// Fonction pour récupérer et afficher les images existantes
async function imageBaseCopy() {
    const images = await getImages();
    retrieveDataCopy(images); // Afficher toutes les images récupérées
}

// Lancement de la récupération des images au chargement
imageBaseCopy();