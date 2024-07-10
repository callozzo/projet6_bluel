async function project(url) {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`status error : ${response.status}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("voici l'erreur :", error);
    }
}

let imgUrl = 'http://localhost:5678/api/works'
let categorie = 'http://localhost:5678/api/categories'

async function fetchData(urlFetchData) {
    const data = await project(urlFetchData);
    console.log(data);
    return data;
}

const imagesData = await fetchData(imgUrl);

console.log(imagesData);

const parentElement = document.querySelector(".gallery");

async function retrieveData() {
    try {
        const data = await fetchData(imgUrl);
        let array = data;
        console.log(array);
        for( i = 0; i < array.length; i++) {
            const element = array[i];
            const figure = document.createElement("figure");
            parentElement.appendChild(figure);
            figure.id = element.id;
            const imageApi = document.createElement("img");
            imageApi.src = element.imageUrl;
            figure.appendChild(imageApi);
            const textApi = document.createElement("figcaption");
            textApi.innerHTML = element.title;
            figure.appendChild(textApi);
        }        
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

retrieveData();