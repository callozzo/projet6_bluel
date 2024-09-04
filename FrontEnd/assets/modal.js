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

//Event pour qu'il y ai un message d'alerte quand une des partie du formulaire n'est pas rempli
formulaire.addEventListener('submit', async function(event) {
    event.preventDefault();

    console.log("Le formulaire est bloqué, début du traitement...");

    try {
        let namePhotoValue = namePhoto.value.trim();
        let selectedCategories = selectCategories.value;
        let ajoutImageValue = ajoutImage.files[0];
        const token = sessionStorage.getItem("tokens");

        if (!ajoutImageValue) {
            alert("L'image n'est pas indiqué");
            validationPhoto.style.backgroundColor = "#A7A7A7";
            return;
        } else {
            validationPhoto.style.backgroundColor = "#1D6154";
        }

        if (!namePhotoValue) {
            alert("Le nom n'est pas indiqué");
            validationPhoto.style.backgroundColor = "#A7A7A7";
            return;
        } else {
            validationPhoto.style.backgroundColor = "#1D6154";
        }

        if (!selectedCategories) {
            alert("La catégorie n'est pas indiqué");
            validationPhoto.style.backgroundColor = "#A7A7A7";
            return;
        } else {
            validationPhoto.style.backgroundColor = "#1D6154";
        }

        if (!token) {
            alert("l'utilisateur doit se connecter pour pouvoir ajouter une image.")
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

            return;
        } else {
            console.error("Erreur lors de l'ajout de l'élément :", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Erreur lors de l'appel API pour l'ajout :", error);
    }    
});



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

                //Event pour la suppression des images dans la modal via l'icone poubelle
                trashIcon.addEventListener('click', async () => {

                    const token = sessionStorage.getItem("tokens");

                    try {
                        const response = fetch(`http://localhost:5678/api/works/${element.id}`, {
                            method: 'delete',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response.ok) {
                            console.log(`Élément avec l'ID ${element.id} supprimé.`);
                            figure.remove(); // Supprime l'élément du DOM
                        } else {
                            console.error("Erreur lors de la suppression de l'élément :", response.statusText);
                        }
                    } catch (error) {
                        console.error("Erreur lors de l'appel API pour la suppression :", error);
                    }
                });

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
