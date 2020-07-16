
//déclaration des varables
let listeProduits = document.getElementById ('produits');
let pagePanier = document.getElementById ('panier');
let index = 0;
let fiche;


//requête au serveur
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        // Récupération des photo et nom de chaque produit de l'API pour les afficher en page d'accueil sous forme de liste.
        response.forEach(function(teddy) {
            fiche = document.createElement('div');
            fiche.classList.add('accueil-prev__carte');
            fiche.classList.add('grow');

            var nomProduit = document.createElement('h2');
            nomProduit.textContent = teddy.name;
            nomProduit.classList.add('accueil-prev__titre');
            fiche.appendChild(nomProduit);

            var imageProduit = document.createElement('img');
            imageProduit.src = teddy.imageUrl;
            imageProduit.width = 200;
            imageProduit.height = 150;
            fiche.appendChild(imageProduit);
            listeProduits.appendChild(fiche);

            // Ouverture de la page produit correspondant au clic sur la fiche de la page d'accueil, grâce à son id.
            fiche.addEventListener ('click', function(event){
                window.location = 'produit.html?id='+teddy._id;
            });

            // Ouverture de la page panier correspondant au clic sur le bouton panier.
            pagePanier.addEventListener ('click', function(event){
                window.location = 'panier.html';
            });

        });   
    }

};

// définition de la requête.
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();

