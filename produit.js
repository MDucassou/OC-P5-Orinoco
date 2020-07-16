
// déclaration des variables
let detailProduit = document.getElementById ('produitChoisi');
let validation = document.getElementById ('commander');

// déclaration et initialisation du panier comme valeur du localStorage
var panier = localStorage.getItem('panier');
if (panier === null){
    var panier = {produits:[]};
} else {
    panier = JSON.parse(panier);
}

// récupération des données du produit sélectionné dans l'API  grâce à son id passé dans l'URL et affichage des informations dans la page produit
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        const teddy = response;

        var pageProduit = document.createElement ('div');
        pageProduit.classList.add('accueil-prev__carte-produit');
        
        var nomChoisi = document.createElement ('h2');
        nomChoisi.textContent = teddy.name;
        nomChoisi.classList.add('accueil-prev__titre');
        pageProduit.appendChild(nomChoisi);

        var imageChoisi = document.createElement ('img');
        imageChoisi.src = teddy.imageUrl;
        imageChoisi.width = 200;
        imageChoisi.height = 150;
        pageProduit.appendChild(imageChoisi);

        var descriptionChoisi = document.createElement ('p');
        descriptionChoisi.textContent = teddy.description;
        pageProduit.appendChild(descriptionChoisi);

        var priceChoisi = document.createElement ('p');
        priceChoisi.textContent = teddy.price + " €";
        pageProduit.appendChild(priceChoisi);

        
        var couleur = document.createElement ('select');
        teddy.colors.forEach(function(e) {
            var option = document.createElement('option');
            console.log (e);
            option.textContent = e;
            couleur.appendChild (option);
        });
        pageProduit.appendChild(couleur);

        detailProduit.appendChild(pageProduit);

        // événements liés au click sur le bouton "Commander"
        validation.addEventListener ('click', function(){
            ajoutPanier (teddy._id, teddy.imageUrl, teddy.name, teddy.price);
            window.location='panier.html';
        });

        // définition de la fonction ajoutPanier qui ajoute le produit affiché au panier de commande
        function ajoutPanier (id, image, nom, prix) {
                panier.produits.push({'id':id, 'image':image, 'nom':nom, 'prix':prix}); 
                localStorage.setItem('panier', JSON.stringify(panier)); 
           } 
    }
}

// définition de la requête: ouverture de la page du produit et récupération de l'id du produit sélectionné
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
request.open("GET", "http://localhost:3000/api/teddies/"+id);
request.send();

