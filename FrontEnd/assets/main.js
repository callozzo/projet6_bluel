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

let img = 'http://localhost:5678/api/works'
let categories = 'http://localhost:5678/api/categories'

async function fetchData(urlFetchData) {
    const data = await project(urlFetchData);
    console.log(data);
}


fetchData(categories)