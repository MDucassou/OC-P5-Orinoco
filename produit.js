
// déclaration des variables
let detailProduit = document.getElementById('produitChoisi');
let validation = document.getElementById('commander');

// déclaration et initialisation du panier comme valeur du localStorage
var panier = panier();

// récupération des données du produit sélectionné dans l'API  grâce à son id passé dans l'URL et affichage des informations dans la page produit
// définition de la requête: ouverture de la page du produit et récupération de l'id du produit sélectionné
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

const headers = new Headers();
headers.append('Content-Type', 'application/json');

fetch('http://localhost:3000/api/teddies/' + id, { method: 'GET', headers: headers }).then(response => {

    if (response.status === 200) {
        return response.json();
    }

}).then(teddy => {

    var pageProduit = document.createElement('div');
    pageProduit.classList.add('accueil-prev__carte-produit');

    var nomChoisi = document.createElement('h2');
    nomChoisi.textContent = teddy.name;
    nomChoisi.classList.add('accueil-prev__titre');
    pageProduit.appendChild(nomChoisi);

    var imageChoisi = document.createElement('img');
    imageChoisi.src = teddy.imageUrl;
    imageChoisi.width = 200;
    imageChoisi.height = 150;
    pageProduit.appendChild(imageChoisi);

    var descriptionChoisi = document.createElement('p');
    descriptionChoisi.textContent = teddy.description;
    pageProduit.appendChild(descriptionChoisi);

    var priceChoisi = document.createElement('p');
    priceChoisi.textContent = teddy.price + " €";
    pageProduit.appendChild(priceChoisi);


    var couleur = document.createElement('select');
    teddy.colors.forEach(function (e) {
        var option = document.createElement('option');
        console.log(e);
        option.textContent = e;
        couleur.appendChild(option);
    });
    pageProduit.appendChild(couleur);

    detailProduit.appendChild(pageProduit);

    // événements liés au click sur le bouton "Commander"
    validation.addEventListener('click', function () {
        ajoutPanier(teddy._id, teddy.imageUrl, teddy.name, teddy.price);
        window.location = 'panier.html';
    });

})


