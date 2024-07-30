let email = document.getElementById("email");
let mdp = document.getElementById ("mdp");
let formulaire = document.querySelector("form");

let emailV = 'sophie.bluel@test.tld';
let mdpV = 'S0phie'

formulaire.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(email);
    if(email === emailV && mdp === mdpV) {
        document.location.href=".//index.html";
    }else {
        alert("Adresse mail ou mot de passe incorrect");
    }
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email : emailV, password: mdpV}),
    }) 
    .then((res) => {
        return res.json(); 
    })
    .then((login) => {
        let token = login.token;
        sessionStorage.setItem("tokens",token);            // Stockage du token dans la session //
        let storageToken = sessionStorage.getItem("tokens");            // Renvoie page d'acceuil si connexion reussit //
        if (token) {
        
        }
        else
        {
        alert("Adresse mail ou mot de passe incorrect");
        };
    })
    .catch((err) => console.log(err))
})
