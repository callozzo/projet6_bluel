let email=document.getElementById('email');
let mdp=document.getElementById('mdp');
let form=document.getElementById('form')

form.addEventListener('submit', (e) => {            // évenenement au clique du bouton envoyer //
 e.preventDefault()

  emailcontent = email.value;            // Récupération adresse mail //
  mdpcontent = mdp.value;            // récupération mot de passe //

  const connect = {            // Création du body a post //
    email: emailcontent,
    password: mdpcontent,
  }

  console.log(connect);
  
    fetch('http://localhost:5678/api/users/login', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5678",
      },
      mode : "cors",
      method: "POST",
      body : JSON.stringify(connect),
  })
  .then((res) => {
  return res.json();
  })
  .then((login) => {
    var token = login.token;            // Récupération du token //
    sessionStorage.setItem("tokens",token);            // Stockage du token dans la session //
    var storageToken = sessionStorage.getItem("tokens");            // Renvoie page d'acceuil si connexion reussit //
    if (token) {
      document.location.href=".//index.html";
    }
    else
    {
      alert("Adresse mail ou mot de passe incorrect");
    };
  })
  .catch((err) => console.log(err));


 
})