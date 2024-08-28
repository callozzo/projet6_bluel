let email = document.getElementById('email');
let mdp = document.getElementById('mdp');
let form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailContent = email.value.trim();  // Récupération adresse mail //
  const mdpContent = mdp.value.trim();      // Récupération mot de passe //

  const connect = {  // Création du corps de la requête à envoyer //
    email: emailContent,
    password: mdpContent,
  };

  fetch('http://localhost:5678/api/users/login', {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(connect),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Erreur lors de la connexion : ' + res.statusText);
    }
    return res.json();
  })
  .then((login) => {
    const token = login.token;  // Récupération du token //
    if (token) {
      sessionStorage.setItem("tokens", token);  // Stockage du token dans la session //
      console.log("Token stocké avec succès :", token);
      window.location.href = "./index.html";  // Redirection vers la page d'accueil //
    } else {
      alert("Adresse mail ou mot de passe incorrect");
    }
  })
  .catch((err) => {
    console.error("Erreur lors de la connexion :", err);
    alert("Une erreur s'est produite lors de la tentative de connexion. Veuillez réessayer.");
  });
});